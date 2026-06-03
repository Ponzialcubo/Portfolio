import { createContext, useContext, useState, useCallback } from 'react'

const ChatContext = createContext({})

export function ChatProvider({ children }) {
  const [userData, setUserData]   = useState({ name: '', email: '' })
  const [chatStarted, setChatStarted] = useState(false)

  const startChat = useCallback((name, email) => {
    setUserData({ name: name.trim(), email: email.trim() })
    setChatStarted(true)
  }, [])

  return (
    <ChatContext.Provider value={{ userData, chatStarted, startChat }}>
      {children}
    </ChatContext.Provider>
  )
}

export const useChat = () => useContext(ChatContext)
