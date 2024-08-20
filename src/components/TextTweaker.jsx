import React, { useState } from 'react';
import './TextTweaker.css';

const TextTweaker = () => {
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);

  const handleTextChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSpeechInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onspeechend = () => {
      setIsListening(false);
      recognition.stop();
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputText((prevText) => prevText + ' ' + transcript);
    };

    recognition.start();
  };

  const convertToUpperCase = () => {
    setInputText(inputText.toUpperCase());
  };

  const convertToLowerCase = () => {
    setInputText(inputText.toLowerCase());
  };

  const reverseText = () => {
    setInputText(inputText.split('').reverse().join(''));
  };

  const clearText = () => {
    setInputText('');
  };

  return (
    <div className="text-tweaker-container">
      <h1>Text Tweaker</h1>
      <textarea
        value={inputText}
        onChange={handleTextChange}
        placeholder="Type or use voice input..."
        rows="10"
        className="text-input"
      ></textarea>
      <div className="controls">
        <button onClick={convertToUpperCase} className="btn">UPPERCASE</button>
        <button onClick={convertToLowerCase} className="btn">lowercase</button>
        <button onClick={reverseText} className="btn">Reverse Text</button>
        <button onClick={clearText} className="btn">Clear Text</button>
        <button onClick={handleSpeechInput} className="btn">
          {isListening ? 'Listening...' : 'Speak'}
        </button>
      </div>
    </div>
  );
};

export default TextTweaker;
