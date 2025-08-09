# 🧪 **Complete Testing Guide: Custom LLM Server with RAG & Tool Calling**

Follow this step-by-step guide to test your custom LLM server with RAG and tool calling capabilities.

## 📋 **Prerequisites**

✅ **Python 3.8+** installed  
✅ **OpenAI API Key** (get from https://platform.openai.com/api-keys)  
✅ **Tavus API Key** (already in your main `.env` file)  

## 🚀 **Step-by-Step Testing Process**

### **Step 1: Get Your OpenAI API Key**

1. Go to https://platform.openai.com/api-keys
2. Sign in to your OpenAI account (or create one)
3. Click "Create new secret key"
4. Name it "Tavus-RAG-Server"
5. Copy the key (starts with `sk-...`)

### **Step 2: Set Up Virtual Environment**

Open PowerShell/Terminal and navigate to your project:

```powershell
# Navigate to the custom LLM server directory
cd my-tavus-app/custom-llm-server

# Create virtual environment
python -m venv venv

# Activate virtual environment (Windows)
venv\Scripts\Activate.ps1

# For macOS/Linux:
# source venv/bin/activate
```

You should see `(venv)` in your prompt.

### **Step 3: Install Dependencies**

```powershell
# Install all required packages
pip install -r requirements.txt
```

### **Step 4: Configure API Key**

Edit the `.env` file in the `custom-llm-server` directory:

```env
# OpenAI API Configuration
OPENAI_API_KEY=sk-your-actual-openai-api-key-here

# Server Configuration
HOST=0.0.0.0
PORT=8001
```

**⚠️ IMPORTANT:** Replace `sk-your-actual-openai-api-key-here` with your real OpenAI API key!

### **Step 5: Start the Custom LLM Server**

```powershell
# Make sure you're in the custom-llm-server directory with venv activated
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

**Keep this terminal open!** The server needs to keep running.

### **Step 6: Test the Server (New Terminal)**

Open a **new terminal/PowerShell window** and test:

```powershell
# Navigate to the server directory
cd my-tavus-app/custom-llm-server

# Activate virtual environment
venv\Scripts\Activate.ps1

# Run the test suite
python test_server.py
```

You should see:
```
🧪 Custom LLM Server Test Suite
========================================
🔍 Testing server health...
✅ Server is healthy

🔍 Testing basic chat...
✅ Basic chat works
📝 Response: ACME Corporation is a company founded in 2020...

🔍 Testing RAG (company knowledge)...
✅ RAG works
✅ RAG successfully retrieved knowledge base information

🔍 Testing tool calling...
✅ Tool calling works - AI wants to call tools
🔧 Tool calls: 1
   - get_weather: {"location": "New York"}

🔍 Testing calculator tool...
✅ Calculator tool calling works
🧮 Expression: 25 * 4 + 10

========================================
📊 Test Results Summary
========================================
✅ PASS Health Check
✅ PASS Basic Chat
✅ PASS RAG Knowledge
✅ PASS Tool Calling
✅ PASS Calculator Tool

🎯 5/5 tests passed
🎉 All tests passed! Server is ready for Tavus integration.
```

### **Step 7: Test Individual Features**

You can also test individual endpoints:

#### **Health Check:**
```powershell
curl http://localhost:8001/health
```

#### **API Documentation:**
Open in browser: http://localhost:8001/docs

#### **Basic Chat Test:**
```powershell
curl -X POST "http://localhost:8001/chat/completions" -H "Content-Type: application/json" -d '{
  "model": "gpt-3.5-turbo",
  "messages": [{"role": "user", "content": "What is ACME Corporation?"}],
  "stream": false
}'
```

### **Step 8: Start Your React App (New Terminal)**

Open **another new terminal** and start your React app:

```powershell
# Navigate to the main app directory
cd my-tavus-app

# Start the React development server
npm run dev
```

### **Step 9: Test the Full Integration**

1. **Open your browser** to http://localhost:5173
2. **Click "Start Conversation"**
3. **Look for status indicators:**
   - 🟢 **"Custom LLM + RAG + Tools"** = Success! Full functionality
   - 🟡 **"Basic Replica"** = Fallback mode
   - 🔵 **"Stock Persona"** = Basic fallback

### **Step 10: Test AI Capabilities**

When the conversation starts, try these commands:

#### **RAG Knowledge Base:**
- "What is ACME Corporation?"
- "When was ACME founded?"
- "What products does ACME offer?"
- "What's your return policy?"

#### **Weather Tool:**
- "What's the weather in New York?"
- "How's the weather in London?"
- "Tell me the weather in Tokyo in Fahrenheit"

#### **Calculator Tool:**
- "What is 25 * 4 + 10?"
- "Calculate 15 * 8"
- "What's 100 / 4 + 20?"

## 🎉 **Success Indicators**

When everything is working correctly, you'll see:

✅ **Server Health**: `http://localhost:8001/health` returns status "healthy"  
✅ **Test Suite**: All 5 tests pass  
✅ **React App**: Green "Custom LLM + RAG + Tools" status  
✅ **Feature Panel**: Shows available tools (Database, Weather, Calculator)  
✅ **AI Responses**: References company knowledge and uses tools  

## 🐛 **Troubleshooting**

### **Server Won't Start**
```powershell
# Check Python version
python --version

# Reinstall dependencies
pip install -r requirements.txt

# Check if port is in use
netstat -an | findstr :8001
```

### **OpenAI API Errors**
- Verify your API key is correct in `.env`
- Check you have credits in your OpenAI account
- Ensure no extra spaces in the API key

### **Virtual Environment Issues**
```powershell
# Deactivate and recreate
deactivate
rmdir /s venv
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### **React App Not Connecting**
- Ensure custom LLM server is running on port 8001
- Check browser console for error messages
- Verify both servers are running simultaneously

## 📊 **Expected Results**

### **Test Suite Results:**
```
🎯 5/5 tests passed
🎉 All tests passed! Server is ready for Tavus integration.
```

### **React App Status:**
- **Best Case**: 🟢 Custom LLM + RAG + Tools
- **Fallback 1**: 🟡 Basic Replica  
- **Fallback 2**: 🔵 Stock Persona

### **AI Capabilities:**
- **Knowledge**: AI knows about ACME Corporation
- **Weather**: AI can get weather for major cities
- **Math**: AI can perform calculations
- **Context**: AI references knowledge base appropriately

## 🚀 **Next Steps**

Once testing is successful:

1. **Customize Knowledge**: Edit `server.py` KNOWLEDGE_BASE
2. **Add Tools**: Create new functions for your use case
3. **Deploy**: Set up production deployment
4. **Monitor**: Use health checks and logging

## 💡 **Pro Tips**

- **Keep terminals organized**: Server, Tests, React App
- **Use browser dev tools**: Check console for detailed logs
- **Test incrementally**: Health → Basic Chat → Tools → Full App
- **Save API keys securely**: Never commit `.env` files to git

Happy testing! 🎯 