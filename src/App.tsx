import { useEffect, useState } from 'react'
import { DailyProvider } from '@daily-co/daily-react'
import { WelcomeScreen } from '@/components/WelcomeScreen'
import { HairCheckScreen } from '@/components/HairCheckScreen'
import { CallScreen } from '@/components/CallScreen'
import { createConversation, endConversation } from '@/api'
import { IConversation } from '@/types'
import { useToast } from "@/hooks/use-toast"
import { ConversationInterface } from './components/ConversationInterface'
import { createPersona } from './api/createPersona'

function App() {
  const { toast } = useToast()
  const [screen, setScreen] = useState<'welcome' | 'hairCheck' | 'call'>('welcome')
  const [conversation, setConversation] = useState<IConversation | null>(null)
  const [loading, setLoading] = useState(false)
  const [roomUrl, setRoomUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    return () => {
      if (conversation) {
        void endConversation(conversation.conversation_id)
      }
    }
  }, [conversation])

  const handleStart = async () => {
    try {
      setLoading(true)
      setError(null)

      // First create the persona
      const persona = await createPersona()
      console.log('Created persona:', persona)

      // Then create the conversation with the persona ID
      const conversation = await createConversation(persona.id)
      setConversation(conversation)
      setRoomUrl(conversation.room_url)
      setScreen('hairCheck')
    } catch (err) {
      console.error('Error starting conversation:', err)
      setError(err instanceof Error ? err.message : 'Failed to start conversation')
    } finally {
      setLoading(false)
    }
  }

  const handleEnd = async () => {
    try {
      if (!conversation) return
      await endConversation(conversation.conversation_id)
    } catch (error) {
      console.error(error)
    } finally {
      setConversation(null)
      setScreen('welcome')
    }
  }

  const handleJoin = () => {
    setScreen('call')
  }

  const handleLeave = () => {
    setRoomUrl(null)
  }

  if (roomUrl) {
    return <ConversationInterface roomUrl={roomUrl} onLeave={handleLeave} />
  }

  return (
    <main>
      <DailyProvider>
        {screen === 'welcome' && <WelcomeScreen onStart={handleStart} loading={loading} />}
        {screen === 'hairCheck' && <HairCheckScreen handleEnd={handleEnd} handleJoin={handleJoin} />}
        {screen === 'call' && conversation && <CallScreen conversation={conversation} handleEnd={handleEnd} />}
      </DailyProvider>
    </main>
  )
}

export default App
