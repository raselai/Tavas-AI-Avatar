import { useState } from 'react';
import { DailyAudio, useParticipantIds, useLocalSessionId } from '@daily-co/daily-react';
import { Minimize, Maximize, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Video } from '../Video';
import { Button } from '../ui/button';

export const Call = () => {
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' });
  const localSessionId = useLocalSessionId();
  const [mode, setMode] = useState<'full' | 'minimal'>('full');

  const handleToggleMode = () => {
    setMode(prev => prev === 'full' ? 'minimal' : 'full');
  }

  return <>
    <div className={cn("flex items-center justify-center", {
      'fixed bottom-20 right-20': mode === 'minimal',
    })}>
      <div className='relative'>
        <Button 
          variant='outline' 
          onClick={handleToggleMode} 
          className='absolute top-4 right-4 z-10 gap-2 bg-black/20 backdrop-blur-sm border-white/20 text-white hover:bg-black/40 hover:text-white' 
          size='sm'
        >
          {mode === 'full' ? 'Minimize' : 'Maximize'}
          {mode === 'full' ? <Minimize className='size-4' /> : <Maximize className='size-4' />}
        </Button>
        
        {remoteParticipantIds.length > 0 ? (
          <div className="relative">
            <Video
              id={remoteParticipantIds[0]}
              className={cn("rounded-2xl shadow-2xl border-2 border-white/10", {
                'max-h-[60vh] min-h-[25rem] w-full': mode === 'full',
                'max-h-[15rem] w-[12rem]': mode === 'minimal',
              })}
            />
            {/* AI Assistant label */}
            <div className="absolute bottom-4 left-4 bg-gradient-to-r from-purple-500/80 to-blue-500/80 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                AI Assistant
              </div>
            </div>
          </div>
        ) : (
          <div className='relative flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border-2 border-white/10' 
               style={{ width: '600px', height: '400px' }}>
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full flex items-center justify-center mb-4 mx-auto">
                <User className="w-10 h-10 text-white" />
              </div>
              <p className='text-xl text-white mb-2'>Connecting to AI Assistant...</p>
              <p className='text-gray-400'>Please wait while we establish the connection</p>
              <div className="flex justify-center mt-4">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-200"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce animation-delay-400"></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Local video (user's camera) */}
        {localSessionId && (
          <div className="absolute bottom-4 right-4">
            <Video
              id={localSessionId}
              className={cn('rounded-xl shadow-lg border-2 border-white/20', {
                'max-h-32 w-24': mode === 'full',
                'max-h-16 w-12': mode === 'minimal',
              })}
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1">
              <User className="w-3 h-3 text-white" />
            </div>
          </div>
        )}
      </div>
    </div>
    <DailyAudio />
  </>
}