'use server';
import { auth } from "@clerk/nextjs/server";
import { neon } from "@neondatabase/serverless";

interface SaveTranslationProps {
    sourceLan: string
    targetLan: string
    sourceText: string
    translatedText: string
}

const databaseURL = process.env.DATABASE_URL || '';

export async function saveTranslations({ sourceLan, targetLan, sourceText, translatedText }: SaveTranslationProps) {
    const { userId, redirectToSignIn } = await auth();

    if (!userId) {
        return redirectToSignIn();
    }
    const sql = neon(databaseURL);

    const response = await sql`
        INSERT INTO translations (
            user_id,
            source_language,
            target_language,
            souce_text,
            translated_text
        ) VALUES (
            ${userId},
            ${sourceLan},
            ${targetLan},
            ${sourceText},
            ${translatedText}
        )`;
    console.log(response);
}