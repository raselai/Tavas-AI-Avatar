#!/usr/bin/env python3
"""
Custom LLM Server Startup Script
Starts the OpenAI-compatible server with RAG and tool calling capabilities
"""

import os
import sys
import subprocess
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

def check_requirements():
    """Check if required packages are installed"""
    try:
        import fastapi
        import uvicorn
        import openai
        import pydantic
        print("✅ All required packages are installed")
        return True
    except ImportError as e:
        print(f"❌ Missing required package: {e}")
        print("Please install requirements: pip install -r requirements.txt")
        return False

def check_openai_key():
    """Check if OpenAI API key is set"""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("⚠️  Warning: OPENAI_API_KEY environment variable not set")
        print("The server will start but OpenAI features may not work")
        print("Set your API key: export OPENAI_API_KEY=your_key_here")
        return False
    else:
        print("✅ OpenAI API key is configured")
        return True

def start_server():
    """Start the custom LLM server"""
    print("🚀 Starting Custom LLM Server with RAG...")
    print("📍 Server will be available at: http://localhost:8001")
    print("📖 API docs will be available at: http://localhost:8001/docs")
    print("🔧 Health check: http://localhost:8001/health")
    print("\n" + "="*50)
    
    # Start the server
    try:
        subprocess.run([
            sys.executable, "-m", "uvicorn", 
            "server:app", 
            "--host", "0.0.0.0", 
            "--port", "8001", 
            "--reload"
        ], check=True)
    except KeyboardInterrupt:
        print("\n🛑 Server stopped by user")
    except subprocess.CalledProcessError as e:
        print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    print("🤖 Custom LLM Server with RAG & Tool Calling")
    print("=" * 50)
    
    # Check requirements
    if not check_requirements():
        sys.exit(1)
    
    # Check OpenAI key
    check_openai_key()
    
    # Start server
    start_server() 