import React, { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState("");

  // Function to load voices and set the default voice
  const loadVoices = () => {
    const availableVoices = window.speechSynthesis.getVoices();
    setVoices(availableVoices);

    // Select the first female voice, if available
    const defaultFemaleVoice = availableVoices.find((voice) =>
      voice.name.toLowerCase().includes("female")
    );
    if (defaultFemaleVoice) {
      setSelectedVoice(defaultFemaleVoice.name);
    } else if (availableVoices.length > 0) {
      setSelectedVoice(availableVoices[0].name); // Fallback to the first voice
    }
  };

  useEffect(() => {
    // Load voices when the component mounts
    if (window.speechSynthesis.getVoices().length === 0) {
      // Add a delay to ensure voices are loaded
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }
  }, []);

  const handleSpeak = () => {
    if (!text) {
      alert("Please enter some text!");
      return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    const voice = voices.find((v) => v.name === selectedVoice);

    if (voice) {
      speech.voice = voice;
    }

    speech.lang = "en-US"; // Set the language
    window.speechSynthesis.speak(speech);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-500 to-gray-700 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-teal-600 mb-6 text-center">
          Text-to-Speech
        </h1>
        <textarea
          className="w-full p-4 border-2 border-teal-300 rounded-xl focus:ring focus:ring-teal-200 outline-none text-gray-800"
          rows="6"
          placeholder="Enter text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        <select
          className="w-full mt-4 p-3 border-2 border-teal-300 rounded-xl text-gray-800"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
        <button
          onClick={handleSpeak}
          className="w-full mt-6 bg-teal-500 text-white py-3 px-5 rounded-xl hover:bg-teal-600 focus:ring focus:ring-teal-300 focus:outline-none font-semibold transition duration-300"
        >
          Speak Now 
        </button>
      </div>
    </div>
  );
}

export default App;
