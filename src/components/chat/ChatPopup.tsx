
import React, { useState } from 'react';
import { MessageSquare, X } from 'lucide-react';
import ChatContainer from './ChatContainer';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface ChatPopupProps {
  botName?: string;
  avatarSrc?: string;
  quickReplies?: string[];
}

const ChatPopup: React.FC<ChatPopupProps> = ({
  botName = 'Lovable AI',
  avatarSrc,
  quickReplies = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();

  // Sample initial messages
  const initialMessages = [
    {
      id: '1',
      content: 'Hello! How can I assist you today?',
      isBot: true,
      timestamp: new Date(),
    }
  ];

  return (
    <>
      {/* Chat button */}
      <button
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-chat-bot p-3 shadow-lg transition-all hover:bg-chat-bot/90",
          isOpen && "hidden"
        )}
        aria-label="Open chat"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </button>

      {/* Chat dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className={cn(
          "p-0 border-none shadow-xl max-w-md",
          isMobile ? "w-full h-[80vh] sm:h-[600px]" : "w-[400px] h-[600px]",
          "sm:max-w-md"
        )}>
          <button 
            onClick={() => setIsOpen(false)}
            className="absolute right-4 top-4 z-50 rounded-sm p-1 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <ChatContainer
            botName={botName}
            initialMessages={initialMessages}
            quickReplies={quickReplies}
            className="h-full"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ChatPopup;
