import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const About = ({ onNavigate }) => {
  const [showFooter, setShowFooter] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (scrollTop + windowHeight >= documentHeight - 100) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen w-full bg-black relative">
      {/* Dark Noise Colored Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: "#000000",
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.2) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.18) 1px, transparent 0),
            radial-gradient(circle at 1px 1px, rgba(236, 72, 153, 0.15) 1px, transparent 0)
          `,
          backgroundSize: "20px 20px, 30px 30px, 25px 25px",
          backgroundPosition: "0 0, 10px 10px, 15px 5px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8 pb-8 sm:pb-10 md:pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16 sm:mb-20 md:mb-24"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-none text-white mb-6 sm:mb-8"
          >
            ABOUT CAPSULE
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-4xl mx-auto leading-relaxed px-2 sm:px-4"
          >
            A revolutionary platform where your thoughts transcend time through the power of blockchain technology and complete encryption.
          </motion.p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative mb-20 sm:mb-24 md:mb-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16">
       
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-black/80 to-gray-900/60 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-yellow-400/10 border border-yellow-400/20 hover:border-yellow-400/40 transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                  <div className="w-3 sm:w-4 h-3 sm:h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">🔐 Encryption</h3>
                </div>
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4 group">
                    <span className="text-yellow-400 font-bold text-base sm:text-lg group-hover:text-yellow-300 transition-colors">AES-256</span>
                    <p className="text-white/80 leading-relaxed text-sm sm:text-base">Your letters are encrypted using AES-256 encryption, the same standard used by governments and financial institutions worldwide.</p>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4 group">
                    <span className="text-yellow-400 font-bold text-base sm:text-lg group-hover:text-yellow-300 transition-colors">Zero-Knowledge</span>
                    <p className="text-white/80 leading-relaxed text-sm sm:text-base">We cannot read your messages. Only you hold the keys to decrypt your thoughts when the time comes.</p>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4 group">
                    <span className="text-yellow-400 font-bold text-base sm:text-lg group-hover:text-yellow-300 transition-colors">End-to-End</span>
                    <p className="text-white/80 leading-relaxed text-sm sm:text-base">Encryption happens on your device before transmission, ensuring complete privacy throughout the process.</p>
                  </div>
                </div>
              </div>
            </motion.div>   
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="relative lg:mt-8 sm:mt-12 md:mt-16"
            >
              <div className="bg-gradient-to-br from-black/80 to-gray-900/60 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-blue-400/10 border border-blue-400/20 hover:border-blue-400/40 transition-all duration-500 transform hover:-translate-y-2">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                  <div className="w-3 sm:w-4 h-3 sm:h-4 bg-blue-400 rounded-full animate-pulse"></div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">⚡ Blockchain Immortality</h3>
                </div>
                <div className="space-y-5 sm:space-y-6">
                  <div className="flex items-start space-x-3 sm:space-x-4 group">
                    <span className="text-blue-400 font-bold text-base sm:text-lg group-hover:text-blue-300 transition-colors">Decentralized</span>
                    <p className="text-white/80 leading-relaxed text-sm sm:text-base">Your messages are stored across thousands of nodes worldwide, making them virtually impossible to destroy or censor.</p>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4 group">
                    <span className="text-blue-400 font-bold text-base sm:text-lg group-hover:text-blue-300 transition-colors">Immutable</span>
                    <p className="text-white/80 leading-relaxed text-sm sm:text-base">Once written, your letters become part of the blockchain's permanent record, preserved for eternity.</p>
                  </div>
                  <div className="flex items-start space-x-3 sm:space-x-4 group">
                    <span className="text-blue-400 font-bold text-base sm:text-lg group-hover:text-blue-300 transition-colors">Anonymous</span>
                    <p className="text-white/80 leading-relaxed text-sm sm:text-base">No personal information is stored. Your identity remains completely separate from your messages.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>  
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mb-20 sm:mb-24 md:mb-32"
        >
          <div className="text-center mb-12 sm:mb-16">
            <div className="flex items-center justify-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
              <div className="w-3 sm:w-4 h-3 sm:h-4 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white">🛡️ How Your Privacy is Protected</h3>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="group"
            >
              <div className="relative">
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border border-yellow-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 sm:w-12 h-10 sm:h-12 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5">Local Encryption</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed px-2 sm:px-4">
                Your letter is encrypted on your device using your wallet's private key before it ever leaves your computer.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
              className="group md:mt-8 sm:mt-12"
            >
              <div className="relative">
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-blue-400/20 to-blue-600/20 border border-blue-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 sm:w-12 h-10 sm:h-12 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5">Blockchain Storage</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed px-2 sm:px-4">
                The encrypted data is stored on the Ethereum blockchain, distributed across thousands of nodes worldwide.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
              className="group md:mt-16 sm:mt-24"
            >
              <div className="relative">
                <div className="w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-green-400/20 to-green-600/20 border border-green-400/30 rounded-2xl flex items-center justify-center mx-auto mb-6 sm:mb-8 group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 sm:w-12 h-10 sm:h-12 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <h4 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-5">Time-Locked Delivery</h4>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed px-2 sm:px-4">
                Smart contracts ensure your message is only revealed when the specified time arrives, using your wallet to decrypt.
              </p>
            </motion.div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.2 }}
          className="mb-20 sm:mb-24 md:mb-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 md:gap-16 items-center">
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-6 sm:mb-8">
                <div className="w-3 sm:w-4 h-3 sm:h-4 bg-purple-400 rounded-full animate-pulse"></div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-black text-white">💭 Why Capsule?</h3>
              </div>
              <div className="space-y-5 sm:space-y-6">
                <p className="text-white/80 leading-relaxed text-sm sm:text-base md:text-lg">
                  Ever wanted to send a message to your future self? Maybe you want to remind yourself of your dreams, 
                  share advice you've learned, or just capture a moment in time.
                </p>
                <p className="text-white/80 leading-relaxed text-sm sm:text-base md:text-lg">
                  Think of it like a digital time capsule, but way cooler. You write your thoughts, pick a future date, 
                  and boom - your message gets locked away until that perfect moment arrives.
                </p>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-black/60 to-gray-900/40 backdrop-blur-xl p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-purple-400/10 border border-purple-400/20">
                <div className="space-y-4 sm:space-y-5">
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-2 sm:w-3 h-2 sm:h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-400 font-bold text-sm sm:text-base">Your thoughts, your timeline</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-2 sm:w-3 h-2 sm:h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-400 font-bold text-sm sm:text-base">Your private conversation with the future</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-2 sm:w-3 h-2 sm:h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-400 font-bold text-sm sm:text-base">No one can read it, not even us</span>
                  </div>
                  <div className="flex items-center space-x-3 sm:space-x-4">
                    <div className="w-2 sm:w-3 h-2 sm:h-3 bg-purple-400 rounded-full"></div>
                    <span className="text-purple-400 font-bold text-sm sm:text-base">Complete anonymity guaranteed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.4 }}
          className="text-center relative"
        >
            <div className="relative">
            <div className="absolute -top-8 -left-8 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-yellow-400/10 to-transparent rounded-full blur-xl"></div>
            <div className="absolute -bottom-8 -right-8 w-20 sm:w-24 h-20 sm:h-24 bg-gradient-to-br from-blue-400/10 to-transparent rounded-full blur-xl"></div>
            
            <div className="bg-gradient-to-br from-black/80 to-gray-900/60 backdrop-blur-xl p-8 sm:p-10 md:p-12 rounded-3xl shadow-2xl shadow-white/5 border border-white/10 relative z-10 max-w-4xl mx-auto mb-16 sm:mb-20 md:mb-24">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-6 sm:mb-8">Ready to talk to your Future?</h3>
              <p className="text-gray-300 mb-8 sm:mb-10 max-w-xs sm:max-w-sm md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
                Join the users who trust Capsule with their most personal thoughts. 
                Your future self will thank you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-black rounded-xl sm:rounded-2xl hover:from-yellow-300 hover:to-yellow-400 transition-all duration-300 transform hover:scale-105 shadow-2xl shadow-yellow-400/25"
                  onClick={() => onNavigate('writeLetter')}
                >
                  WRITE YOUR FIRST LETTER
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-transparent text-white border-2 border-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 text-sm sm:text-base md:text-lg font-black rounded-xl sm:rounded-2xl hover:bg-white hover:text-black transition-all duration-300"
                  onClick={() => onNavigate('hero')}
                >
                  BACK TO HOME
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      {showFooter && (
        <footer className="fixed bottom-0 left-0 w-full bg-black/90 border-t border-yellow-500/30 z-50 transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4">
            <div className="text-center">
              <p className="text-gray-300 text-xs sm:text-sm">
                Crafted with passion by <a href="https://x.com/SamarthS_1101" target="_blank" rel="noopener noreferrer" className="text-yellow-400 font-semibold hover:text-yellow-300 transition-colors underline">Samarth Srivastava</a>
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default About; 