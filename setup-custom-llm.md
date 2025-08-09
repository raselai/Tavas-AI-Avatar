# 🚀 Custom LLM Server Setup Guide

This guide will help you set up the custom LLM server with RAG (Retrieval-Augmented Generation) and tool calling capabilities for your Tavus AI app.

## 📋 Prerequisites

1. **Python 3.8+** installed on your system
2. **OpenAI API Key** (get one from [OpenAI Platform](https://platform.openai.com/api-keys))
3. **Tavus API Key** (already configured in your `.env` file)

## 🛠️ Setup Steps

### 1. Navigate to the Custom LLM Server Directory
```bash
cd my-tavus-app/custom-llm-server
```

### 2. Install Python Dependencies
```bash
pip install -r requirements.txt
```

### 3. Set Your OpenAI API Key
**Windows (PowerShell):**
```powershell
$env:OPENAI_API_KEY="your_openai_api_key_here"
```

**Windows (Command Prompt):**
```cmd
set OPENAI_API_KEY=your_openai_api_key_here
```

**macOS/Linux:**
```bash
export OPENAI_API_KEY=your_openai_api_key_here
```

### 4. Start the Custom LLM Server
```bash
python start_server.py
```

You should see:
```
🤖 Custom LLM Server with RAG & Tool Calling
==================================================
✅ All required packages are installed
✅ OpenAI API key is configured
🚀 Starting Custom LLM Server with RAG...
📍 Server will be available at: http://localhost:8001
📖 API docs will be available at: http://localhost:8001/docs
🔧 Health check: http://localhost:8001/health
```

### 5. Test the Server (Optional)
In a new terminal:
```bash
cd my-tavus-app/custom-llm-server
python test_server.py
```

### 6. Start Your React App
In another terminal:
```bash
cd my-tavus-app
npm run dev
```

## 🎯 How It Works

### **Fallback System**
Your app now uses a smart fallback system:

1. **🟢 Custom LLM + RAG + Tools** (Best experience)
   - Uses your local server with OpenAI
   - RAG knowledge base with company info
   - Tool calling for weather, calculations, etc.

2. **🟡 Basic Replica** (Fallback 1)
   - Uses Tavus replica without custom LLM
   - Standard conversational AI

3. **🔵 Stock Persona** (Fallback 2)
   - Uses Tavus stock persona
   - Works with free trial accounts

### **Available Tools**
When the custom LLM is active, users can:

- **🌤️ Get Weather**: "What's the weather in Tokyo?"
- **🏢 Company Info**: "Tell me about ACME Corporation"
- **🧮 Calculate**: "What is 25 * 4 + 10?"

### **RAG Knowledge Base**
The server includes built-in knowledge about:
- Company information (ACME Corporation)
- FAQ data (shipping, payment, support)
- Weather data for major cities

## 🔧 Customization

### Adding Your Own Knowledge
Edit `custom-llm-server/server.py` and modify the `KNOWLEDGE_BASE` dictionary:

```python
KNOWLEDGE_BASE = {
    "company_info": {
        "name": "Your Company Name",
        "founded": "2024",
        "mission": "Your mission statement",
        # Add your data here
    },
    "faq": {
        "support": "Your support information",
        # Add your FAQ here
    }
}
```

### Adding New Tools
1. Create a new async function in `server.py`
2. Add it to the `TOOL_FUNCTIONS` mapping
3. Update the `TOOLS` array in `src/api/createConversation.ts`

## 🐛 Troubleshooting

### Server Won't Start
- Check Python version: `python --version`
- Install dependencies: `pip install -r requirements.txt`
- Verify OpenAI API key is set

### Custom LLM Not Working
- Check server is running: http://localhost:8001/health
- Verify OpenAI API key has credits
- Check browser console for error messages

### Tool Calling Not Working
- Ensure server is running on port 8001
- Check that OpenAI API key is valid
- Look for "Custom LLM + RAG + Tools" status in the app

## 📊 Status Indicators

In your React app, you'll see status indicators:

- **🟢 Custom LLM + RAG + Tools**: Full functionality active
- **🟡 Basic Replica**: Standard Tavus replica
- **🔵 Stock Persona**: Free trial fallback

## 🎉 Success!

When everything is working, you'll see:
- Green "Custom LLM + RAG + Tools" status
- Feature panel showing available tools
- AI can answer company questions and use tools

Try asking:
- "What is ACME Corporation?"
- "What's the weather in New York?"
- "Calculate 15 * 8 + 20"

## 💡 Next Steps

1. **Customize the knowledge base** with your own data
2. **Add new tools** for your specific use case
3. **Integrate with your databases** for real-time data
4. **Deploy the server** for production use

Happy coding! 🚀 