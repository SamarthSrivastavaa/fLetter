import React, { useState } from 'react'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import WriteLetter from './components/WriteLetter'
import ScheduledLetters from './components/ScheduledLetters'

import {config} from "./config"
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'

import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('hero');

  const navigateToWriteLetter = () => {
    setCurrentPage('writeLetter');
  };

  const navigateToScheduledLetters = () => {
    setCurrentPage('scheduledLetters');
  };

  const navigateToHero = () => {
    setCurrentPage('hero');
  };
  const client=new QueryClient();

  return (
    <WagmiProvider config={config} >
    <QueryClientProvider client={client}>
    <div>
    <div className="App">
      <Navbar onNavigate={navigateToHero} />
      {currentPage === 'hero' ? (
        <Hero onWriteLetter={navigateToWriteLetter} onScheduledLetters={navigateToScheduledLetters} />
      ) : currentPage === 'writeLetter' ? (
        <WriteLetter onViewScheduledLetters={navigateToScheduledLetters} />
      ) : (
        <ScheduledLetters onWriteLetter={navigateToWriteLetter} />
      )}
    </div>
    </div>
    </QueryClientProvider>
    </WagmiProvider>

  )
}

export default App
