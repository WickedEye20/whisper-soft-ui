
import React from 'react';

interface ChatHeaderProps {
  botName?: string;
  avatarSrc?: string;
  rightAction?: React.ReactNode;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  botName = 'Assistant',
  avatarSrc,
  rightAction,
}) => {
  return (
    <div className="flex items-center p-3 border-b bg-white">
      <div className="flex items-center flex-1">
        {avatarSrc ? (
          <img 
            src={avatarSrc} 
            alt={botName} 
            className="w-8 h-8 rounded-full mr-2 object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-chat-bot text-white rounded-full flex items-center justify-center text-sm font-semibold mr-2">
            {botName.charAt(0)}
          </div>
        )}
        <div>
          <h3 className="font-medium text-gray-800">{botName}</h3>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-1" />
            <span className="text-xs text-gray-500">Online</span>
          </div>
        </div>
      </div>
      {rightAction && (
        <div className="ml-auto">
          {rightAction}
        </div>
      )}
    </div>
  );
};

export default ChatHeader;
