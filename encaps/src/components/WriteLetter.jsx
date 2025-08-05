import React, { useState } from 'react';
import { useAccount, useWriteContract } from "wagmi";
import { capsuleAbi } from '../contract/abi';
import { stringToHex } from 'viem';


const WriteLetter = ({ onViewScheduledLetters }) => {

  const {address,isConnected}=useAccount();
  const {writeContractAsync}=useWriteContract();
  if (!isConnected){
    console.log("Select a wallet first")
  }
  const [letterContent, setLetterContent] = useState('');
  const [scheduledDate, setScheduledDate] = useState('');
  
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
      alert("Letter sent to future successfully! Redirecting to your scheduled letters...");
      
    
      if (onViewScheduledLetters) {
        onViewScheduledLetters();
      }
    } catch (error) {
      console.error("Error sending letter:", error);
      alert("Failed to send letter. Please try again.");
    }
  }


  return (
    <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden pt-24 px-8">

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
      <div className="w-full max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-6xl md:text-7xl font-black tracking-tight leading-none text-white mb-4">
            WRITE YOUR LETTER
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Pen your thoughts for the future. Choose when you want to receive this message.
          </p>
        </div>  
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gray-900/50 border border-gray-800 p-6 backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-4">How it works ?</h3>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-start space-x-3">
                  <span className="text-orange-500 font-bold text-lg">1</span>
                  <p>Write your letter to your future self. Be honest, be vulnerable, be hopeful.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-orange-500 font-bold text-lg">2</span>
                  <p>Choose when you want to receive this message- next year, in 5 years, or decades from now.</p>
                </div>
                <div className="flex items-start space-x-3">
                  <span className="text-orange-500 font-bold text-lg">3</span>
                  <p>Your letter will be encrypted and stored on the blockchain, waiting for the perfect moment.</p>
                </div>
              </div>
            </div>
                         <div className="bg-gray-900/50 border border-gray-800 p-6 backdrop-blur-sm">
               <h3 className="text-2xl font-bold text-white mb-4">⏱️ Schedule Delivery</h3>
               <div className="space-y-4">
                 <div>
                   <label className="block text-gray-300 text-sm font-medium mb-2">
                     Choose Date
                   </label>
                      <input
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-3 focus:outline-none focus:border-orange-500 transition-colors"
                      min={new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0]}
                    />
                   <p className="text-gray-400 text-sm mt-2">
                     Select when you want to receive this letter
                   </p>
                 </div>
               </div>
             </div>
          </div>
          <div className="lg:col-span-2">
            <div className="bg-gray-900/50 border border-gray-800 p-6 backdrop-blur-sm h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold text-white">Your Letter</h3>
                <span className="text-gray-400 text-sm">
                  {letterContent.length} characters
                </span>
              </div>
              <textarea
                value={letterContent}
                onChange={(e) => setLetterContent(e.target.value)}
                placeholder="Dear Future Me,

Write your letter here. Share your dreams, fears, hopes, and memories. What would you want to tell your future self?

Remember, this will be stored securely and anonymously on the blockchain...Its just you to you :)"
                className="w-full h-96 bg-gray-800 border border-gray-700 text-white px-6 py-4 focus:outline-none focus:border-orange-500 transition-colors resize-none font-mono text-lg leading-relaxed"
                maxLength={5000}
              />
              <div className="flex justify-between items-center mt-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm">
                    Max 5000 characters
                  </span>
                  {onViewScheduledLetters && (
                    <button 
                      onClick={onViewScheduledLetters}
                      className="text-orange-400 hover:text-orange-300 text-sm font-medium underline"
                    >
                      View Your Capsules
                    </button>
                  )}
                </div>
                <button onClick={()=>handleLetterSend()} className="bg-white text-black px-8 py-3 text-lg font-bold rounded-none hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">
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
    </div>
  );
};

export default WriteLetter; 