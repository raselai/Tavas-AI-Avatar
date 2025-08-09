@echo off
echo 🤖 Starting Custom LLM Server with RAG & Tool Calling
echo =====================================================

REM Check if we're in the right directory
if not exist "custom-llm-server" (
    echo ❌ Error: custom-llm-server directory not found
    echo Please run this script from the my-tavus-app directory
    pause
    exit /b 1
)

REM Check if OpenAI API key is set
if "%OPENAI_API_KEY%"=="" (
    echo ⚠️  Warning: OPENAI_API_KEY environment variable not set
    echo.
    echo Please set your OpenAI API key first:
    echo   set OPENAI_API_KEY=your_key_here
    echo.
    echo Or run this command in PowerShell:
    echo   $env:OPENAI_API_KEY="your_key_here"
    echo.
    pause
)

echo 📂 Navigating to custom-llm-server directory...
cd custom-llm-server

echo 🔍 Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.8+ first.
    pause
    exit /b 1
)

echo 📦 Installing dependencies...
pip install -r requirements.txt

echo 🚀 Starting the server...
echo.
echo The server will be available at: http://localhost:8001
echo API docs: http://localhost:8001/docs
echo Health check: http://localhost:8001/health
echo.
echo Press Ctrl+C to stop the server
echo.

python start_server.py

pause 