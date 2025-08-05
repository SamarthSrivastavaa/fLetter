import React, { useState, useEffect } from 'react';
import { useAccount, useReadContract, usePublicClient } from "wagmi";
import { capsuleAbi } from '../contract/abi';
import { hexToString } from 'viem';

const ScheduledLetters = ({ onWriteLetter }) => {
  const { address, isConnected } = useAccount();
  const publicClient = usePublicClient();
  const [letters, setLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


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
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching letters:", error);
        setIsLoading(false);
        setLetters([]);
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
            YOUR TIME CAPSULES
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Messages from your past self, waiting to be discovered at the perfect moment.
          </p>
          {onWriteLetter && (
            <button 
              onClick={onWriteLetter}
              className="bg-transparent text-white border border-white px-6 py-3 text-lg font-bold rounded-none hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              WRITE NEW LETTER
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500"></div>
          </div>
        ) : letters.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-2xl font-bold text-white mb-2">No Letters Found</h2>
            <p className="text-gray-300 mb-6">You haven't scheduled any letters yet. Write your first time capsule!</p>
            {onWriteLetter && (
              <button 
                onClick={onWriteLetter}
                className="bg-white text-black px-6 py-3 text-lg font-bold rounded-none hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
              >
                WRITE YOUR FIRST LETTER
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {letters.map((letter) => (
              <div
                key={letter.id}
                className={`bg-gray-900/50 border backdrop-blur-sm p-6 transition-all duration-300 hover:scale-105 cursor-pointer ${
                  letter.isOpenable 
                    ? 'border-orange-500/50 hover:border-orange-500' 
                    : 'border-gray-800 hover:border-gray-700'
                }`}
                onClick={() => letter.isOpenable && handleOpenLetter(letter)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-sm font-bold px-3 py-1 rounded ${
                    letter.isOpenable 
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                      : 'bg-gray-800 text-gray-400 border border-gray-700'
                  }`}>
                    {letter.isOpenable ? 'READY' : 'LOCKED'}
                  </span>
                  <span className="text-xs text-gray-500">
                    #{letter.id}
                  </span>
                </div>

                <div className="mb-4">
                  <h3 className="text-lg font-bold text-white mb-2">
                    {formatDate(letter.scheduledDate)}
                  </h3>
                                     <p className="text-sm text-gray-400 mb-2">
                     {getDaysUntil(letter.scheduledDate, letter.unlockTimestamp)}
                   </p>
                </div>

                <div className="mb-4">
                  <p className="text-gray-300 text-sm line-clamp-3">
                    {letter.preview}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Scheduled: {letter.scheduledDate}
                  </div>
                  {letter.isOpenable && (
                    <button className="text-orange-400 hover:text-orange-300 text-sm font-medium">
                      Open Letter →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedLetter && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 border border-gray-800 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    Letter from {formatDate(selectedLetter.scheduledDate)}
                  </h2>
                  <button
                    onClick={closeLetter}
                    className="text-gray-400 hover:text-white text-2xl"
                  >
                    ×
                  </button>
                </div>
                
                <div className="bg-gray-800 border border-gray-700 p-6 mb-6">
                  <div className="text-gray-300 whitespace-pre-wrap font-mono text-lg leading-relaxed">
                    {selectedLetter.content}
                  </div>
                </div>

                <div className="flex justify-between items-center text-sm text-gray-400">
                  <span>Opened on {new Date().toLocaleDateString()}</span>
                  <span>Originally scheduled for {selectedLetter.scheduledDate}</span>
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
    </div>
  );
};

export default ScheduledLetters; 