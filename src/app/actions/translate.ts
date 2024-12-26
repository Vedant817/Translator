'use server';

import { GoogleGenerativeAI } from "@google/generative-ai";

interface translateProps {
    text: string
    targetLanguage: string
    languageFrom?: string
}

const API_Key = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";

if (!API_Key) {
    throw new Error("Google Generative AI API Key is not set.");
}

async function translateText({ text, targetLanguage, languageFrom = "" }: translateProps) {
    try {
        const genAI = new GoogleGenerativeAI(API_Key);
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash'
        })
    
        const prompt = languageFrom ? `Translate the following text from ${languageFrom} to ${targetLanguage} : ${text}` : `Detect the language of the text and translate it to ${targetLanguage} : ${text}`;
        const additionalPrompt = 'Just return the translated text. Do not add additional descriptions such as `Here are the translations'
    
        const result = await model.generateContent(prompt + additionalPrompt);
    
        return result.response.text();
    } catch (error) {
        throw new Error('Failed to translate the text');
    }
}

export async function translate(formData: FormData) {
    try {
        const text = formData.get("text") as string;
        const targetLanguage = formData.get("languageTo") as string;
        const languageFrom = formData.get("languageFrom") as string;
    
        const translation = await translateText({text, targetLanguage, languageFrom});
    
        return { translation };
    } catch (error) {
        throw error;
    }
}