import React, { useState, useEffect } from 'react';
import { languages } from '../data/languages';
import './Translator.css'; 

const Translator = () => {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('es');

  useEffect(() => {
    if (inputText) {
      const translateText = async () => {
        try {
          const response = await fetch(
            `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURI(inputText)}`
          );
          const data = await response.json();
          setTranslatedText(data[0][0][0]);
        } catch (error) {
          console.error('Error translating text:', error);
        }
      };

      translateText();
    } else {
      setTranslatedText('');
    }
  }, [inputText, sourceLang, targetLang]);

  return (
    <div className="translator-container">
      <h1>Live Translator</h1>
      <div className="language-selectors">
        <div>
          <label>From: </label>
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>To: </label>
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type here..."
        className="input-text"
      />
      <div className="translated-text-container">
        <h2>Translated Text:</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
};

export default Translator;
