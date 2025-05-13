
import React from 'react';
import ChatContainer from '../components/chat/ChatContainer';
import { GeminiProvider } from '../context/GeminiContext';

const Index = () => {
  // Sample initial messages
  const initialMessages = [
    {
      id: '1',
      content: 'Hello! I am Gemini AI assistant. How can I help you today?',
      isBot: true,
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
    }
  ];

  // Sample quick replies
  const quickReplies = [
    "Tell me a joke",
    "What can you do?",
    "How does AI work?",
    "Write a poem"
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <GeminiProvider>
        <div className="w-full max-w-md h-[600px] md:h-[700px]">
          <ChatContainer
            botName="Gemini AI"
            initialMessages={initialMessages}
            quickReplies={quickReplies}
            className="h-full"
          />
        </div>
      </GeminiProvider>
    </div>
  );
};

export default Index;
