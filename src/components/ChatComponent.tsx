'use client'

import { useState } from 'react'
import { useChat } from 'ai/react'

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()

  return (
    <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6">
      <h2 className="text-xl font-semibold text-white mb-4">AI Chat Assistant</h2>
      
      <div className="h-[400px] overflow-y-auto mb-4 p-4 rounded-lg bg-gray-900/50 border border-gray-700">
        {messages.length === 0 ? (
          <div className="flex h-full items-center justify-center text-gray-400">
            <p>Start a conversation with the AI assistant.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`p-3 rounded-lg ${
                  message.role === 'user' 
                    ? 'bg-blue-900/30 border border-blue-800/50 ml-8' 
                    : 'bg-gray-800/30 border border-gray-700 mr-8'
                }`}
              >
                <div className="font-medium text-sm mb-1 text-gray-300">
                  {message.role === 'user' ? 'You' : 'AI Assistant'}
                </div>
                <div className="text-white whitespace-pre-wrap">{message.content}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your message..."
          className="flex-1 bg-gray-900/50 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isLoading}
        />
        <button 
          type="submit"
          disabled={isLoading || !input.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg px-4 py-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
          ) : (
            'Send'
          )}
        </button>
      </form>
    </div>
  )
}
