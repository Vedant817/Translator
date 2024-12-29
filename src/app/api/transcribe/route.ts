import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_Key = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";

export async function POST (request: NextRequest) {
    const formData = request.formData();
    const audioFile = (await formData).get("audio");

    if(!(audioFile instanceof File)){
        return Response.json({error: 'Unable to get the audio file.'})
    }

    const base64Audio = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result?.toString().split(',')[1] || '');
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(audioFile);
    });

    const genAI = new GoogleGenerativeAI(API_Key);
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash'
    });

    try {
        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: 'audio/wav',
                    data: base64Audio
                }
            },
            {text: 'Please transcribe the the audio.'}
        ])
    
        return Response.json({result: result.response.text()});
    } catch (error) {
        return Response.json({error});
    }
}