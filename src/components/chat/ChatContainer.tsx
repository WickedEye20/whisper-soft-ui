
import React, { useState, useEffect, useRef } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessage, { ChatMessageProps } from './ChatMessage';
import ChatInput from './ChatInput';
import TypingIndicator from './TypingIndicator';
import QuickReply from './QuickReply';
import ApiKeyInput from './ApiKeyInput';
import { useGemini } from '@/context/GeminiContext';
import { sendMessageToGemini } from '@/services/geminiService';
import { Button } from '@/components/ui/button';
import { Settings } from 'lucide-react';

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
  botName = 'Gemini AI',
  avatarSrc,
  initialMessages = [],
  quickReplies = [],
  className,
}) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const [showQuickReplies, setShowQuickReplies] = useState(!!quickReplies.length);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { apiKey, isConfigured } = useGemini();

  // Get conversation history in the format expected by the Gemini API
  const getConversationHistory = () => {
    return messages.map(message => ({
      role: message.isBot ? 'model' : 'user' as 'model' | 'user',
      content: message.content
    }));
  };

  // Send message to Gemini API and handle response
  const sendMessageToAI = async (userMessage: string) => {
    setIsTyping(true);
    
    try {
      // Format conversation history for Gemini API
      const history = getConversationHistory();
      
      // Call Gemini API
      const response = await sendMessageToGemini(userMessage, apiKey, history);
      
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: response.text,
          isBot: true,
          timestamp: new Date(),
        }
      ]);
      
      // Show quick replies after bot response
      setShowQuickReplies(true);
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          content: "Sorry, I encountered an error. Please try again later.",
          isBot: true,
          timestamp: new Date(),
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (content: string) => {
    // If API key is not configured, show API key input
    if (!isConfigured) {
      setShowApiKeyInput(true);
      return;
    }
    
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isBot: false,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, newMessage]);
    setShowQuickReplies(false);
    
    // Send the message to the AI
    sendMessageToAI(content);
  };

  const handleQuickReplySelect = (option: string) => {
    handleSendMessage(option);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showApiKeyInput]);

  return (
    <div className={`flex flex-col h-full max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <ChatHeader 
        botName={botName} 
        avatarSrc={avatarSrc}
        rightAction={
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="h-8 w-8"
          >
            <Settings size={18} />
          </Button>
        }
      />
      
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {showApiKeyInput && (
          <ApiKeyInput onClose={() => setShowApiKeyInput(false)} />
        )}
        
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
