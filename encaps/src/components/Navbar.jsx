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
        <div className="flex justify-between items-center px-8 py-4">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={onNavigate}>
            <div className="text-white text-xl" style={{ filter: 'brightness(0) invert(1)' }}>🔒</div>
            <span className="text-white font-bold text-xl tracking-wide">CAPSULE</span>
          </div>

          <div className="flex items-center space-x-4">
            {!isConnected ? (
              <button
                onClick={() => setShowWalletModal(true)}
                className="bg-white text-black px-6 py-2 text-sm font-bold rounded-none hover:bg-transparent hover:text-white hover:border-white border border-transparent transition-all duration-300 transform hover:scale-105"
              >
                CONNECT WALLET
              </button>
            ) : (
              <button
                onClick={()=>disconnect()}
                className="bg-white text-black px-6 py-2 text-sm font-bold rounded-none hover:bg-transparent hover:text-white hover:border-white border border-transparent transition-all duration-300 transform hover:scale-105"
              >
                DISCONNECT
              </button>
            )}
          </div>
        </div>
      </nav>
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowWalletModal(false)}
          ></div>
          <div className="relative bg-black/90 border border-gray-800 p-8 max-w-md w-full mx-4">
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
            
            <button
              onClick={() => setShowWalletModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
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