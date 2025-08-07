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
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden pt-24 px-8">
     

      <div className="w-full max-w-7xl mx-auto relative z-10 pb-12">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-6xl md:text-7xl font-black tracking-tight leading-none text-white mb-6"
          >
            ABOUT CAPSULE
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            A revolutionary platform where your thoughts transcend time through the power of blockchain technology and complete encryption.
          </motion.p>
        </motion.div>

        {/* Security Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16"
        >
          <div className="bg-black/60 border-2 border-yellow-400/40 p-8 rounded-2xl backdrop-blur-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <h3 className="text-3xl font-black text-white">🔐 Encryption</h3>
            </div>
            <div className="space-y-6 text-gray-300">
              <div className="flex items-start space-x-4">
                <span className="text-yellow-400 font-bold text-lg">AES-256</span>
                <p className="text-white/80 leading-relaxed">Your letters are encrypted using AES-256 encryption, the same standard used by governments and financial institutions worldwide.</p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-yellow-400 font-bold text-lg">Zero-Knowledge</span>
                <p className="text-white/80 leading-relaxed">We cannot read your messages. Only you hold the keys to decrypt your thoughts when the time comes.</p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-yellow-400 font-bold text-lg">End-to-End</span>
                <p className="text-white/80 leading-relaxed">Encryption happens on your device before transmission, ensuring complete privacy throughout the process.</p>
              </div>
            </div>
          </div>

          <div className="bg-black/60 border-2 border-yellow-400/40 p-8 rounded-2xl backdrop-blur-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <h3 className="text-3xl font-black text-white">⚡ Blockchain Immortality</h3>
            </div>
            <div className="space-y-6 text-gray-300">
              <div className="flex items-start space-x-4">
                <span className="text-yellow-400 font-bold text-lg">Decentralized</span>
                <p className="text-white/80 leading-relaxed">Your messages are stored across thousands of nodes worldwide, making them virtually impossible to destroy or censor.</p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-yellow-400 font-bold text-lg">Immutable</span>
                <p className="text-white/80 leading-relaxed">Once written, your letters become part of the blockchain's permanent record, preserved for eternity.</p>
              </div>
              <div className="flex items-start space-x-4">
                <span className="text-yellow-400 font-bold text-lg">Anonymous</span>
                <p className="text-white/80 leading-relaxed">No personal information is stored. Your identity remains completely separate from your messages.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* How It Works Section */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mb-16"
        >
          <div className="bg-black/60 border-2 border-yellow-400/40 p-8 rounded-2xl backdrop-blur-md">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <h3 className="text-3xl font-black text-white">🛡️ How Your Privacy is Protected</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 border-2 border-yellow-400/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🔒</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Local Encryption</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your letter is encrypted on your device using your wallet's private key before it ever leaves your computer.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-blue-400/20 to-blue-600/20 border-2 border-blue-400/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">🌐</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Blockchain Storage</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  The encrypted data is stored on the Ethereum blockchain, distributed across thousands of nodes worldwide.
                </p>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 1.6 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-br from-green-400/20 to-green-600/20 border-2 border-green-400/40 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">⏰</span>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Time-Locked Delivery</h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Smart contracts ensure your message is only revealed when the specified time arrives, using your wallet to decrypt.
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Casual Message */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
          className="mb-16"
        >
          <div className="bg-black/60 border-2 border-yellow-400/40 p-8 rounded-2xl backdrop-blur-md">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              <h3 className="text-2xl font-black text-white">💭 Why Capsule?</h3>
            </div>
            <div className="space-y-6 text-gray-300">
              <p className="text-white/80 leading-relaxed text-lg">
                Ever wanted to send a message to your future self? Maybe you want to remind yourself of your dreams, 
                share advice you've learned, or just capture a moment in time. That's exactly what Capsule is for.
              </p>
              <p className="text-white/80 leading-relaxed text-lg">
                Think of it like a digital time capsule, but way cooler. You write your thoughts, pick a future date, 
                and boom - your message gets locked away until that perfect moment arrives. No one can read it, 
                not even us. It's just you talking to future you.
              </p>
              <p className="text-white/80 leading-relaxed text-lg">
                Whether it's a letter to yourself in 5 years, advice for your future self, or just capturing 
                how you feel right now - Capsule keeps it safe and anonymous. Your thoughts, your timeline, 
                your private conversation with the future.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="text-center"
        >
          <div className="bg-black/60 border-2 border-yellow-400/40 p-8 rounded-2xl backdrop-blur-md">
            <h3 className="text-3xl font-black text-white mb-6">Ready to talk to your Future?</h3>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              Join the users who trust Capsule with their most personal thoughts. 
              Your future self will thank you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-yellow-400 text-black px-8 py-4 text-lg font-black rounded-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-400/25"
                onClick={() => onNavigate('writeLetter')}
              >
                WRITE YOUR FIRST LETTER
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="bg-transparent text-white border-2 border-white px-8 py-4 text-lg font-black rounded-xl hover:bg-white hover:text-black transition-all duration-300"
                onClick={() => onNavigate('hero')}
              >
                BACK TO HOME
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-20 relative z-10 mt-16">
        <div className="relative w-full h-full">
          <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-gradient-to-tr from-gray-800 to-black border border-orange-500/30 transform rotate-45 animate-pulse"></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-bl from-gray-900 to-black border border-red-500/30 transform -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-20 bg-gradient-to-r from-gray-800 to-black border border-orange-500/20 transform skew-x-12 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/2 w-16 h-16 bg-gradient-to-br from-gray-900 to-black border border-red-500/40 transform rotate-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>
      
      {/* Footer */}
      {showFooter && (
        <footer className="fixed bottom-0 left-0 w-full bg-black/90 border-t border-yellow-500/30 z-50 transition-all duration-300 ease-in-out">
          <div className="max-w-7xl mx-auto px-8 py-4">
            <div className="text-center">
              <p className="text-gray-300 text-sm">
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