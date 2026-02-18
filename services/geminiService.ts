
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

export const getConciergeResponse = async (history: Message[]): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    // Map history for generation
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        topP: 0.8,
      },
    });

    return response.text || "I apologize, but I am unable to process your request at this moment. Please contact our Montclair office directly.";
  } catch (error) {
    console.error("Concierge Error:", error);
    return "Our concierge is temporarily unavailable. Please use our consultation form or contact us at 973.555.0123.";
  }
};
