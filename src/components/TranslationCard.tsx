import { ArrowRight } from "lucide-react";

const languageToCountry = {
    en: "🏴", // Default fallback for unknown languages
    es: "🇪🇸",
    fr: "🇫🇷",
};

type SupportedLanguage = keyof typeof languageToCountry;

interface TranslationGroup {
    source_language: SupportedLanguage;
    target_language: SupportedLanguage;
    souce_text: string[];
    translated_texts: string[];
}

export default function TranslationCard({ group }: { group: TranslationGroup }) {
    const { source_language, target_language, souce_text = [], translated_texts = [] } = group;

    const sourceFlag = languageToCountry[source_language] || "🏴";
    const targetFlag = languageToCountry[target_language] || "🏴";

    return (
        <div className="bg-white rounded-lg shadow-md p-4 h-full flex flex-col text-black">
            <div className="flex items-center justify-center mb-4 text-2xl">
                {source_language && target_language ? (
                    <>
                        <span>{sourceFlag}</span>
                        <span className="mx-2 text-gray-500">{source_language.toUpperCase()}</span>
                        <ArrowRight className="text-gray-400" />
                        <span className="mx-2 text-gray-500">{target_language.toUpperCase()}</span>
                    </>
                ) : (
                    <span>Unknown Languages</span>
                )}
            </div>

            <div className="flex-grow space-y-4">
                {souce_text.length > 0 ? (
                    souce_text.map((sourceText, index) => {
                        const translation = translated_texts[index] || "No translation available";
                        return (
                            <div
                                key={`${source_language}_${target_language}_${index}`}
                                className="border-b pb-4 last:border-b-0"
                            >
                                <div className="mb-2">
                                    <h3 className="font-semibold mb-1">Source</h3>
                                    <p>{sourceText || "No source text available"}</p>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-1">Translations</h3>
                                    <p>{translation}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div>No source texts available</div>
                )}
            </div>
        </div>
    );
}
