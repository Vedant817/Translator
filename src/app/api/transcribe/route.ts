import { NextRequest } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_Key = process.env.GOOGLE_GENERATIVE_AI_API_KEY || "";

export async function POST (request: NextRequest) {
    const formData = request.formData();
    const audioFile = (await formData).get("audio");

    if(!(audioFile instanceof File)){
        return Response.json({error: 'Unable to get the audio file.'})
    }

    const genAI = new GoogleGenerativeAI(API_Key);
    const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash'
    });

    try {
        const result = await model.generateContent([
            {
                inlineData: {
                    mimeType: 'audio/wav',
                    data: audioFile
                }
            },
            {text: 'Please transcribe the the audio.'}
        ])
    
        return Response.json({result: result.response.text()});
    } catch (error: any) {
        return Response.json({error});
    }
}