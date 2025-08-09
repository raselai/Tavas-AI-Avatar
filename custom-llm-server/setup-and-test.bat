@echo off
echo 🚀 Custom LLM Server Setup and Test Script
echo ==========================================

REM Check if we're in the right directory
if not exist "requirements.txt" (
    echo ❌ Error: requirements.txt not found
    echo Please run this script from the custom-llm-server directory
    pause
    exit /b 1
)

echo 📂 Current directory: %CD%

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo 🔧 Creating virtual environment...
    python -m venv venv
    if errorlevel 1 (
        echo ❌ Failed to create virtual environment
        pause
        exit /b 1
    )
    echo ✅ Virtual environment created
) else (
    echo ✅ Virtual environment already exists
)

REM Activate virtual environment
echo 🔄 Activating virtual environment...
call venv\Scripts\activate.bat

REM Install dependencies
echo 📦 Installing dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

REM Check if .env file exists
if not exist ".env" (
    echo ⚠️  Warning: .env file not found
    echo Creating .env template...
    echo # OpenAI API Configuration > .env
    echo OPENAI_API_KEY=your_openai_api_key_here >> .env
    echo. >> .env
    echo # Server Configuration >> .env
    echo HOST=0.0.0.0 >> .env
    echo PORT=8001 >> .env
    echo.
    echo ❗ IMPORTANT: Please edit .env file and add your OpenAI API key
    echo Then run this script again to test the server
    pause
    exit /b 0
)

REM Check if API key is set
findstr /C:"your_openai_api_key_here" .env >nul
if not errorlevel 1 (
    echo ⚠️  Warning: OpenAI API key not configured
    echo Please edit .env file and replace 'your_openai_api_key_here' with your actual API key
    echo Then run this script again
    pause
    exit /b 0
)

echo ✅ Setup complete! Starting tests...
echo.

REM Start server in background
echo 🚀 Starting server...
start /B python start_server.py

REM Wait for server to start
echo ⏳ Waiting for server to start...
timeout /t 5 /nobreak >nul

REM Run tests
echo 🧪 Running test suite...
python test_server.py

echo.
echo 🎉 Setup and testing complete!
echo.
echo Next steps:
echo 1. Keep the server running (don't close the server window)
echo 2. Open a new terminal and run: cd my-tavus-app && npm run dev
echo 3. Open browser to http://localhost:5173
echo 4. Look for green "Custom LLM + RAG + Tools" status
echo.
pause 