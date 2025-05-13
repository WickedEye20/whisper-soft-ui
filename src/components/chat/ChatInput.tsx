
import React, { useState } from 'react';
import { Send } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = 'Type a message...',
}) => {
  const [message, setMessage] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };
  
  return (
    <form 
      onSubmit={handleSubmit}
      className="border-t p-3 flex gap-2 items-center bg-chat-input"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 py-2 px-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
      <button
        type="submit"
        disabled={disabled || !message.trim()}
        className={`p-2 rounded-full ${
          message.trim() ? 'bg-chat-bot text-white' : 'bg-gray-200 text-gray-400'
        } flex items-center justify-center transition-colors`}
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatInput;
