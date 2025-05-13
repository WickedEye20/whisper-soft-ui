
import React from 'react';

interface QuickReplyProps {
  options: string[];
  onSelect: (option: string) => void;
  disabled?: boolean;
}

const QuickReply: React.FC<QuickReplyProps> = ({
  options,
  onSelect,
  disabled = false,
}) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 px-4">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => !disabled && onSelect(option)}
          disabled={disabled}
          className="bg-white border border-gray-300 rounded-full py-1 px-3 text-sm hover:bg-gray-100 transition-colors disabled:opacity-50"
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default QuickReply;
