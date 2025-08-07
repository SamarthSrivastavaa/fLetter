import React, { useState } from 'react';
import { useAccount, useConnect, useConnectors, useDisconnect } from 'wagmi'

const Navbar = ({ onNavigate }) => {
  const [showWalletModal, setShowWalletModal] = useState(false);
  const {connect,connectors,isPending}=useConnect();
  const {disconnect}=useDisconnect();
  const {isConnected, address}=useAccount()

  const handleConnectWallet = (connector) => {
    connect({connector});
    setShowWalletModal(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="flex justify-between items-center px-4 sm:px-6 md:px-8 py-3 sm:py-4">
          <div className="flex items-center space-x-2 sm:space-x-3 cursor-pointer" onClick={onNavigate}>
            <div className="text-white text-lg sm:text-xl" style={{ filter: 'brightness(0) invert(1)' }}>🔒</div>
            <span className="text-white font-bold text-lg sm:text-xl tracking-wide">CAPSULE</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            {!isConnected ? (
              <button
                onClick={() => setShowWalletModal(true)}
                className="bg-white text-black px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-none hover:bg-transparent hover:text-white hover:border-white border border-transparent transition-all duration-300 transform hover:scale-105"
              >
                CONNECT WALLET
              </button>
            ) : (
              <button
                onClick={()=>disconnect()}
                className="bg-white text-black px-3 sm:px-4 md:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-bold rounded-none hover:bg-transparent hover:text-white hover:border-white border border-transparent transition-all duration-300 transform hover:scale-105"
              >
                DISCONNECT
              </button>
            )}
          </div>
        </div>
      </nav>
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowWalletModal(false)}
          ></div>
          <div className="relative bg-black/90 border border-gray-800 p-4 sm:p-6 md:p-8 max-w-sm sm:max-w-md w-full mx-2 sm:mx-4">
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
            
            <button
              onClick={() => setShowWalletModal(false)}
              className="absolute top-2 sm:top-4 right-2 sm:right-4 text-gray-400 hover:text-white transition-colors duration-200 text-lg sm:text-xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 