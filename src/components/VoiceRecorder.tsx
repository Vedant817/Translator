'use client';
import { useRef, useState } from 'react';
import { Mic, Square } from 'lucide-react';

export default function VoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [audioBase64, setAudioBase64] = useState<string | null>(null);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const toggleRecording = () => {
        if(isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    }

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;

            mediaRecorderRef.current.ondataavailable = (event: BlobEvent) => {
                if (event.data.size > 0) {
                    chunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(chunksRef.current, {
                    type: 'audio/wav'
                });
                const reader = new FileReader();
                reader.readAsDataURL(audioBlob);
                reader.onloadend = () => {
                    const base64Audio = reader.result as string;
                    if (base64Audio) {
                        setAudioBase64(base64Audio.split(',')[1]);
                    }
                }
                chunksRef.current = [];
            }

            mediaRecorderRef.current.start();
            setIsRecording(true);

        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    }

    return (
        <div className='flex items-center px-4'>
            <button 
                type='button' 
                className={`text-black w-10 h-10 rounded-full border flex items-center justify-center ${isRecording ? 'bg-red-500 text-white' : ''}`} 
                onClick={toggleRecording}
            >
                {isRecording ? <Square className='w-4 h-4' /> : <Mic className='w-4 h-4' />}
            </button>
            <input type='hidden' name='audio' value={audioBase64 || ''} aria-label='Recorded Audio' />
        </div>
    );
}