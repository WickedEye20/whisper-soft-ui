
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGemini } from "@/context/GeminiContext";
import { Key } from 'lucide-react';

interface ApiKeyInputProps {
  onClose?: () => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onClose }) => {
  const { apiKey, setApiKey, isConfigured } = useGemini();
  const [inputKey, setInputKey] = useState(apiKey);
  const [isEditing, setIsEditing] = useState(!isConfigured);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiKey(inputKey.trim());
    setIsEditing(false);
    onClose?.();
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setInputKey(apiKey);
    setIsEditing(false);
    onClose?.();
  };

  if (!isEditing && isConfigured) {
    return (
      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center space-x-2">
          <Key size={18} className="text-green-500" />
          <span className="text-sm font-medium">Gemini API Key configured</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleEdit}>
          Change
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3 p-3 bg-gray-50 rounded-lg">
      <div className="space-y-2">
        <label htmlFor="apiKey" className="text-sm font-medium">
          Gemini API Key
        </label>
        <Input
          id="apiKey"
          type="password"
          value={inputKey}
          onChange={(e) => setInputKey(e.target.value)}
          placeholder="Enter your Gemini API key"
          className="w-full"
          autoFocus
        />
        <p className="text-xs text-gray-500">
          Get your API key from the{" "}
          <a
            href="https://ai.google.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            Google AI Studio
          </a>
        </p>
      </div>
      <div className="flex justify-end space-x-2">
        {isConfigured && (
          <Button type="button" variant="outline" size="sm" onClick={handleCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" size="sm" disabled={!inputKey.trim()}>
          Save Key
        </Button>
      </div>
    </form>
  );
};

export default ApiKeyInput;
