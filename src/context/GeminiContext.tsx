
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface GeminiContextType {
  apiKey: string;
  setApiKey: (key: string) => void;
  isConfigured: boolean;
}

const GeminiContext = createContext<GeminiContextType>({
  apiKey: '',
  setApiKey: () => {},
  isConfigured: false,
});

export const useGemini = () => useContext(GeminiContext);

export const GeminiProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [apiKey, setApiKeyState] = useState<string>(() => {
    // Try to get the API key from localStorage on initial load
    const savedKey = localStorage.getItem('gemini_api_key');
    return savedKey || '';
  });

  const setApiKey = (key: string) => {
    setApiKeyState(key);
    // Save the API key to localStorage
    if (key) {
      localStorage.setItem('gemini_api_key', key);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
  };

  return (
    <GeminiContext.Provider value={{ 
      apiKey, 
      setApiKey, 
      isConfigured: !!apiKey 
    }}>
      {children}
    </GeminiContext.Provider>
  );
};
