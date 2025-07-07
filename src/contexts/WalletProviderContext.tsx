"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider } from "@coral-xyz/anchor";
import { Connection } from "@solana/web3.js";

interface WalletProviderContextType {
  provider: AnchorProvider | null;
  connection: Connection | null;
  isConnected: boolean;
}

const WalletProviderContext = createContext<WalletProviderContextType | undefined>(undefined);

interface WalletProviderProps {
  children: React.ReactNode;
}

export const WalletProviderProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [provider, setProvider] = useState<AnchorProvider | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const wallet = useWallet();

  useEffect(() => {
    if (wallet.connected && wallet.publicKey) {
      const conn = new Connection(process.env.NEXT_PUBLIC_RPC_URL || "https://api.devnet.solana.com");
      const anchorProvider = new AnchorProvider(conn, wallet, {
        commitment: "confirmed",
      });
      
      setConnection(conn);
      setProvider(anchorProvider);
    } else {
      setProvider(null);
      setConnection(null);
    }
  }, [wallet.connected, wallet.publicKey, wallet]);

  const value = {
    provider,
    connection,
    isConnected: wallet.connected,
  };

  return (
    <WalletProviderContext.Provider value={value}>
      {children}
    </WalletProviderContext.Provider>
  );
};

export const useWalletProvider = (): WalletProviderContextType => {
  const context = useContext(WalletProviderContext);
  if (context === undefined) {
    throw new Error("useWalletProvider must be used within a WalletProviderProvider");
  }
  return context;
}; 