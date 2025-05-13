
import React from 'react';
import { format } from 'date-fns';
import { cn } from "@/lib/utils";

export interface ChatMessageProps {
  content: string;
  isBot: boolean;
  timestamp: Date;
  avatarSrc?: string;
  botName?: string;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  content,
  isBot,
  timestamp,
  avatarSrc,
  botName = 'Bot',
}) => {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isBot ? "justify-start" : "justify-end"
    )}>
      {isBot && (
        <div className="flex-shrink-0 mr-2">
          {avatarSrc ? (
            <img 
              src={avatarSrc} 
              alt={botName} 
              className="w-8 h-8 rounded-full object-cover"
            />
          ) : (
            <div className="w-8 h-8 bg-chat-bot text-white rounded-full flex items-center justify-center text-sm font-semibold">
              {botName.charAt(0)}
            </div>
          )}
        </div>
      )}
      
      <div className={cn(
        "max-w-[75%]",
      )}>
        <div className={cn(
          "p-3 rounded-xl",
          isBot ? "bg-chat-bot-light text-gray-800 rounded-tl-none" : "bg-chat-user text-gray-800 rounded-tr-none",
        )}>
          <p className="whitespace-pre-wrap">{content}</p>
        </div>
        <div className={cn(
          "text-xs text-gray-500 mt-1",
          isBot ? "text-left" : "text-right"
        )}>
          {format(timestamp, 'p')}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
