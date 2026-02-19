
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";
import { SYSTEM_PROMPT } from "../constants";

/**
 * Utility to perform an operation with exponential backoff retry.
 * Specifically targets transient 5xx errors like 503 and 504.
 */
const withRetry = async <T>(fn: () => Promise<T>, retries = 3, delay = 1500): Promise<T> => {
  try {
    return await fn();
  } catch (error: any) {
    const errorMsg = error?.message || "";
    const isTransient = errorMsg.includes('503') || errorMsg.includes('504') || error?.status === 503 || error?.status === 504;
    
    if (retries > 0 && isTransient) {
      console.warn(`Gemini API transient error (503/504). Retrying in ${delay}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, delay));
      return withRetry(fn, retries - 1, delay * 2);
    }
    throw error;
  }
};

export const getConciergeResponse = async (history: Message[]): Promise<string> => {
  try {
    // Generate new instance per request to ensure latest environment variables/keys
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    
    const contents = history.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }]
    }));

    // Wrap the API call in our retry logic to mitigate 503/504 outages
    const response = await withRetry(() => ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
        topP: 0.8,
      },
    }));

    return response.text || "I apologize, but I am unable to process your request at this moment. Please contact our Montclair office directly.";
  } catch (error) {
    console.error("Concierge Execution Error:", error);
    return "Our concierge service is experiencing temporary maintenance. For immediate assistance, please utilize our consultation form or call 551.380.8009.";
  }
};
