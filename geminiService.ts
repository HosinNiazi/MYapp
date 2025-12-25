
import { GoogleGenAI, Type } from "@google/genai";

const API_KEY = process.env.API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getDanaResponse = async (message: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: message,
    config: {
      systemInstruction: "You are 'Dana', a highly knowledgeable and friendly Persian study assistant. Your goal is to help students with academic concepts, explain complex topics simply, and encourage them in their studies. Always respond in Persian with a supportive and intellectual tone.",
    }
  });
  return response.text || "متاسفانه مشکلی در ارتباط با دانا پیش آمد.";
};

export const getParvanehResponse = async (message: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: message,
    config: {
      systemInstruction: "You are 'Parvaneh', a deeply empathetic and compassionate Persian emotional counselor for students. Your goal is to listen to their feelings, provide comfort, validate their struggles, and offer mindfulness tips. Always respond in Persian with a very kind, soft, and confidential tone.",
    }
  });
  return response.text || "پروانه در حال حاضر در دسترس نیست، اما همیشه گوش به زنگ توست.";
};

export const getSummary = async (text: string, level: 'short' | 'medium' | 'detailed') => {
  const prompt = `Summarize the following text in Persian at a ${level} level. Text: ${text}`;
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
  });
  return response.text || "خلاصه‌سازی با شکست مواجه شد.";
};

export const generateArticle = async (topic: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Write a comprehensive academic article in Persian about: ${topic}. Include introduction, key sections, and conclusion.`,
  });
  return response.text || "تولید مقاله با خطا مواجه شد.";
};

export const generateCode = async (description: string, language: string) => {
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: `Write a clean and well-documented code for the following task in ${language}: ${description}. Provide explanations in Persian.`,
  });
  return response.text || "تولید کد مقدور نبود.";
};
