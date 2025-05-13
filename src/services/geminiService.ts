
// Gemini AI API service

interface GeminiResponse {
  text: string;
  error?: string;
}

export const sendMessageToGemini = async (
  message: string,
  apiKey: string,
  history: { role: 'user' | 'model'; content: string }[] = []
): Promise<GeminiResponse> => {
  if (!apiKey) {
    return { 
      text: "Please provide a Gemini API key to continue the conversation.", 
      error: "No API key provided" 
    };
  }

  try {
    const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey,
      },
      body: JSON.stringify({
        contents: [
          ...history,
          {
            role: 'user',
            content: message,
          },
        ],
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.9,
          maxOutputTokens: 1024,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Gemini API error:', data);
      return {
        text: "Sorry, I encountered an error. Please check your API key or try again later.",
        error: data.error?.message || "Unknown error",
      };
    }

    // Extract the response text from the Gemini API response
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't generate a response.";
    return { text: responseText };

  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return {
      text: "Sorry, there was an error connecting to the Gemini API. Please try again later.",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
};
