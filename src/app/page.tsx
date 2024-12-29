'use client';
import { useState } from "react";
import Dropdown from "@/components/Dropdown";
import { translate } from "./actions/translate";
import VoiceRecorder from "@/components/VoiceRecorder";
import SaveButton from "@/components/SaveButton";

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
  const [isSaved, setIsSaved] = useState(false);

  const onSave = () => {
    setIsSaved(true);
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('text', inputText);
    formData.append('languageTo', languageTo);
    formData.append('languageFrom', languageFrom);

    const result = await translate(formData);
    setTranslatedText(result.translation);

    if (isSaved) {
      setIsSaved(false);
    }
  }

  return (
    <section className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tighter text-gray-900 sm:text-5xl md:text-6xl">
          Translate with <span className="text-amber-700">Ease</span>
        </h1>
        <p className="mt-4 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Break language barriers instantly with our powerful translation app. Try it now!
        </p>
      </div>
      <div className="bg-white shadow-xl rounded-lg p-6  mx-auto w-fit">
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
            <form onSubmit={handleSubmit}
              className="w-full">
              <div className="flex flex-row gap-4">
                <div className="container flex flex-col">
                  <Dropdown name="languageFrom" value={languageFrom} onChange={handleLanguageFromChange} options={languages} />
                  <textarea placeholder="Enter the text to translate" className="border border-slate-800 rounded-md p-4 lg:w-[400px] text-black" value={inputText} onChange={handleInputChange} required />
                </div>
                <div className="container flex flex-col">
                  <div className="justify-between flex">
                    <Dropdown name="languageTo" value={languageTo} onChange={handleLanguageToChange} options={languages} />
                    <SaveButton sourceLan={languageFrom} targetLan={languageTo} sourceText={inputText} translatedText={translatedText} onHandleSave={onSave} isSaved={isSaved} />
                  </div>
                  <textarea placeholder="Translated Text will show here" className="border border-slate-800 rounded-md p-4 lg:w-[400px] text-black" value={translatedText} readOnly />
                </div>
              </div>
              <div className="flex flex-row items-center gap-2 mt-3 py-4 h-16">
                <button type="submit" className="p-2 rounded-md bg-slate-800">Translate</button>
                {languageFrom === 'en' && <VoiceRecorder handleSetText={handleInputSet} />}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
