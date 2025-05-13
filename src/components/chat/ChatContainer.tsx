
import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickReply from './QuickReply';

interface Message extends Omit<ChatMessageProps, 'timestamp'> {
  id: string;
  timestamp: Date;
}

interface ChatContainerProps {
  botName?: string;
  avatarSrc?: string;
  initialMessages?: Message[];
  quickReplies?: string[];
  className?: string;
}

const ChatContainer: React.FC<ChatContainerProps> = ({
  botName = 'Assistant',
  avatarSrc,
  initialMessages = [],
  quickReplies = [],
  className,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(!!quickReplies.length);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate bot response
  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate typing delay
    setTimeout(() => {
      const responses = [
        "I understand you're asking about that. Let me help you.",
        "Thanks for your message. How can I assist you further?",
        "That's interesting! Could you tell me more?",
        `I see you said "${userMessage}". How can I help with that?`,
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: randomResponse,
          isBot: true,
          timestamp: new Date(),
        }
      ]);
      
      setIsTyping(false);
      setShowQuickReplies(true);
    }, 1500);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setShowQuickReplies(false);
    
    // Simulate bot response after user message
    simulateBotResponse(content);
  };

  const handleQuickReplySelect = (option: string) => {
    handleSendMessage(option);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div className={`flex flex-col h-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <ChatHeader 
        botName={botName} 
        avatarSrc={avatarSrc}
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            isBot={message.isBot}
            timestamp={message.timestamp}
            avatarSrc={message.isBot ? avatarSrc : undefined}
            botName={botName}
          />
        ))}
        
        {isTyping && <TypingIndicator />}
        
        {showQuickReplies && quickReplies.length > 0 && (
          <QuickReply
            options={quickReplies}
            onSelect={handleQuickReplySelect}
            disabled={isTyping}
          />
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={isTyping}
      />
    </div>
  );
};

export default ChatContainer;
