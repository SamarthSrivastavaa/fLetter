import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onWriteLetter, onScheduledLetters, onAbout }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8">
             <div
         className="absolute top-16 left-0 right-0 bottom-0 z-0"
         style={{
           background: "#000000",
           backgroundImage: `
             linear-gradient(to right, rgba(120, 130, 140, 0.25) 1px, transparent 1px),
             linear-gradient(to bottom, rgba(120, 130, 140, 0.25) 1px, transparent 1px),
             linear-gradient(to right, rgba(120, 130, 140, 0.15) 1px, transparent 1px),
             linear-gradient(to bottom, rgba(120, 130, 140, 0.15) 1px, transparent 1px)
           `,
           backgroundSize: "120px 120px, 120px 120px, 40px 40px, 40px 40px",
         }}
       />

             <motion.h1 
         initial={{ opacity: 0, y: 50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: "easeOut" }}
         className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-black tracking-tight leading-none text-white relative z-10 mb-6 sm:mb-8"
       >
         CAPSULE
       </motion.h1>   
       
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
         className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 sm:mb-10 md:mb-12 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl leading-relaxed text-center relative z-10 px-2 sm:px-4"
       >
         <motion.span
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.4, delay: 0.4 }}
         >
           Write letters to your future self.
         </motion.span>
         <br />
         <motion.span 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.4, delay: 0.6 }}
           className="text-blue-300 font-semibold"
         >
           Stored anonymously on the blockchain.
         </motion.span>
         <br />
         <motion.span 
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.4, delay: 0.8 }}
           className="text-gray-400 text-sm sm:text-base md:text-lg"
         >
           Your thoughts, preserved in time.
         </motion.span>
       </motion.div>
               <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 relative z-10 mb-12 sm:mb-14 md:mb-16"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
            className="bg-white text-black px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold rounded-none hover:bg-gray-200 transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onWriteLetter}
          >
            WRITE YOUR FUTURE LETTER
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.4, ease: "easeOut" }}
            className="bg-transparent text-white border border-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 text-sm sm:text-base md:text-lg font-bold rounded-none hover:bg-white hover:text-black transition-all duration-300"
            onClick={onScheduledLetters}
          >
            VIEW YOUR CAPSULES
          </motion.button>
        </motion.div>
        
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
           className="text-center relative z-10 mb-6 sm:mb-8"
         >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-gray-400 hover:text-white text-xs sm:text-sm font-medium underline underline-offset-4 transition-all duration-300"
            onClick={onAbout}
          >
            Learn more about Capsule →
          </motion.button>
        </motion.div>
        
              <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-20 relative z-10">
        <div className="relative w-full h-full">

          <div className="absolute bottom-0 left-1/4 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-gradient-to-tr from-gray-800 to-black border border-orange-500/30 transform rotate-45 animate-pulse"></div>
          <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 right-1/3 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-bl from-gray-900 to-black border border-red-500/30 transform -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-5 sm:bottom-8 md:bottom-10 right-1/4 w-20 sm:w-28 md:w-40 h-10 sm:h-14 md:h-20 bg-gradient-to-r from-gray-800 to-black border border-orange-500/20 transform skew-x-12 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-16 sm:bottom-24 md:bottom-32 left-1/2 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-gradient-to-br from-gray-900 to-black border border-red-500/40 transform rotate-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>

               <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:space-x-6 lg:space-x-12 space-y-2 sm:space-y-0 text-xs sm:text-sm text-gray-400 mt-4 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.0 }}
            className="flex items-center justify-center sm:justify-start"
          >
            <span className="text-white font-bold mr-2">∞</span>
            <span>Immortal Storage</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.2 }}
            className="flex items-center justify-center sm:justify-start"
          >
            <span className="text-white font-bold mr-2">🔐</span>
            <span>Anonymous</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.4 }}
            className="flex items-center justify-center sm:justify-start"
          >
            <span className="text-white font-bold mr-2">⚡</span>
            <span>Instant</span>
          </motion.div>
        </motion.div>
    </div>
  );
};

export default Hero;
