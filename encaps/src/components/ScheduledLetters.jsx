import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAccount, useReadContract, usePublicClient } from "wagmi";
import { capsuleAbi } from '../contract/abi';
import { hexToString } from 'viem';

const ScheduledLetters = ({ onWriteLetter }) => {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [showAllLetters, setShowAllLetters] = useState(false);
  const [previewLetters, setPreviewLetters] = useState([]);

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

  const { data: userLetterIds } = useReadContract({
    address: "0x1872c96Cc6Ea7000821936189F26D02f7c405932",
    abi: capsuleAbi,
    functionName: 'getUserLetters',
    args: [address],
  });

  const { data: letterDetails } = useReadContract({
    address: "0x1872c96Cc6Ea7000821936189F26D02f7c405932",
    abi: capsuleAbi,
    functionName: 'letters',
    args: [userLetterIds?.[0] || 0],
  });

  useEffect(() => {
    if (!isConnected || !userLetterIds || !publicClient) return;
  
         const fetchLetters = async () => {
       try {
      
         console.log('User letter IDs from contract:', userLetterIds);
         console.log('Current wallet address:', address);
         
         const processed = [];
         
         for (let i = 0; i < userLetterIds.length; i++) {
          const letterId = userLetterIds[i];
          
                     try {
             
             const letterDetail = await publicClient.readContract({
               address: "0x1872c96Cc6Ea7000821936189F26D02f7c405932",
               abi: capsuleAbi,
               functionName: 'letters',
               args: [Number(letterId)],
             });
              
                           
               const unlockTimestamp = Number(letterDetail[2]); // unlockTimes at index 2
               const letterOwner = letterDetail[0]; // owner at index 0
               const unlockDate = new Date(unlockTimestamp * 1000);
               const isOwner = letterOwner.toLowerCase() === address.toLowerCase();
               
              //console.log('Letter id:',letterId);
              //console.log('Letter owner:',letterOwner);
              //console.log('Current address:',address);
              //console.log('Is owner:',isOwner);
              //console.log('Owner comparison:',letterOwner.toLowerCase(),'===',address.toLowerCase());
               
               if (!isOwner) {
                 console.log('Skipping letter', letterId, 'because it belongs to', letterOwner, 'not', address);
                 continue;
               }
            
               const currentTime = Math.floor(Date.now() / 1000);
               const isOpenable = currentTime >= unlockTimestamp;
              
              
              //  console.log('Letter ID:', letterId, 'Unlock timestamp:', unlockTimestamp, 'Current time:', currentTime, 'Is openable:', isOpenable);
              // console.log('Unlock date:',unlockDate.toLocaleString(), 'Current date:', new Date().toLocaleString());
              // console.log('Time difference(seconds):',currentTime -unlockTimestamp);
              // console.log('Time difference (hours):', (currentTime -unlockTimestamp) /3600);
              // console.log('Letter date string:', unlockDate.toISOString().slice(0, 10), 'Today:', new Date().toISOString().slice(0, 10));
            
            if (isOpenable) {
              
                             const letterContent = await publicClient.readContract({
                 address: "0x1872c96Cc6Ea7000821936189F26D02f7c405932",
                 abi: capsuleAbi,
                 functionName: 'readLetter',
                 args: [Number(letterId)],
                 account: address, // to let the cntrct know whos making th call effectively
               });
              
              const decodedContent = hexToString(letterContent);
        
              const localDate = unlockDate.getFullYear() + '-' + 
                String(unlockDate.getMonth() + 1).padStart(2, '0') + '-' +
                String(unlockDate.getDate()).padStart(2,'0');
              
              processed.push({
                id: Number(letterId),
                scheduledDate: localDate,
                unlockTimestamp,
                preview: decodedContent?.slice(0, 80) + "...",
                isOpenable: true,
                content: decodedContent
              });


            } else {
              // timezoness
              const localDate = unlockDate.getFullYear() + '-' + 
                String(unlockDate.getMonth() + 1).padStart(2, '0') + '-' + 
                String(unlockDate.getDate()).padStart(2, '0');
              
              processed.push({
                id: Number(letterId),
                scheduledDate: localDate,
                unlockTimestamp,
                preview: "Letter content will be available when unlocked...",
                isOpenable: false,
                content: null
              });
            }
                     } catch (error) {
             //If wecan't get letter details, shows as locked
             console.error('Error getting letter details for ID', letterId,':',error);
             processed.push({
               id: Number(letterId),
               scheduledDate: new Date().toISOString().slice(0, 10),
               unlockTimestamp: Date.now() / 1000,
               preview: "Letter content will be available when unlocked...",
               isOpenable: false,
               content: null
             });
           }
        }
        
                 setLetters(processed);
         setPreviewLetters(processed.slice(0, 3));
         setIsLoading(false);
       } catch (error) {
         console.error("Error fetching letters:", error);
         setIsLoading(false);
         setLetters([]);
         setPreviewLetters([]);
       }
    };
    
    fetchLetters();
  }, [isConnected, userLetterIds, address, publicClient]);
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntil = (dateString, unlockTimestamp) => {
    const today = new Date();
    const targetDate = new Date(dateString);
    const currentTime = Math.floor(Date.now() / 1000);
    
    // Useee the actual unlock timestamp for more accurate comparison
    if (currentTime >= unlockTimestamp) return 'Opened';
    
    const diffTime = targetDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Tomorrow';
    return `${diffDays} days`;
  };

  const handleOpenLetter = (letter) => {
    setSelectedLetter(letter);
  };

  const closeLetter = () => {
    setSelectedLetter(null);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center relative overflow-hidden pt-24 px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Connect Your Wallet</h1>
          <p className="text-gray-300">Please connect your wallet to view your scheduled letters.</p>
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
      /> */}

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
             YOUR TIME CAPSULES
           </motion.h1>
                       <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-xl text-yellow-400 max-w-2xl mx-auto mb-6"
            >
              Messages from your past self, waiting to be discovered at the perfect moment.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex justify-center space-x-8 text-sm text-white/60 mb-8"
            >
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Secure & Anonymous</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Blockchain Stored</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span>Time-Locked</span>
              </div>
            </motion.div>
           {onWriteLetter && (
             <motion.button 
               whileHover={{ scale: 1.05, y: -2 }}
               whileTap={{ scale: 0.98 }}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.8 }}
               onClick={onWriteLetter}
               className="bg-transparent text-white border border-white px-6 py-3 text-lg font-bold rounded-none hover:bg-white hover:text-black transition-all duration-300"
             >
               WRITE NEW LETTER
             </motion.button>
           )}
         </motion.div>

                 {isLoading ? (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             className="flex justify-center items-center h-64"
           >
             <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
           </motion.div>
                  ) : letters.length === 0 ? (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.6, delay: 1.2 }}
             className="text-center py-16"
           >
             <div className="text-6xl mb-4">📭</div>
             <h2 className="text-2xl font-bold text-white mb-2">No Letters Found</h2>
             <p className="text-gray-300 mb-6">You haven't scheduled any letters yet. Write your first time capsule!</p>
             {onWriteLetter && (
               <motion.button 
                 whileHover={{ scale: 1.05, y: -2 }}
                 whileTap={{ scale: 0.98 }}
                 onClick={onWriteLetter}
                 className="bg-white text-black px-6 py-3 text-lg font-bold rounded-lg hover:bg-gray-200 transition-all duration-300"
               >
                 WRITE YOUR FIRST LETTER
               </motion.button>
             )}
           </motion.div>
         ) : (
                       <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              className="space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="text-center mb-8"
              >
                <div className="inline-flex items-center space-x-3 bg-black/40 border border-yellow-400/30 px-6 py-3 rounded-full">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                  <span className="text-white/80 text-sm font-medium">
                    {letters.length} {letters.length === 1 ? 'Time Capsule' : 'Time Capsules'} • {letters.filter(l => l.isOpenable).length} Ready to Open
                  </span>
                </div>
              </motion.div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {(showAllLetters ? letters : previewLetters).map((letter, index) => (
                             <motion.div
                 key={letter.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 1.2 + (index * 0.1) }}
                 whileHover={{ scale: 1.02, y: -4 }}
                                   className={`bg-black/60 border-2 backdrop-blur-sm p-8 rounded-xl transition-all duration-300 cursor-pointer ${
                    letter.isOpenable 
                      ? 'border-green-500/40 hover:border-green-500/60 shadow-lg shadow-green-500/10' 
                      : 'border-white/20 hover:border-white/30 shadow-lg shadow-white/5'
                  }`}
                 onClick={() => letter.isOpenable && handleOpenLetter(letter)}
               >
                                 <div className="flex items-center justify-between mb-6">
                                       <span className={`text-sm font-bold px-4 py-2 rounded-full ${
                      letter.isOpenable 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/40' 
                        : 'bg-white/10 text-white/60 border border-white/20'
                    }`}>
                      {letter.isOpenable ? 'READY' : 'LOCKED'}
                    </span>
                                       <span className="text-xs text-white/60 bg-white/10 px-2 py-1 rounded-full border border-white/20">
                      #{letter.id}
                    </span>
                 </div>

                                 <div className="mb-6">
                   <h3 className="text-xl font-bold text-white mb-3">
                     {formatDate(letter.scheduledDate)}
                   </h3>
                                       <p className="text-sm text-yellow-400 mb-4 font-medium">
                      {getDaysUntil(letter.scheduledDate, letter.unlockTimestamp)}
                    </p>
                 </div>

                 <div className="mb-6">
                                       <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
                      {letter.preview}
                    </p>
                 </div>

                                 <div className="flex items-center justify-between pt-4 border-t border-gray-700/30">
                                       <div className="text-xs text-white/60 bg-white/10 px-3 py-1 rounded-full border border-white/20">
                      {letter.scheduledDate}
                    </div>
                                         {letter.isOpenable && (
                       <button className="text-green-400 hover:text-green-300 text-sm font-medium bg-green-500/10 px-3 py-1 rounded-full transition-colors border border-green-500/20">
                         Open Letter →
                       </button>
                     )}
                 </div>
               </motion.div>
             ))}
             </div>
             
             {!showAllLetters && letters.length > 3 && (
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.6, delay: 1.4 }}
                 className="text-center pt-8"
               >
                 <motion.button 
                   whileHover={{ scale: 1.05, y: -2 }}
                   whileTap={{ scale: 0.98 }}
                   onClick={() => setShowAllLetters(true)}
                   className="bg-transparent text-white border border-white px-8 py-4 text-lg font-bold rounded-lg hover:bg-white hover:text-black transition-all duration-300"
                 >
                   VIEW ALL {letters.length} LETTERS
                 </motion.button>
               </motion.div>
             )}
           </motion.div>
         )}

                 {selectedLetter && (
           <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-50 flex items-center justify-center p-4">
             <div className="bg-black border-2 border-yellow-400/60 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl relative">
               <div className="p-10">
                 <div className="flex items-center justify-between mb-10">
                   <div className="flex items-center space-x-6">
                     <div className="w-4 h-4 bg-yellow-400 rounded-full animate-pulse"></div>
                     <h2 className="text-3xl font-black text-white tracking-tight">
                       Letter from {formatDate(selectedLetter.scheduledDate)}
                     </h2>
                   </div>
                   <button
                     onClick={closeLetter}
                     className="text-gray-400 hover:text-yellow-400 text-3xl transition-all duration-300 hover:scale-110 transform"
                   >
                     ×
                   </button>
                 </div>
                 
                 <div className="relative mb-10">
                   <div className="bg-white/5 border border-white/20 p-10 rounded-2xl backdrop-blur-md">
                     <div className="text-white/90 whitespace-pre-wrap font-mono text-xl leading-relaxed">
                       {selectedLetter.content}
                     </div>
                   </div>
                 </div>

                 <div className="flex justify-between items-center text-sm border-t border-white/20 pt-8">
                   <div className="flex items-center space-x-3">
                     <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                     <span className="font-bold text-white/80">Opened on {new Date().toLocaleDateString()}</span>
                   </div>
                   <div className="flex items-center space-x-3">
                     <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                     <span className="font-bold text-white/80">Originally scheduled for {selectedLetter.scheduledDate}</span>
                   </div>
                 </div>
               </div>
             </div>
           </div>
         )}

                 <div className="absolute bottom-0 left-0 w-full h-1/3 opacity-20 relative z-10 mt-16">
          <div className="relative w-full h-full">
            <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-gradient-to-tr from-gray-800 to-black border border-orange-500/30 transform rotate-45 animate-pulse"></div>
            <div className="absolute bottom-20 right-1/3 w-24 h-24 bg-gradient-to-bl from-gray-900 to-black border border-red-500/30 transform -rotate-12 animate-pulse" style={{animationDelay: '1s'}}></div>
            <div className="absolute bottom-10 right-1/4 w-40 h-20 bg-gradient-to-r from-gray-800 to-black border border-orange-500/20 transform skew-x-12 animate-pulse" style={{animationDelay: '2s'}}></div>
            <div className="absolute bottom-32 left-1/2 w-16 h-16 bg-gradient-to-br from-gray-900 to-black border border-red-500/40 transform rotate-30 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          </div>
        </div>
      </div>
      
             {/*Foote */}
       {showFooter && (
         <footer className="fixed bottom-0 left-0 w-full bg-black/90 border-t border-yellow-500/30 z-50 transition-all duration-300 ease-in-out">
           <div className="max-w-7xl mx-auto px-4 py-6">
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

export default ScheduledLetters; 