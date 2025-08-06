import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onWriteLetter, onScheduledLetters, onAbout }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden pt-8 px-8">
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
         className="text-8xl md:text-9xl lg:text-[12rem] font-black tracking-tight leading-none text-white relative z-10 mb-8"
       >
         CAPSULE
       </motion.h1>   
       
       <motion.div 
         initial={{ opacity: 0, y: 30 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
         className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl leading-relaxed text-center relative z-10"
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
           className="text-gray-400 text-lg"
         >
           Your thoughts, preserved in time.
         </motion.span>
       </motion.div>
               <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 relative z-10 mb-16"
        >
          <motion.button 
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.2, ease: "easeOut" }}
            className="bg-white text-black px-8 py-4 text-lg font-bold rounded-none hover:bg-gray-200 transition-all duration-300"
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
            className="bg-transparent text-white border border-white px-8 py-4 text-lg font-bold rounded-none hover:bg-white hover:text-black transition-all duration-300"
            onClick={onScheduledLetters}
          >
            VIEW YOUR CAPSULES
          </motion.button>
        </motion.div>
        
                 {/* About Link */}
         <motion.div 
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 1.6, ease: "easeOut" }}
           className="text-center relative z-10 mb-8"
         >
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="text-gray-400 hover:text-white text-sm font-medium underline underline-offset-4 transition-all duration-300"
            onClick={onAbout}
          >
            Learn more about Capsule →
          </motion.button>
        </motion.div>
        
              <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-20 relative z-10">
        <div className="relative w-full h-full">

          <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-gradient-to-tr from-gray-800 to-black border border-orange-500/30 transform rotate-45 animate-pulse"></div>
          <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-bl from-gray-900 to-black border border-red-500/30 transform -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute bottom-10 right-1/4 w-40 h-20 bg-gradient-to-r from-gray-800 to-black border border-orange-500/20 transform skew-x-12 animate-pulse" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-32 left-1/2 w-16 h-16 bg-gradient-to-br from-gray-900 to-black border border-red-500/40 transform rotate-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
        </div>
      </div>

               <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8, ease: "easeOut" }}
          className="flex space-x-12 text-sm text-gray-400 mt-4 relative z-10"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.0 }}
            className="flex items-center"
          >
            <span className="text-white font-bold mr-2">∞</span>
            <span>Immortal Storage</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.2 }}
            className="flex items-center"
          >
            <span className="text-white font-bold mr-2">🔐</span>
            <span>Anonymous</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 2.4 }}
            className="flex items-center"
          >
            <span className="text-white font-bold mr-2">⚡</span>
            <span>Instant</span>
          </motion.div>
        </motion.div>
    </div>
  );
};

export default Hero;
