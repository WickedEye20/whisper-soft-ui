
import React from 'react';

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center mb-4">
      <div className="flex-shrink-0 mr-2">
        <div className="w-8 h-8 bg-chat-bot text-white rounded-full flex items-center justify-center text-sm font-semibold">
          A
        </div>
      </div>
      
      <div className="bg-chat-bot-light p-3 rounded-xl rounded-tl-none max-w-[75%]">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-gray-600 rounded-full mr-1 animate-pulse-dots" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full mr-1 animate-pulse-dots" style={{ animationDelay: '300ms' }}></div>
          <div className="w-2 h-2 bg-gray-600 rounded-full animate-pulse-dots" style={{ animationDelay: '600ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
