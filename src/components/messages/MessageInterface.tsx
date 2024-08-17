"use client"

import { useState, useEffect } from 'react'

interface Message {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: string
}

export default function MessageInterface({ matchId }: { matchId: string }) {
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')

  useEffect(() => {
    fetchMessages()
  }, [matchId])

  async function fetchMessages() {
    const response = await fetch(`/api/messages?matchId=${matchId}`)
    if (response.ok) {
      const data = await response.json()
      setMessages(data)
    }
  }

  async function sendMessage(e: React.FormEvent) {
    e.preventDefault()
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ receiverId: matchId, content: newMessage }),
    })

    if (response.ok) {
      setNewMessage('')
      fetchMessages()
    }
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.senderId === matchId ? 'text-left' : 'text-right'}`}>
            <span className="bg-gray-200 rounded px-2 py-1 inline-block">
              {message.content}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow border rounded-l px-2 py-1"
          placeholder="Type a message..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-r">
          Send
        </button>
      </form>
    </div>
  )
}