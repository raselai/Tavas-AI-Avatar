import { useEffect } from 'react';
import { useDaily } from '@daily-co/daily-react';
import { useLocalSessionId } from '@daily-co/daily-react';
import { CameraSettings } from '../CameraSettings';
import { Video } from '../Video';
import { Camera, CheckCircle } from 'lucide-react';

export const HairCheckScreen = ({ handleJoin, handleEnd }:
  {
    handleJoin: () => void,
    handleEnd: () => void
  }
) => {
  const localSessionId = useLocalSessionId();
  const daily = useDaily();

  useEffect(() => {
    if (daily) {
      daily?.startCamera({ startVideoOff: false, startAudioOff: false });
    }
  }, [daily, localSessionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mb-4 mx-auto shadow-2xl">
            <Camera className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Camera & Audio Check
          </h1>
          <p className="text-xl text-gray-300 mb-2">
            Make sure you look and sound great before joining
          </p>
          <p className="text-gray-400">
            Adjust your camera and microphone settings below
          </p>
        </div>

        {/* Video preview */}
        <div className="mb-8">
          <div className="relative">
            <Video 
              id={localSessionId} 
              className='max-h-[50vh] max-w-[600px] rounded-2xl shadow-2xl border-2 border-white/10' 
            />
            {/* Preview label */}
            <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Preview
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full max-w-2xl">
          <CameraSettings
            actionLabel='Join Conversation'
            onAction={handleJoin}
            cancelLabel='Cancel'
            onCancel={handleEnd}
          />
        </div>

        {/* Tips */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-green-400 mb-2">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Ready to connect</span>
          </div>
          <p className="text-sm text-gray-500">
            Your AI assistant is waiting to chat with you
          </p>
        </div>
      </div>
    </div>
  );
};