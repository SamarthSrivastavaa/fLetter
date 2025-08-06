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
      <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden pt-24 px-8">
        <div className="w-full max-w-7xl mx-auto relative z-10 pb-12">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center items-center py-20"
          >
            <div className="bg-black/90 border border-gray-800 p-8 max-w-md w-full mx-4">
              <div className="text-center mb-6">
                <h2 className="text-white text-2xl font-bold mb-2">Connect Wallet</h2>
                <p className="text-gray-400 text-sm">Choose your preferred wallet</p>
              </div>
              
                             <div className="space-y-3">
                 {connectors.map((connector) => (
                   <button
                     key={connector.uid || connector.id}
                     onClick={() => handleConnectWallet(connector)}
                     disabled={isPending}
                     className="w-full bg-white text-black px-6 py-3 text-sm font-bold rounded-none hover:bg-transparent hover:text-white hover:border-white border border-transparent transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                   >
                     {isPending ? 'Connecting...' : connector.name}
                   </button>
                 ))}
               </div>
              
              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">
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
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden pt-24 px-8">

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
             <div className="w-full max-w-7xl mx-auto relative z-10 pb-12">
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, delay: 0.2 }}
           className="text-center mb-12"
         >
           <motion.h1 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.4 }}
             className="text-6xl md:text-7xl font-black tracking-tight leading-none text-white mb-4"
           >
             WRITE YOUR LETTER
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 0.6 }}
             className="text-xl text-gray-300 max-w-2xl mx-auto"
           >
             Pen your thoughts for the future. Choose when you want to receive this message.
           </motion.p>
         </motion.div>  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-black/60 border-2 border-yellow-400/40 p-8 rounded-2xl backdrop-blur-md">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-black text-white">How it works ?</h3>
              </div>
                             <div className="space-y-6 text-gray-300">
                 <div className="flex items-start space-x-4">
                   <span className="text-yellow-400 font-bold text-lg">1</span>
                   <p className="text-white/80 leading-relaxed">Write your letter to your future self. Be honest, be vulnerable, be hopeful.</p>
                 </div>
                 <div className="flex items-start space-x-4">
                   <span className="text-yellow-400 font-bold text-lg">2</span>
                   <p className="text-white/80 leading-relaxed">Choose when you want to receive this message- next year, in 5 years, or decades from now.</p>
                 </div>
                 <div className="flex items-start space-x-4">
                   <span className="text-yellow-400 font-bold text-lg">3</span>
                   <p className="text-white/80 leading-relaxed">Your letter will be encrypted and stored on the blockchain, waiting for the perfect moment.</p>
                 </div>
               </div>
            </div>
            <div className="bg-black/60 border-2 border-yellow-400/40 p-8 rounded-2xl backdrop-blur-md">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                <h3 className="text-2xl font-black text-white">⏱️ Schedule Delivery</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-white/80 text-sm font-bold mb-3">
                    Choose Date
                  </label>
                                     <input
                     type="date"
                     value={scheduledDate}
                     onChange={(e) => setScheduledDate(e.target.value)}
                     className="w-full bg-black/80 border-2 border-white/20 text-white px-6 py-4 rounded-xl focus:outline-none focus:border-yellow-400/60 transition-all duration-300 backdrop-blur-sm [&::-webkit-calendar-picker-indicator]:filter [&::-webkit-calendar-picker-indicator]:invert"
                     min={new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]}
                   />
                  <p className="text-gray-400 text-sm mt-3">
                    Select when you want to receive this letter
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-black/60 border-2 border-yellow-400/40 p-8 rounded-2xl backdrop-blur-md h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                  <h3 className="text-2xl font-black text-white">Your Letter</h3>
                </div>
                <span className="text-white/60 text-sm font-bold bg-white/10 px-3 py-1 rounded-full">
                  {letterContent.length} characters
                </span>
              </div>
                             <textarea
                 value={letterContent}
                 onChange={(e) => setLetterContent(e.target.value)}
                 placeholder="Dear Future Me,

Write your letter here. Share your dreams, fears, hopes, and memories. What would you want to tell your future self?

Remember, this will be stored securely and anonymously on the blockchain...Its just you to you :)"
                 className="w-full h-[28rem] bg-white/5 border-2 border-white/20 text-white px-8 py-6 focus:outline-none focus:border-yellow-400/60 transition-all duration-300 resize-none font-mono text-lg leading-relaxed rounded-2xl backdrop-blur-sm"
                 maxLength={5000}
               />
              <div className="flex justify-between items-center mt-6">
                <div className="flex items-center space-x-4">
                  <span className="text-white/60 text-sm font-bold">
                    Max 5000 characters
                  </span>
                  {onViewScheduledLetters && (
                    <button 
                      onClick={onViewScheduledLetters}
                      className="text-yellow-400 hover:text-yellow-300 text-sm font-bold underline transition-colors"
                    >
                      View Your Capsules
                    </button>
                  )}
                </div>
                <button onClick={()=>handleLetterSend()} className="bg-yellow-400 text-black px-8 py-4 text-lg font-black rounded-xl hover:bg-yellow-300 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-yellow-400/25">
                  SEND TO FUTURE
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-20 relative z-10 mt-16">
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-gradient-to-tr from-gray-800 to-black border border-orange-500/30 transform rotate-45 animate-pulse"></div>
            <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-bl from-gray-900 to-black border border-red-500/30 transform -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-10 right-1/4 w-40 h-20 bg-gradient-to-r from-gray-800 to-black border border-orange-500/20 transform skew-x-12 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-32 left-1/2 w-16 h-16 bg-gradient-to-br from-gray-900 to-black border border-red-500/40 transform rotate-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
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

export default WriteLetter; 