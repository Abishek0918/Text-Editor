import React from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon } from 'react-icons/fa';

const Navbar = ({ mode, toggleMode }) => {
  return (
    <nav className={`navbar ${mode}`}>
      <h1>OO0</h1>
      <ul className="nav-links">
        <li><Link to="/Translator">Translator</Link></li>
        <li><Link to="/TextTweaker">TextTweaker</Link></li>
        <li><Link to="/vtt">Text-To-Voice</Link></li>
        <li><Link to="/summarizer">Summarizer</Link></li>
        <li><Link to="/About">About</Link></li>
      </ul>
      <div className="theme-toggle" onClick={toggleMode}>
        {mode === 'dark' ? <FaSun /> : <FaMoon />}
      </div>
    </nav>
  );
};

export default Navbar;
