# My Tavus Conversational AI App

## 🚀 Features

This app includes:
- **Beautiful Welcome Screen** with gradient animations and modern UI
- **Hair Check Screen** with custom device selection and professional styling
- **Video Call Interface** powered by Daily.co with real-time controls
- **Tavus API Integration** for conversation management
- **🆕 Custom LLM Server** with RAG (Retrieval-Augmented Generation) and tool calling
- **🆕 Smart Fallback System** ensuring compatibility across all account types
- **🆕 Real-time Status Indicators** showing active LLM configuration

### 🧠 AI Capabilities

**Custom LLM with RAG & Tools:**
- 🏢 **Company Knowledge Base** - Ask about ACME Corporation
- 🌤️ **Weather Information** - Get real-time weather for any city
- 🧮 **Mathematical Calculations** - Perform complex calculations
- 📚 **RAG-Enhanced Responses** - Intelligent information retrieval

**Fallback System:**
- 🟢 **Custom LLM + RAG + Tools** (Best experience with OpenAI)
- 🟡 **Basic Replica** (Standard Tavus replica)
- 🔵 **Stock Persona** (Free trial compatible)

|                                                                    |                                                                                              |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| ![Prejoin UI](https://cdn.replica.tavus.io/git-examples/scr-1.png) | ![Hair check UI](https://cdn.replica.tavus.io/git-examples/scr-2.png) |
| ![in-call UI](https://cdn.replica.tavus.io/git-examples/scr-3.png) |


## 🎥 Demo Video

Check out our demo video to see the Conversational Video Interface in action:

[Watch the Demo](https://www.loom.com/share/b4e3ef661e264260a8d8f4cede48aaa8?sid=ada64974-5495-4c52-b635-7ac76b543208)



## 🛠 Quick Start

### Basic Setup (Stock Persona)

1. **Add your Tavus API key:**
   Edit the `.env` file and replace `your_api_key_here` with your actual API key:
   ```
   VITE_APP_TAVUS_API_KEY=your_actual_api_key_here
   ```
   You can create an API key at https://platform.tavus.io/

2. **Start the development server:**
   ```
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173` to see your app in action!

### 🚀 Advanced Setup (Custom LLM + RAG + Tools)

For the full experience with RAG and tool calling:

1. **Follow the basic setup above**

2. **Set up the Custom LLM Server:**
   See the detailed guide: [`setup-custom-llm.md`](./setup-custom-llm.md)

3. **Quick start (Windows):**
   ```bash
   # Set your OpenAI API key
   set OPENAI_API_KEY=your_openai_api_key_here
   
   # Start the custom LLM server
   start-custom-llm.bat
   ```

4. **Quick start (macOS/Linux):**
   ```bash
   # Set your OpenAI API key
   export OPENAI_API_KEY=your_openai_api_key_here
   
   # Start the custom LLM server
   cd custom-llm-server
   python start_server.py
   ```

## 🎯 Usage Examples

Once the custom LLM is running, try these commands:

- **Company Info**: "Tell me about ACME Corporation"
- **Weather**: "What's the weather like in Tokyo?"
- **Calculations**: "What is 25 * 4 + 10?"
- **FAQ**: "What's your return policy?"

## 🔧 Configuration

### Environment Variables

**Required:**
- `VITE_APP_TAVUS_API_KEY` - Your Tavus API key

**Optional (for custom LLM):**
- `OPENAI_API_KEY` - Your OpenAI API key for custom LLM features

### Customization

- **Knowledge Base**: Edit `custom-llm-server/server.py` to add your own data
- **Tools**: Add new functions to extend AI capabilities
- **UI**: Modify React components for custom styling

## 📊 Status Indicators

The app shows real-time status indicators:

- 🟢 **Custom LLM + RAG + Tools**: Full functionality with OpenAI
- 🟡 **Basic Replica**: Standard Tavus replica
- 🔵 **Stock Persona**: Free trial fallback
- 🟡 **Connecting...**: Establishing connection
- 🔴 **Disconnected**: Connection lost

## 📚 Learn More

- [Developer Documentation](https://docs.tavus.io/)
- [API Reference](https://docs.tavus.io/api-reference/)
- [Tavus Platform](https://platform.tavus.io/)
- [Daily React Reference](https://docs.daily.co/reference/daily-react)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## 🤝 Contributing

Feel free to customize and extend this app for your needs:

1. **Add new tools** to the custom LLM server
2. **Expand the knowledge base** with your own data
3. **Enhance the UI** with additional features
4. **Integrate with your APIs** for real-time data

## 📄 License

This project is open source and available under the MIT License.
