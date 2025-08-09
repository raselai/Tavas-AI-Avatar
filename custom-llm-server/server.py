from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from typing import List, Dict, Any, Optional, AsyncGenerator
import openai
import json
import asyncio
import os
from datetime import datetime
import uvicorn
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Simple in-memory RAG knowledge base
KNOWLEDGE_BASE = {
    "company_info": {
        "name": "ACME Corporation",
        "founded": "2020",
        "mission": "To provide innovative AI solutions for businesses",
        "products": ["AI Chatbots", "Voice Assistants", "Computer Vision"],
        "support_hours": "24/7",
        "return_policy": "30 days money back guarantee"
    },
    "faq": {
        "shipping": "Free shipping on orders over $50. Standard delivery 3-5 business days.",
        "payment": "We accept all major credit cards, PayPal, and bank transfers.",
        "support": "Contact us at support@acme.com or call 1-800-ACME-HELP",
        "warranty": "All products come with 1-year warranty and lifetime support."
    },
    "weather_locations": {
        "new_york": {"temp": 22, "condition": "Sunny", "humidity": 60},
        "london": {"temp": 15, "condition": "Rainy", "humidity": 85},
        "tokyo": {"temp": 25, "condition": "Cloudy", "humidity": 70},
        "san_francisco": {"temp": 18, "condition": "Foggy", "humidity": 90}
    }
}

app = FastAPI(title="Custom LLM Server with RAG", version="1.0.0")

# Pydantic models for OpenAI compatibility
class Message(BaseModel):
    role: str
    content: str

class Tool(BaseModel):
    type: str
    function: Dict[str, Any]

class ChatCompletionRequest(BaseModel):
    model: str
    messages: List[Message]
    tools: Optional[List[Tool]] = None
    stream: bool = False
    temperature: float = 0.7
    max_tokens: Optional[int] = None

class ToolCall(BaseModel):
    id: str
    type: str
    function: Dict[str, Any]

class ChatCompletionResponse(BaseModel):
    id: str
    object: str
    created: int
    model: str
    choices: List[Dict[str, Any]]

# RAG Functions
def search_knowledge_base(query: str) -> str:
    """Search the knowledge base for relevant information"""
    query_lower = query.lower()
    relevant_info = []
    
    # Search company info
    for key, value in KNOWLEDGE_BASE["company_info"].items():
        if any(word in query_lower for word in [key, str(value).lower()]):
            relevant_info.append(f"{key}: {value}")
    
    # Search FAQ
    for topic, answer in KNOWLEDGE_BASE["faq"].items():
        if topic in query_lower or any(word in query_lower for word in answer.lower().split()):
            relevant_info.append(f"{topic}: {answer}")
    
    return "\n".join(relevant_info) if relevant_info else "No relevant information found in knowledge base."

# Tool Functions
async def get_weather(location: str, unit: str = "celsius") -> Dict[str, Any]:
    """Get weather information for a location"""
    location_key = location.lower().replace(" ", "_").replace(",", "")
    
    weather_data = KNOWLEDGE_BASE["weather_locations"].get(location_key)
    if not weather_data:
        return {
            "location": location,
            "error": "Weather data not available for this location",
            "available_locations": list(KNOWLEDGE_BASE["weather_locations"].keys())
        }
    
    temp = weather_data["temp"]
    if unit.lower() == "fahrenheit":
        temp = round((temp * 9/5) + 32)
        unit_symbol = "°F"
    else:
        unit_symbol = "°C"
    
    return {
        "location": location,
        "temperature": f"{temp}{unit_symbol}",
        "condition": weather_data["condition"],
        "humidity": f"{weather_data['humidity']}%",
        "timestamp": datetime.now().isoformat()
    }

async def search_company_info(query: str) -> Dict[str, Any]:
    """Search company information using RAG"""
    relevant_info = search_knowledge_base(query)
    return {
        "query": query,
        "information": relevant_info,
        "source": "Company Knowledge Base"
    }

async def calculate(expression: str) -> Dict[str, Any]:
    """Perform mathematical calculations"""
    try:
        # Simple calculator - only allow basic operations for security
        sanitized = ''.join(c for c in expression if c in '0123456789+-*/.() ')
        result = eval(sanitized)
        return {
            "expression": expression,
            "result": result,
            "success": True
        }
    except Exception as e:
        return {
            "expression": expression,
            "error": str(e),
            "success": False
        }

# Tool execution mapping
TOOL_FUNCTIONS = {
    "get_weather": get_weather,
    "search_company_info": search_company_info,
    "calculate": calculate
}

async def execute_tool_call(tool_call: Dict[str, Any]) -> Dict[str, Any]:
    """Execute a tool call and return the result"""
    function_name = tool_call["function"]["name"]
    function_args = tool_call["function"]["arguments"]
    
    if isinstance(function_args, str):
        function_args = json.loads(function_args)
    
    if function_name in TOOL_FUNCTIONS:
        try:
            result = await TOOL_FUNCTIONS[function_name](**function_args)
            return {
                "tool_call_id": tool_call["id"],
                "role": "tool",
                "name": function_name,
                "content": json.dumps(result)
            }
        except Exception as e:
            return {
                "tool_call_id": tool_call["id"],
                "role": "tool", 
                "name": function_name,
                "content": json.dumps({"error": str(e), "success": False})
            }
    else:
        return {
            "tool_call_id": tool_call["id"],
            "role": "tool",
            "name": function_name,
            "content": json.dumps({"error": f"Unknown function: {function_name}", "success": False})
        }

def enhance_messages_with_rag(messages: List[Message]) -> List[Message]:
    """Enhance messages with RAG context"""
    enhanced_messages = []
    
    # Add system message with RAG context
    rag_context = f"""
You are a helpful AI assistant with access to a company knowledge base and external tools.

Company Information:
{json.dumps(KNOWLEDGE_BASE['company_info'], indent=2)}

FAQ Information:
{json.dumps(KNOWLEDGE_BASE['faq'], indent=2)}

When users ask questions, first check if the information is available in the knowledge base.
Use tools when you need real-time information or to perform calculations.
Be helpful, accurate, and reference your knowledge base when appropriate.
"""
    
    enhanced_messages.append(Message(role="system", content=rag_context))
    enhanced_messages.extend(messages)
    
    return enhanced_messages

async def stream_openai_response(messages: List[Dict], tools: Optional[List[Tool]] = None, model: str = "gpt-3.5-turbo") -> AsyncGenerator[str, None]:
    """Stream response from OpenAI with tool calling support"""
    try:
        # Convert tools to OpenAI format
        openai_tools = None
        if tools:
            openai_tools = [tool.dict() for tool in tools]
        
        # Make OpenAI API call
        response = await openai.ChatCompletion.acreate(
            model=model,
            messages=[msg.dict() for msg in messages],
            tools=openai_tools,
            stream=True,
            temperature=0.7
        )
        
        async for chunk in response:
            if chunk.choices[0].delta.content:
                yield f"data: {json.dumps({'choices': [{'delta': {'content': chunk.choices[0].delta.content}}]})}\n\n"
            elif chunk.choices[0].delta.tool_calls:
                yield f"data: {json.dumps({'choices': [{'delta': {'tool_calls': chunk.choices[0].delta.tool_calls}}]})}\n\n"
        
        yield "data: [DONE]\n\n"
        
    except Exception as e:
        error_response = {
            "choices": [{
                "delta": {
                    "content": f"Error: {str(e)}"
                }
            }]
        }
        yield f"data: {json.dumps(error_response)}\n\n"
        yield "data: [DONE]\n\n"

@app.post("/chat/completions")
async def chat_completions(request: ChatCompletionRequest):
    """OpenAI-compatible chat completions endpoint with RAG and tool calling"""
    
    # Enhance messages with RAG context
    enhanced_messages = enhance_messages_with_rag(request.messages)
    
    if request.stream:
        return StreamingResponse(
            stream_openai_response(enhanced_messages, request.tools, request.model),
            media_type="text/plain"
        )
    else:
        # Non-streaming response (for testing)
        try:
            openai_tools = None
            if request.tools:
                openai_tools = [tool.dict() for tool in request.tools]
            
            response = await openai.ChatCompletion.acreate(
                model=request.model,
                messages=[msg.dict() for msg in enhanced_messages],
                tools=openai_tools,
                temperature=request.temperature,
                max_tokens=request.max_tokens
            )
            
            return response
            
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}

@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "name": "Custom LLM Server with RAG",
        "version": "1.0.0",
        "features": ["RAG", "Tool Calling", "OpenAI Compatible"],
        "endpoints": {
            "chat": "/chat/completions",
            "health": "/health"
        }
    }

if __name__ == "__main__":
    # Set your OpenAI API key
    openai.api_key = os.getenv("OPENAI_API_KEY")
    
    if not openai.api_key:
        print("Warning: OPENAI_API_KEY not set. Please set it as an environment variable.")
    
    uvicorn.run(app, host="0.0.0.0", port=8001) 