
import React from 'react';
import ChatContainer from '../components/chat/ChatContainer';

const Index = () => {
  // Sample initial messages
  const initialMessages = [
    {
      id: '1',
      content: 'Hello! How can I assist you today?',
      isBot: true,
      timestamp: new Date(Date.now() - 60000), // 1 minute ago
    }
  ];

  // Sample quick replies
  const quickReplies = [
    "Tell me more",
    "How does this work?",
    "I need help",
    "Contact support"
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md h-[600px] md:h-[700px]">
        <ChatContainer
          botName="Lovable AI"
          initialMessages={initialMessages}
          quickReplies={quickReplies}
          className="h-full"
        />
      </div>
    </div>
  );
};

export default Index;
