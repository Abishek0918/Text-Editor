import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Translator from './components/Translator';
import TextTweaker from './components/TextTweaker';
import TextToVoice from './components/vtt';



function App() {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className={`app ${mode}`}>
        <Navbar mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route path="/Translator" element={<Translator />} />
          <Route path="/TextTweaker" element={<TextTweaker />} />
          <Route path ='/vtt' element={<TextToVoice />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;
