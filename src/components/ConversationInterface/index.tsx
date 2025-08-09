import { useEffect, useRef, useState } from 'react';
import DailyIframe, { DailyCall } from '@daily-co/daily-js';
import { Button } from '../ui/button';
import { Mic, MicOff, Video, VideoOff, Phone, Settings, Zap, Database, Calculator } from 'lucide-react';

interface ConversationInterfaceProps {
  roomUrl: string;
  onLeave: () => void;
}

export const ConversationInterface = ({ roomUrl, onLeave }: ConversationInterfaceProps) => {
  const callFrameRef = useRef<DailyCall | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting');
  const [llmStatus, setLlmStatus] = useState<'custom' | 'basic' | 'stock' | 'unknown'>('unknown');

  useEffect(() => {
    // Check which LLM configuration was used based on console logs
    const originalLog = console.log;
    console.log = (...args) => {
      const message = args.join(' ');
      if (message.includes('Created conversation with custom LLM and tool calling')) {
        setLlmStatus('custom');
      } else if (message.includes('Created conversation with basic replica')) {
        setLlmStatus('basic');
      } else if (message.includes('Created conversation with stock persona')) {
        setLlmStatus('stock');
      }
      originalLog(...args);
    };

    const initializeCall = async () => {
      try {
        const callFrame = DailyIframe.createFrame({
          iframeStyle: {
            position: 'absolute',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            border: 'none',
            borderRadius: '12px',
          },
          showLeaveButton: false,
          showFullscreenButton: false,
        });

        callFrameRef.current = callFrame;

        callFrame.on('joined-meeting', () => {
          setConnectionStatus('connected');
        });

        callFrame.on('left-meeting', () => {
          setConnectionStatus('disconnected');
          onLeave();
        });

        callFrame.on('error', (error) => {
          console.error('Daily call error:', error);
          setConnectionStatus('disconnected');
        });

        await callFrame.join({ url: roomUrl });
      } catch (error) {
        console.error('Failed to initialize call:', error);
        setConnectionStatus('disconnected');
      }
    };

    initializeCall();

    return () => {
      if (callFrameRef.current) {
        callFrameRef.current.destroy();
      }
      console.log = originalLog;
    };
  }, [roomUrl, onLeave]);

  const toggleAudio = () => {
    if (callFrameRef.current) {
      callFrameRef.current.setLocalAudio(!isAudioEnabled);
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const toggleVideo = () => {
    if (callFrameRef.current) {
      callFrameRef.current.setLocalVideo(!isVideoEnabled);
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const leaveCall = () => {
    if (callFrameRef.current) {
      callFrameRef.current.leave();
    }
  };

  const getLlmStatusInfo = () => {
    switch (llmStatus) {
      case 'custom':
        return {
          icon: <Zap className="w-4 h-4 text-green-400" />,
          text: 'Custom LLM + RAG + Tools',
          color: 'bg-green-500/20 border-green-500/30 text-green-300'
        };
      case 'basic':
        return {
          icon: <Settings className="w-4 h-4 text-yellow-400" />,
          text: 'Basic Replica',
          color: 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
        };
      case 'stock':
        return {
          icon: <Database className="w-4 h-4 text-blue-400" />,
          text: 'Stock Persona',
          color: 'bg-blue-500/20 border-blue-500/30 text-blue-300'
        };
      default:
        return {
          icon: <Settings className="w-4 h-4 text-gray-400" />,
          text: 'Detecting...',
          color: 'bg-gray-500/20 border-gray-500/30 text-gray-300'
        };
    }
  };

  const statusInfo = getLlmStatusInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900 relative">
      {/* Status Bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center">
        {/* LLM Status */}
        <div className={`flex items-center gap-2 px-3 py-2 rounded-full border backdrop-blur-sm ${statusInfo.color}`}>
          {statusInfo.icon}
          <span className="text-sm font-medium">{statusInfo.text}</span>
          {llmStatus === 'custom' && (
            <div className="flex items-center gap-1 ml-2">
              <Database className="w-3 h-3" />
              <Calculator className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Connection Status */}
        <div className={`px-3 py-2 rounded-full text-sm font-medium backdrop-blur-sm border ${
          connectionStatus === 'connected' 
            ? 'bg-green-500/20 border-green-500/30 text-green-300'
            : connectionStatus === 'connecting'
            ? 'bg-yellow-500/20 border-yellow-500/30 text-yellow-300'
            : 'bg-red-500/20 border-red-500/30 text-red-300'
        }`}>
          {connectionStatus === 'connected' && '🟢 Connected'}
          {connectionStatus === 'connecting' && '🟡 Connecting...'}
          {connectionStatus === 'disconnected' && '🔴 Disconnected'}
        </div>
      </div>

      {/* Video Container */}
      <div className="relative w-full h-screen">
        <div 
          id="daily-call-container" 
          className="w-full h-full rounded-xl overflow-hidden shadow-2xl"
        />
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-lg rounded-full px-6 py-4 border border-white/10">
          <Button
            onClick={toggleAudio}
            variant="ghost"
            size="icon"
            className={`rounded-full w-12 h-12 ${
              isAudioEnabled 
                ? 'bg-white/20 hover:bg-white/30 text-white' 
                : 'bg-red-500/80 hover:bg-red-500 text-white'
            }`}
          >
            {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
          </Button>

          <Button
            onClick={toggleVideo}
            variant="ghost"
            size="icon"
            className={`rounded-full w-12 h-12 ${
              isVideoEnabled 
                ? 'bg-white/20 hover:bg-white/30 text-white' 
                : 'bg-red-500/80 hover:bg-red-500 text-white'
            }`}
          >
            {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
          </Button>

          <Button
            onClick={leaveCall}
            variant="ghost"
            size="icon"
            className="rounded-full w-12 h-12 bg-red-500/80 hover:bg-red-500 text-white"
          >
            <Phone className="w-5 h-5 rotate-[135deg]" />
          </Button>
        </div>
      </div>

      {/* Feature Indicators for Custom LLM */}
      {llmStatus === 'custom' && (
        <div className="absolute bottom-8 right-8 z-20">
          <div className="bg-black/40 backdrop-blur-lg rounded-lg p-4 border border-white/10">
            <h3 className="text-white font-semibold mb-2 text-sm">Available Features</h3>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-green-300">
                <Database className="w-3 h-3" />
                <span>Company Knowledge Base</span>
              </div>
              <div className="flex items-center gap-2 text-blue-300">
                <Zap className="w-3 h-3" />
                <span>Weather Information</span>
              </div>
              <div className="flex items-center gap-2 text-purple-300">
                <Calculator className="w-3 h-3" />
                <span>Mathematical Calculations</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs mt-2">
              Try: "What's the weather in Tokyo?" or "Calculate 15 * 8"
            </p>
          </div>
        </div>
      )}
    </div>
  );
}; 