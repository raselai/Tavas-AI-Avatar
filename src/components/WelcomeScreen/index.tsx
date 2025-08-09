import { Button } from '../ui/button';
import { MessageCircle, Video, Sparkles, ArrowRight } from 'lucide-react';

export const WelcomeScreen = ({ onStart, loading }: { onStart: () => void, loading: boolean }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-center">
        {/* Logo/Icon area */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mb-6 mx-auto shadow-2xl">
            <Video className="w-12 h-12 text-white" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-yellow-400 animate-bounce" />
        </div>

        {/* Main heading */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Meet Your
          <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
            AI Assistant
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl leading-relaxed">
          Experience the future of conversation with our intelligent AI avatar
        </p>
        
        <p className="text-lg text-gray-400 mb-12 max-w-xl">
          Powered by advanced AI technology for natural, engaging interactions
        </p>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
            <MessageCircle className="w-5 h-5 text-purple-400" />
            <span>Natural Conversations</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
            <Video className="w-5 h-5 text-blue-400" />
            <span>Real-time Video</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-white">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span>AI Powered</span>
          </div>
        </div>

        {/* CTA Button */}
        <Button 
          onClick={onStart}
          disabled={loading}
          className="group bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Connecting...
            </div>
          ) : (
            <div className="flex items-center gap-3">
              Start Conversation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          )}
        </Button>

        {/* Bottom text */}
        <p className="text-sm text-gray-500 mt-8">
          Click to begin your AI conversation experience
        </p>
      </div>
    </div>
  );
};
