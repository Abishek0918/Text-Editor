import React, { useState } from 'react';
import './Summarizer.css'

const Summarizer = () => {
    const [inputText, setInputText] = useState('');
    const [summary, setSummary] = useState('');

    const summarizeText = (text) => {
        const sentences = text.match(/[^\.!\?]+[\.!\?]+/g);
        if (!sentences) return '';
    
        const wordCounts = {};
        const words = text.split(/\W+/);
        words.forEach(word => {
            word = word.toLowerCase();
            if (word) {
                if (!wordCounts[word]) {
                    wordCounts[word] = 0;
                }
                wordCounts[word]++;
            }
        });
    
        const sentenceScores = sentences.map(sentence => {
            const sentenceWords = sentence.split(/\W+/);
            let score = 0;
            sentenceWords.forEach(word => {
                word = word.toLowerCase();
                if (word && wordCounts[word]) {
                    score += wordCounts[word];
                }
            });
            return { sentence, score };
        });
    
        sentenceScores.sort((a, b) => b.score - a.score);
        const summary = sentenceScores.slice(0, Math.ceil(sentences.length / 3)).map(s => s.sentence).join(' ');
        return summary;
    };

    const handleSummarize = () => {
        const summarizedText = summarizeText(inputText);
        setSummary(summarizedText);
    };

    return (
        <div className="summarizer-container">
            <h2>Summarizer</h2>
            <textarea
                id="input-text"
                className="input-text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Enter text to summarize"
            />
            <button id="summarize-btn" className="summarize-button" onClick={handleSummarize}>
                Summarize
            </button>
            {summary && (
                <div className="summary-output">
                    <h3>Summary:</h3>
                    <p id="summary-text">{summary}</p>
                </div>
            )}
        </div>
    );
};

export default Summarizer;
