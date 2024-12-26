'use client';
import { useState } from "react";
import Dropdown from "@/components/Dropdown";
import { translate } from "./actions/translate";
import VoiceRecorder from "@/components/VoiceRecorder";

const languages = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "es", label: "Spanish" },
];

export default function Home() {
  const [languageFrom, setLanguageFrom] = useState("en");
  const [languageTo, setLanguageTo] = useState("es");
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const handleLanguageFromChange = (language: string) => {
    setLanguageFrom(language);
  }

  const handleLanguageToChange = (language: string) => {
    setLanguageTo(language);
  }

  const handleInputChange = (e: any) => {
    const newText = e.target.value;
    setInputText(newText);
  }

  const handleInputSet = async (value: string) => {
    setInputText(value);

    const formData = new FormData();
    formData.append("text", value);
    formData.append("languageTo", languageTo);
    formData.append("languageFrom", languageFrom);
    const translation = await translate(formData);
    setTranslatedText(translation.translation);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <form action={async (formData) => {
          const result = await translate(formData);
          setTranslatedText(result.translation);
        }}>
          <div className="flex flex-row gap-4">
            <div className="container flex flex-col">
              <Dropdown name="languageFrom" value={languageFrom} onChange={handleLanguageFromChange} options={languages} />
              <textarea placeholder="Enter the text to translate" className="border border-slate-800 rounded-md p-4 lg:w-[400px] text-black" value={inputText} onChange={handleInputChange} />
            </div>
            <div className="container flex flex-col">
              <Dropdown name="languageTo" value={languageTo} onChange={handleLanguageToChange} options={languages} />
              <textarea placeholder="Translated Text will show here" className="border border-slate-800 rounded-md p-4 lg:w-[400px] text-black" value={translatedText} readOnly />
            </div>
          </div>
          <div className="flex flex-row items-center gap-2 mt-3 py-4 h-16">
          <button type="submit" className="p-2 rounded-md bg-slate-800">Translate</button>
          {languageFrom === 'en' && <VoiceRecorder handleSetText={handleInputSet} />}
          </div>
        </form>
      </main>
    </div>
  );
}
