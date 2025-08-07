import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useWriteContract, useConnect, useConnectors, useDisconnect } from "wagmi";
import { capsuleAbi } from '../contract/abi';
import { stringToHex } from 'viem';


const WriteLetter = ({ onViewScheduledLetters }) => {

  const {address,isConnected}=useAccount();
  const {writeContractAsync}=useWriteContract();
  const {connect,connectors,isPending}=useConnect();
  const {disconnect}=useDisconnect();
  const [letterContent, setLetterContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  const [showFooter, setShowFooter] = useState(false);

  const handleConnectWallet = (connector) => {
    connect({connector});
  };
  
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
  
  const handleLetterSend=async()=>{

     if (!letterContent || !scheduledDate) {
    alert("Please fill all fields before sending.");
    return;
  }

  const encodedLetter=stringToHex(letterContent);


const unlockTimestamp = BigInt(Math.floor(new Date(`${scheduledDate}T00:00:00`).getTime() / 1000));

    try {
      
      await writeContractAsync({
        abi:capsuleAbi,
        address:"0x1872c96Cc6Ea7000821936189F26D02f7c405932",
        functionName: "writeLetter",
        args: [encodedLetter, unlockTimestamp],
        account: address,
      })
      // await write.wait();
      // alert("Letter sent to future successfully!Redirecting to your scheduled letters..");
      
    
      if (onViewScheduledLetters) {
        onViewScheduledLetters();
      }
    } catch (error) {
      console.error("Error sending letter:", error);
      alert("Failed to send letter. Please try again.");
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-7xl mx-auto relative z-10 pb-8 sm:pb-10 md:pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-center py-12 sm:py-16 md:py-20"
          >
            <div className="bg-black/90 border border-gray-800 p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md w-full mx-2 sm:mx-4">
              <div className="text-center mb-4 sm:mb-6">
                <h2 className="text-white text-xl sm:text-2xl font-bold mb-2">Connect Wallet</h2>
                <p className="text-gray-400 text-xs sm:text-sm">Choose your preferred wallet</p>
              </div>
              
                             <div className="space-y-2 sm:space-y-3">
                 {connectors.map((connector) => (
                   <button
                     key={connector.uid || connector.id}
                     onClick={() => handleConnectWallet(connector)}
                     disabled={isPending}
                     className="w-full bg-white text-black px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm font-bold rounded-none hover:bg-transparent hover:text-white hover:border-white border border-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isPending ? 'Connecting...' : connector.name}
                   </button>
                 ))}
               </div>
              
              <div className="text-center mt-4 sm:mt-6">
                <p className="text-gray-400 text-xs sm:text-sm">
                  You need to connect your wallet to write letters to your future self.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden pt-16 sm:pt-20 md:pt-24 px-4 sm:px-6 md:px-8">

      {/* <div
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
      />     */}
             <div className="w-full max-w-7xl mx-auto relative z-10 pb-8 sm:pb-10 md:pb-12">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="text-center mb-8 sm:mb-10 md:mb-12"
         >
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-none text-white mb-3 sm:mb-4"
           >
             WRITE YOUR LETTER
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-2xl mx-auto px-2 sm:px-4"
           >
             Pen your thoughts for the future. Choose when you want to receive this message.
           </motion.p>
         </motion.div>  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 items-start">
          <div className="lg:col-span-1 space-y-4 sm:space-y-6">
            <div className="bg-black/60 border-2 border-yellow-400/40 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl backdrop-blur-md">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white">How it works ?</h3>
              </div>
                             <div className="space-y-4 sm:space-y-6 text-gray-300">
                 <div className="flex items-start space-x-2 sm:space-x-4">
                   <span className="text-yellow-400 font-bold text-base sm:text-lg">1</span>
                   <p className="text-white/80 leading-relaxed text-sm sm:text-base">Write your letter to your future self. Be honest, be vulnerable, be hopeful.</p>
                 </div>
                 <div className="flex items-start space-x-2 sm:space-x-4">
                   <span className="text-yellow-400 font-bold text-base sm:text-lg">2</span>
                   <p className="text-white/80 leading-relaxed text-sm sm:text-base">Choose when you want to receive this message- next year, in 5 years, or decades from now.</p>
                 </div>
                 <div className="flex items-start space-x-2 sm:space-x-4">
                   <span className="text-yellow-400 font-bold text-base sm:text-lg">3</span>
                   <p className="text-white/80 leading-relaxed text-sm sm:text-base">Your letter will be encrypted and stored on the blockchain, waiting for the perfect moment.</p>
                 </div>
               </div>
            </div>
            <div className="bg-black/60 border-2 border-yellow-400/40 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl backdrop-blur-md">
              <div className="flex items-center space-x-2 sm:space-x-3 mb-4 sm:mb-6">
                <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white">⏱️ Schedule Delivery</h3>
              </div>
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className="block text-white/80 text-xs sm:text-sm font-bold mb-2 sm:mb-3">
                    Choose Date
                  </label>
                                     <input
                     type="date"
                     value={scheduledDate}
                     onChange={(e) => setScheduledDate(e.target.value)}
                     className="w-full bg-black/80 border-2 border-white/20 text-white px-3 sm:px-4 md:px-6 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl focus:outline-none focus:border-yellow-400/60 transition-all duration-300 backdrop-blur-sm [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert text-sm sm:text-base"
                     min={new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]}
                   />
                  <p className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3">
                    Select when you want to receive this letter
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-black/60 border-2 border-yellow-400/40 p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl backdrop-blur-md h-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 sm:w-3 h-2 sm:h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white">Your Letter</h3>
                </div>
                <span className="text-white/60 text-xs sm:text-sm font-bold bg-white/10 px-2 sm:px-3 py-1 rounded-full self-start sm:self-auto">
                  {letterContent.length} characters
                </span>
              </div>
                             <textarea
                 value={letterContent}
                 onChange={(e) => setLetterContent(e.target.value)}
                 placeholder="Dear Future Me,

Write your letter here. Share your dreams, fears, hopes, and memories. What would you want to tell your future self?

Remember, this will be stored securely and anonymously on the blockchain...Its just you to you :)"
                 className="w-full h-48 sm:h-64 md:h-80 lg:h-96 xl:h-[28rem] bg-white/5 border-2 border-white/20 text-white px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 focus:outline-none focus:border-yellow-400/60 transition-all duration-300 resize-none font-mono text-sm sm:text-base md:text-lg leading-relaxed rounded-lg sm:rounded-xl md:rounded-2xl backdrop-blur-sm"
                 maxLength={5000}
               />
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-4 sm:mt-6 space-y-3 sm:space-y-0">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <span className="text-white/60 text-xs sm:text-sm font-bold">
                    Max 5000 characters
                  </span>
                  {onViewScheduledLetters && (
                    <button 
                      onClick={onViewScheduledLetters}
                      className="text-yellow-400 hover:text-yellow-300 text-xs sm:text-sm font-bold underline transition-colors self-start sm:self-auto"
                    >
                      View Your Capsules
                    </button>
                  )}
                </div>
                <button onClick={()=>handleLetterSend()} className="bg-yellow-400 text-black px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg font-black rounded-lg sm:rounded-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-400/25 self-start sm:self-auto">
                  SEND TO FUTURE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-20 relative z-10 mt-8 sm:mt-12 md:mt-16">
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-1/4 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 bg-gradient-to-tr from-gray-800 to-black border border-orange-500/30 transform rotate-45 animate-pulse"></div>
            <div className="absolute bottom-10 sm:bottom-16 md:bottom-20 right-1/3 w-12 sm:w-16 md:w-24 h-12 sm:h-16 md:h-24 bg-gradient-to-bl from-gray-900 to-black border border-red-500/30 transform -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-5 sm:bottom-8 md:bottom-10 right-1/4 w-20 sm:w-28 md:w-40 h-10 sm:h-14 md:h-20 bg-gradient-to-r from-gray-800 to-black border border-orange-500/20 transform skew-x-12 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-16 sm:bottom-24 md:bottom-32 left-1/2 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-gradient-to-br from-gray-900 to-black border border-red-500/40 transform rotate-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>
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

export default WriteLetter; 