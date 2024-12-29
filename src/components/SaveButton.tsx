'use client';
import { useUser } from "@clerk/nextjs";
import { Bookmark } from "lucide-react";
import { saveTranslations } from "@/app/actions/saveTranlates";

interface SaveButtonProps {
    sourceLan: string
    targetLan: string
    sourceText: string
    translatedText: string
    onHandleSave: () => void
    isSaved: boolean
}

export default function SaveButton({sourceLan, targetLan, sourceText, translatedText, onHandleSave, isSaved}: SaveButtonProps) {
    const { isLoaded, isSignedIn, user } = useUser();
    const btnClasses = isSaved ? 'fill-yellow-500' : ''

    return (
        <button className="text-black" type="button" onClick={async () => {await saveTranslations({
            sourceLan: sourceLan,
            targetLan: targetLan,
            sourceText: sourceText,
            translatedText: translatedText,
        });
        onHandleSave();
    }}
        >
            <Bookmark className={btnClasses} />
        </button>
    )
}