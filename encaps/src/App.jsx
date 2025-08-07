import React, { useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import WriteLetter from './components/WriteLetter'
import ScheduledLetters from './components/ScheduledLetters'
import About from './components/About'

import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('hero');

  const navigateToWriteLetter = () => setCurrentPage('writeLetter');
  const navigateToScheduledLetters = () => setCurrentPage('scheduledLetters');
  const navigateToHero = () => setCurrentPage('hero');
  const navigateToAbout = () => setCurrentPage('about');

  return (
    <div className="App">
      <Navbar onNavigate={navigateToHero} />
      {currentPage === 'hero' ? (
        <Hero
          onWriteLetter={navigateToWriteLetter}
          onScheduledLetters={navigateToScheduledLetters}
          onAbout={navigateToAbout}
        />
      ) : currentPage === 'writeLetter' ? (
        <WriteLetter onViewScheduledLetters={navigateToScheduledLetters} />
      ) : currentPage === 'about' ? (
        <About
          onNavigate={(page) => {
            if (page === 'hero') navigateToHero();
            else if (page === 'writeLetter') navigateToWriteLetter();
          }}
        />
      ) : (
        <ScheduledLetters onWriteLetter={navigateToWriteLetter} />
      )}
    </div>
  );
}

export default App;
