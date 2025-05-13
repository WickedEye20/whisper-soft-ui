
import React from 'react';
import { cn } from "@/lib/utils";

interface ChatHeaderProps {
  botName: string;
  isOnline?: boolean;
  avatarSrc?: string;
  className?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  botName,
  isOnline = true,
  avatarSrc,
  className,
}) => {
  return (
    <div className={cn("flex items-center gap-3 p-4 border-b", className)}>
      <div className="relative">
        {avatarSrc ? (
          <img 
            src={avatarSrc} 
            alt={botName} 
            className="w-10 h-10 rounded-full object-cover"
          />
        ) : (
          <div className="w-10 h-10 bg-chat-bot text-white rounded-full flex items-center justify-center text-lg font-semibold">
            {botName.charAt(0)}
          </div>
        )}
        
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
        )}
      </div>
      
      <div>
        <h3 className="font-medium text-lg">{botName}</h3>
        <p className="text-xs text-gray-500">{isOnline ? 'Online' : 'Offline'}</p>
      </div>
    </div>
  );
};

export default ChatHeader;
