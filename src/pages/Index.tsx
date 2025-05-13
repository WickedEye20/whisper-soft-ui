
import React from 'react';
import ChatPopup from '../components/chat/ChatPopup';

const Index = () => {
  // Sample quick replies
  const quickReplies = [
    "Tell me more",
    "How does this work?",
    "I need help",
    "Contact support"
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Website</h1>
        <p className="text-lg text-gray-600 mb-6">Click the chat icon in the bottom right to get started</p>
      </div>
      
      <ChatPopup 
        botName="Lovable AI"
        quickReplies={quickReplies}
      />
    </div>
  );
};

export default Index;
