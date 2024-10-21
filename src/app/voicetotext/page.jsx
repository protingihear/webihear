"use client";

import { useState, useEffect } from 'react';

const Translator = () => {
  const [text, setText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [isSpeechDetected, setIsSpeechDetected] = useState(false);
  const language = 'id-ID';

  function handleOnRecord() {
    if (isActive) {
      setIsActive(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language;

    recognition.onstart = () => {
      setIsActive(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setText(transcript);
      setIsSpeechDetected(true);
    };

    recognition.onspeechend = () => {
      setIsActive(false);
      setIsSpeechDetected(false);
      recognition.stop();
    };

    recognition.onerror = () => {
      setIsActive(false);
    };

    recognition.start();
  }

  useEffect(() => {
    let interval;
    if (isSpeechDetected) {
      interval = setInterval(() => {
        document.querySelectorAll('.wave').forEach(wave => {
          wave.style.height = `${Math.random() * 100}%`;
        });
      }, 200);
    } else {
      document.querySelectorAll('.wave').forEach(wave => {
        wave.style.height = '50%';
      });
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isSpeechDetected]);

  return (
    <div className="mt-12 px-4 text-center">
      <div className="max-w-lg rounded-xl overflow-hidden mx-auto bg-white shadow-lg p-8">
        <h2 className="text-xl font-bold mb-6">
          {text ? text : "Mulai menerjemahkan"}
        </h2>
        <div className="flex justify-center items-center mb-6">
          <div className="w-40 h-20 bg-gray-200 flex items-center justify-center">
            <div className="flex gap-2">
              {[...Array(7)].map((_, index) => (
                <div key={index} className="wave w-4 bg-gray-400 rounded transition-all duration-200 ease-linear" style={{ height: '50%' }}></div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleOnRecord}
            className={`w-16 h-16 rounded-full flex items-center justify-center ${isActive ? 'bg-red-500' : 'bg-green-500'}`}
          >
            <span className="sr-only">{isActive ? 'Stop Recording' : 'Start Recording'}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              {isActive ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m7-7H5" />
              )}
            </svg>
          </button>
          <button
            onClick={() => setText('')}
            className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center"
          >
            <span className="sr-only">Reset</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Translator;
