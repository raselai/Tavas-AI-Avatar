#!/usr/bin/env python3
"""
Test script for the Custom LLM Server
Tests RAG, tool calling, and OpenAI compatibility
"""

import requests
import json
import time

SERVER_URL = "http://localhost:8001"

def test_health():
    """Test server health endpoint"""
    print("🔍 Testing server health...")
    try:
        response = requests.get(f"{SERVER_URL}/health")
        if response.status_code == 200:
            print("✅ Server is healthy")
            return True
        else:
            print(f"❌ Health check failed: {response.status_code}")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Cannot connect to server. Is it running?")
        return False

def test_basic_chat():
    """Test basic chat functionality"""
    print("\n🔍 Testing basic chat...")
    
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": "What is ACME Corporation?"}
        ],
        "stream": False
    }
    
    try:
        response = requests.post(f"{SERVER_URL}/chat/completions", json=payload)
        if response.status_code == 200:
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            print("✅ Basic chat works")
            print(f"📝 Response: {content[:100]}...")
            return True
        else:
            print(f"❌ Basic chat failed: {response.status_code}")
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Basic chat error: {e}")
        return False

def test_rag():
    """Test RAG functionality"""
    print("\n🔍 Testing RAG (company knowledge)...")
    
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": "What are ACME's products and when was it founded?"}
        ],
        "stream": False
    }
    
    try:
        response = requests.post(f"{SERVER_URL}/chat/completions", json=payload)
        if response.status_code == 200:
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            print("✅ RAG works")
            print(f"📝 Response: {content[:150]}...")
            
            # Check if response contains knowledge base info
            if "2020" in content or "AI Chatbots" in content:
                print("✅ RAG successfully retrieved knowledge base information")
            else:
                print("⚠️ RAG may not be working - no knowledge base info detected")
            return True
        else:
            print(f"❌ RAG test failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ RAG test error: {e}")
        return False

def test_tool_calling():
    """Test tool calling functionality"""
    print("\n🔍 Testing tool calling...")
    
    tools = [
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
    
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": "What's the weather like in New York?"}
        ],
        "tools": tools,
        "stream": False
    }
    
    try:
        response = requests.post(f"{SERVER_URL}/chat/completions", json=payload)
        if response.status_code == 200:
            data = response.json()
            message = data["choices"][0]["message"]
            
            if "tool_calls" in message:
                print("✅ Tool calling works - AI wants to call tools")
                print(f"🔧 Tool calls: {len(message['tool_calls'])}")
                for tool_call in message["tool_calls"]:
                    print(f"   - {tool_call['function']['name']}: {tool_call['function']['arguments']}")
                return True
            else:
                print("⚠️ No tool calls detected - AI responded directly")
                print(f"📝 Response: {message['content'][:100]}...")
                return False
        else:
            print(f"❌ Tool calling test failed: {response.status_code}")
            print(f"Error: {response.text}")
            return False
    except Exception as e:
        print(f"❌ Tool calling test error: {e}")
        return False

def test_calculator():
    """Test calculator tool"""
    print("\n🔍 Testing calculator tool...")
    
    tools = [
        {
            "type": "function",
            "function": {
                "name": "calculate",
                "description": "Perform mathematical calculations",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "expression": {"type": "string"}
                    },
                    "required": ["expression"]
                }
            }
        }
    ]
    
    payload = {
        "model": "gpt-3.5-turbo",
        "messages": [
            {"role": "user", "content": "What is 25 * 4 + 10?"}
        ],
        "tools": tools,
        "stream": False
    }
    
    try:
        response = requests.post(f"{SERVER_URL}/chat/completions", json=payload)
        if response.status_code == 200:
            data = response.json()
            message = data["choices"][0]["message"]
            
            if "tool_calls" in message:
                print("✅ Calculator tool calling works")
                for tool_call in message["tool_calls"]:
                    if tool_call["function"]["name"] == "calculate":
                        args = json.loads(tool_call["function"]["arguments"])
                        print(f"🧮 Expression: {args.get('expression', 'N/A')}")
                return True
            else:
                print("⚠️ Calculator tool not called")
                return False
        else:
            print(f"❌ Calculator test failed: {response.status_code}")
            return False
    except Exception as e:
        print(f"❌ Calculator test error: {e}")
        return False

def main():
    """Run all tests"""
    print("🧪 Custom LLM Server Test Suite")
    print("=" * 40)
    
    tests = [
        ("Health Check", test_health),
        ("Basic Chat", test_basic_chat),
        ("RAG Knowledge", test_rag),
        ("Tool Calling", test_tool_calling),
        ("Calculator Tool", test_calculator)
    ]
    
    results = []
    for test_name, test_func in tests:
        try:
            result = test_func()
            results.append((test_name, result))
        except Exception as e:
            print(f"❌ {test_name} crashed: {e}")
            results.append((test_name, False))
        
        time.sleep(1)  # Brief pause between tests
    
    # Summary
    print("\n" + "=" * 40)
    print("📊 Test Results Summary")
    print("=" * 40)
    
    passed = 0
    for test_name, result in results:
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name}")
        if result:
            passed += 1
    
    print(f"\n🎯 {passed}/{len(results)} tests passed")
    
    if passed == len(results):
        print("🎉 All tests passed! Server is ready for Tavus integration.")
    else:
        print("⚠️ Some tests failed. Check the server configuration.")

if __name__ == "__main__":
    main() 