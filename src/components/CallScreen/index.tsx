import { useEffect } from 'react';
import { useDaily } from '@daily-co/daily-react';
import { IConversation } from '@/types';
import { CameraSettings } from '../CameraSettings';
import { Call } from '../Call';
import { Phone } from 'lucide-react';

export const CallScreen = ({ conversation, handleEnd }: { conversation: IConversation, handleEnd: () => void }) => {
  const daily = useDaily();

  useEffect(() => {
    if (conversation && daily) {
      const { conversation_url } = conversation;
      
      // Check if already in a meeting, leave first
      if (daily.meetingState() !== 'left-meeting') {
        daily.leave().then(() => {
          daily.join({
            url: conversation_url,
          });
        });
      } else {
        daily.join({
          url: conversation_url,
        });
      }
    }
  }, [daily, conversation]);

  const handleLeave = async () => {
    await daily?.leave();
    handleEnd();
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-2000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <h1 className="text-white text-xl font-semibold">AI Assistant</h1>
          </div>
          <div className="flex items-center gap-2 text-gray-300 text-sm">
            <Phone className="w-4 h-4" />
            <span>Connected</span>
          </div>
        </div>
      </div>

      {/* Main video area */}
      <div className="relative z-10 flex-1 px-6">
        <Call />
      </div>

      {/* Enhanced controls */}
      <div className="relative z-10 p-6">
        <div className="flex justify-center">
          <CameraSettings
            actionLabel="End Conversation"
            onAction={handleLeave}
          />
        </div>
      </div>

      {/* Footer info */}
      <div className="relative z-10 text-center pb-6">
        <p className="text-gray-400 text-sm">
          Powered by Tavus AI • Secure & Private
        </p>
      </div>
    </div>
  );
};
