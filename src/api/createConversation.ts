import { TAVUS_API_KEY } from '@/config';
import { IConversation } from '@/types';

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

export const createConversation = async (personaId: string): Promise<IConversation> => {
  try {
    if (!TAVUS_API_KEY) {
      throw new Error('Tavus API key is not configured. Please check your .env file.');
    }

    const conversationBody = {
      replica_id: 'r79e1c033f',
      conversation_name: 'AI Assistant with RAG & Tools',
      conversational_context: 'You are an intelligent AI assistant with access to a company knowledge base and various tools. You can help users with weather information, company questions, and calculations. Always be helpful, accurate, and reference your knowledge base when appropriate.',
      custom_greeting: 'Hello! I\'m your AI assistant with access to real-time tools and company information. I can help you with weather updates, answer questions about our company, perform calculations, and much more. How can I assist you today?',
      properties: {
        language: 'english',
        enable_recording: false,
        enable_closed_captions: true,
        max_call_duration: 1800, // 30 minutes
        participant_left_timeout: 60,
        participant_absent_timeout: 300,
      },
      persona_id: personaId
    };

    const response = await fetch('https://tavusapi.com/v2/conversations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY,
      },
      body: JSON.stringify(conversationBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to create conversation: ${response.status} ${response.statusText} - ${errorData}`);
    }

    const data = await response.json();
    console.log('✅ Created conversation:', data);
    return data;
  } catch (error) {
    console.error('Error creating conversation:', error);
    throw error;
  }
};
