import React, { useState } from 'react';
import './vtt.css';

const TextToVoice = () => {
  const [text, setText] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speakText = () => {
    if (!text) return;

    const speech = new SpeechSynthesisUtterance(text);
    setIsSpeaking(true);

    speech.onend = () => {
      setIsSpeaking(false);
    };

    speechSynthesis.speak(speech);
  };

  const stopSpeaking = () => {
    if (isSpeaking) {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  return (
    <div className="text-to-voice-container">
      <h1>Text to Voice</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here..."
        className="input-text"
      />
      <div className="controls">
        <button onClick={speakText} disabled={isSpeaking} className="speak-button">
          {isSpeaking ? 'Speaking...' : 'Speak'}
        </button>
        {isSpeaking && (
          <button onClick={stopSpeaking} className="stop-button">
            Stop
          </button>
        )}
      </div>
    </div>
  );
};

export default TextToVoice;
