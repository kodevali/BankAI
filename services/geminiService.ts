import { GoogleGenAI } from "@google/genai";
import { PROJECT_CONTEXT_FOR_AI } from '../constants';

const apiKey = process.env.API_KEY;

// Initialize the client
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateProjectResponse = async (
  userPrompt: string, 
  conversationHistory: { role: string; text: string }[] = [],
  additionalContext: string = ""
): Promise<string> => {
  
  if (!ai) {
    return "API Key is missing. Please configure process.env.API_KEY.";
  }

  try {
    const model = "gemini-2.5-flash";
    
    // Use dynamic context if provided (contains updated status), otherwise static context
    const contextToUse = additionalContext || PROJECT_CONTEXT_FOR_AI;
    
    const systemInstruction = `
      You are a senior project management assistant for a banking AI enablement initiative.
      Your tone is professional, corporate, and encouraging.
      
      You have access to the following project plan and details:
      ${contextToUse}

      If the user asks to create an email, formatting it as a proper email template with Subject and Body.
      Always be concise and action-oriented.
    `;

    // Construct the full prompt context with history
    const chat = ai.chats.create({
      model: model,
      config: {
        systemInstruction: systemInstruction,
      },
      history: conversationHistory.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }))
    });

    const response = await chat.sendMessage({
        message: userPrompt
    });

    return response.text || "I couldn't generate a response.";
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return `Error: ${error.message || "Something went wrong connecting to the AI."}`;
  }
};
