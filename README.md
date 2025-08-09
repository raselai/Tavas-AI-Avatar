# 🚀 My Tavus AI Learning Project

Hey there! 👋 I'm **Nazmul Hoque**, a Gen AI engineer who loves exploring the cutting edge of conversational AI. This is my learning project where I dove deep into Tavus's conversational video interface and built some pretty cool custom features!

## ✨ What I Built

This project started as a learning experiment and turned into something pretty awesome:

- **🎨 Beautiful Welcome Screen** - Because first impressions matter, right?
- **📱 Hair Check Screen** - Making sure you look your best before the call
- **🎥 Video Call Interface** - Powered by Daily.co with real-time controls
- **🤖 Tavus API Integration** - The backbone of conversation management
- **🧠 Custom LLM Server** - My favorite part! Built with RAG and tool calling
- **🔄 Smart Fallback System** - Because things don't always go as planned
- **📊 Real-time Status Indicators** - Keeping you in the loop

### 🧠 The AI Magic I Added

**My Custom LLM with RAG & Tools:**
- 🏢 **Company Knowledge Base** - Ask about ACME Corporation (my test company)
- 🌤️ **Weather Information** - Because who doesn't want to know the weather?
- 🧮 **Mathematical Calculations** - For when you need quick math
- 📚 **RAG-Enhanced Responses** - Making AI responses smarter and more relevant

**My Smart Fallback System:**
- 🟢 **Custom LLM + RAG + Tools** (The full experience with OpenAI)
- 🟡 **Basic Replica** (Standard Tavus replica)
- 🔵 **Stock Persona** (Free trial compatible)

|                                                                    |                                                                                              |
| ------------------------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| ![Prejoin UI](https://cdn.replica.tavus.io/git-examples/scr-1.png) | ![Hair check UI](https://cdn.replica.tavus.io/git-examples/scr-2.png) |
| ![in-call UI](https://cdn.replica.tavus.io/git-examples/scr-3.png) |

## 🎥 See It In Action

Check out the demo to see what I've been working on:

[Watch the Demo](https://www.loom.com/share/b4e3ef661e264260a8d8f4cede48aaa8?sid=ada64974-5495-4c52-b635-7ac76b543208)

## 🛠 Let's Get This Running

### Quick Start (Stock Persona)

1. **Get your Tavus API key:**
   Edit the `.env` file and add your API key:
   ```
   VITE_APP_TAVUS_API_KEY=your_actual_api_key_here
   ```
   Grab your key from https://platform.tavus.io/

2. **Fire up the dev server:**
   ```
   npm run dev
   ```

3. **Open your browser:**
   Head to `http://localhost:5173` and see the magic happen!

### 🚀 The Full Experience (Custom LLM + RAG + Tools)

Want to try the advanced features I built? Here's how:

1. **Follow the basic setup above**

2. **Set up my Custom LLM Server:**
   Check out the detailed guide: [`setup-custom-llm.md`](./setup-custom-llm.md)

3. **Quick start (Windows):**
   ```bash
   # Set your OpenAI API key
   set OPENAI_API_KEY=your_openai_api_key_here
   
   # Start my custom LLM server
   start-custom-llm.bat
   ```

4. **Quick start (macOS/Linux):**
   ```bash
   # Set your OpenAI API key
   export OPENAI_API_KEY=your_openai_api_key_here
   
   # Start my custom LLM server
   cd custom-llm-server
   python start_server.py
   ```

## 🎯 Try These Cool Features

Once my custom LLM is running, test it out with these commands:

- **Company Info**: "Tell me about ACME Corporation"
- **Weather**: "What's the weather like in Tokyo?"
- **Calculations**: "What is 25 * 4 + 10?"
- **FAQ**: "What's your return policy?"

## 🔧 Configuration

### Environment Variables

**Required:**
- `VITE_APP_TAVUS_API_KEY` - Your Tavus API key

**Optional (for my custom LLM):**
- `OPENAI_API_KEY` - Your OpenAI API key for the advanced features

### Customization

Feel free to make this your own:
- **Knowledge Base**: Edit `custom-llm-server/server.py` to add your own data
- **Tools**: Add new functions to extend AI capabilities
- **UI**: Modify React components for your own styling

## 📊 Status Indicators

I added these status indicators to keep you informed:

- 🟢 **Custom LLM + RAG + Tools**: Full functionality with OpenAI
- 🟡 **Basic Replica**: Standard Tavus replica
- 🔵 **Stock Persona**: Free trial fallback
- 🟡 **Connecting...**: Establishing connection
- 🔴 **Disconnected**: Connection lost

## 📚 What I Learned

This project taught me a ton about:
- Building conversational AI interfaces
- Integrating multiple APIs seamlessly
- Implementing RAG (Retrieval-Augmented Generation)
- Creating fallback systems for reliability
- Real-time video communication
- Modern React development with TypeScript

## 🔗 Useful Resources

- [Tavus Developer Documentation](https://docs.tavus.io/)
- [Tavus API Reference](https://docs.tavus.io/api-reference/)
- [Tavus Platform](https://platform.tavus.io/)
- [Daily React Reference](https://docs.daily.co/reference/daily-react)
- [OpenAI API Documentation](https://platform.openai.com/docs)

## 🤝 Want to Collaborate?

This is my learning project, but I'm always open to:
- **Adding new tools** to the custom LLM server
- **Expanding the knowledge base** with more data
- **Enhancing the UI** with additional features
- **Integrating with other APIs** for real-time data

Feel free to fork, modify, and make it your own learning project too!

## 📄 License

This project is open source and available under the MIT License. Go ahead and use it for your own learning adventures!

---

**Built with ❤️ by Nazmul Hoque | Gen AI Engineer**

*Learning never stops, and neither does innovation! 🚀*
