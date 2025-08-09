# Custom LLM Server with RAG & Tool Calling

This is an OpenAI-compatible server that provides:
- **RAG (Retrieval-Augmented Generation)** with a built-in knowledge base
- **Tool calling** capabilities (weather, calculator, company info search)
- **OpenAI API compatibility** for seamless integration with Tavus

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Set OpenAI API Key
```bash
export OPENAI_API_KEY=your_openai_api_key_here
```

### 3. Start the Server
```bash
python start_server.py
```

The server will be available at:
- **API**: http://localhost:8001
- **Docs**: http://localhost:8001/docs
- **Health**: http://localhost:8001/health

## 📚 Features

### RAG Knowledge Base
The server includes a built-in knowledge base with:
- Company information (ACME Corporation)
- FAQ data (shipping, payment, support, warranty)
- Weather data for major cities

### Available Tools
1. **get_weather** - Get weather information for locations
2. **search_company_info** - Search the company knowledge base
3. **calculate** - Perform mathematical calculations

### OpenAI Compatibility
The server implements the OpenAI Chat Completions API:
- `/chat/completions` endpoint
- Streaming and non-streaming responses
- Tool calling support
- Message history management

## 🔧 Configuration

### Environment Variables
- `OPENAI_API_KEY` - Your OpenAI API key (required)

### Server Settings
- **Host**: 0.0.0.0 (accessible from all interfaces)
- **Port**: 8001
- **Auto-reload**: Enabled for development

## 📖 API Usage

### Basic Chat
```bash
curl -X POST "http://localhost:8001/chat/completions" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": "What is ACME Corporation?"}
    ]
  }'
```

### Tool Calling
```bash
curl -X POST "http://localhost:8001/chat/completions" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gpt-3.5-turbo",
    "messages": [
      {"role": "user", "content": "What is the weather in New York?"}
    ],
    "tools": [
      {
        "type": "function",
        "function": {
          "name": "get_weather",
          "description": "Get weather information",
          "parameters": {
            "type": "object",
            "properties": {
              "location": {"type": "string"},
              "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]}
            },
            "required": ["location"]
          }
        }
      }
    ]
  }'
```

## 🔗 Integration with Tavus

To use this server with Tavus, configure your conversation with:
```javascript
{
  llm_model_config: {
    provider: "openai",
    model: "gpt-3.5-turbo",
    base_url: "http://localhost:8001",
    tools: [
      // Tool definitions here
    ]
  }
}
```

## 📝 Customization

### Adding Knowledge
Edit the `KNOWLEDGE_BASE` dictionary in `server.py` to add your own data.

### Adding Tools
1. Create a new async function in `server.py`
2. Add it to the `TOOL_FUNCTIONS` mapping
3. Define the tool schema in your Tavus configuration

### Changing Models
The server proxies requests to OpenAI, so you can use any OpenAI model by changing the `model` parameter in requests. 