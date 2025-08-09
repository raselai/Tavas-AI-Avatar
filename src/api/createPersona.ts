import { TAVUS_API_KEY } from '@/config';

// Tool definitions for the custom LLM
const TOOLS = [
  {
    type: "function",
    function: {
      name: "get_weather",
      description: "Get current weather information for a specific location",
      parameters: {
        type: "object",
        properties: {
          location: {
            type: "string",
            description: "The city and country, e.g. 'New York, USA' or 'London, UK'"
          },
          unit: {
            type: "string",
            enum: ["celsius", "fahrenheit"],
            description: "Temperature unit preference"
          }
        },
        required: ["location"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "search_company_info",
      description: "Search for company information from the knowledge base",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Search query for company information"
          }
        },
        required: ["query"]
      }
    }
  },
  {
    type: "function",
    function: {
      name: "calculate",
      description: "Perform mathematical calculations",
      parameters: {
        type: "object",
        properties: {
          expression: {
            type: "string",
            description: "Mathematical expression to calculate, e.g. '2 + 2' or '10 * 5'"
          }
        },
        required: ["expression"]
      }
    }
  }
];

export const createPersona = async () => {
  try {
    if (!TAVUS_API_KEY) {
      throw new Error('Tavus API key is not configured. Please check your .env file.');
    }

    if (!import.meta.env.VITE_ELEVENLABS_API_KEY) {
      throw new Error('ElevenLabs API key is not configured. Please check your .env file.');
    }

    const personaBody = {
      system_prompt: "You are an intelligent AI assistant with access to a company knowledge base and various tools. You can help users with weather information, company questions, and calculations. Always be helpful, accurate, and reference your knowledge base when appropriate.",
      context: "You have access to company information and various tools for weather, calculations, and company queries.",
      persona_name: "AI Assistant with RAG & Tools",
      layers: {
        llm: {
          model: "gpt-3.5-turbo",
          api_key: import.meta.env.VITE_OPENAI_API_KEY,
          base_url: "http://localhost:8001",
          tools: TOOLS,
          speculative_inference: true
        },
        tts: {
          tts_engine: "elevenlabs",
          api_key: import.meta.env.VITE_ELEVENLABS_API_KEY,
          external_voice_id: "21m00Tcm4TlvDq8ikWAM"
        },
        stt: {
          participant_pause_sensitivity: "high",
          participant_interrupt_sensitivity: "high",
          smart_turn_detection: true,
          stt_engine: "tavus-advanced"
        },
        perception: {
          perception_model: "basic"
        }
      }
    };

    const response = await fetch('https://tavusapi.com/v2/personas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
      body: JSON.stringify(personaBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to create persona: ${response.status} ${response.statusText} - ${errorData}`);
    }

    const data = await response.json();
    console.log('✅ Created persona:', data);
    return data;
  } catch (error) {
    console.error('Error creating persona:', error);
    throw error;
  }
}; 