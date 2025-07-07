"use client";

import { useWalletProvider } from "@/contexts/WalletProviderContext";

export default function ExampleComponent() {
  const { provider, connection, isConnected } = useWalletProvider();

  const handleBlockchainAction = async () => {
    if (!provider || !isConnected) {
      console.log("Wallet not connected");
      return;
    }

    try {
      // Use the provider for Anchor operations
      // const program = new Program(idl, provider);
      // const tx = await program.methods.someMethod().rpc();
      
      // Use the connection for direct Solana operations
      // const balance = await connection.getBalance(provider.wallet.publicKey);
      
      console.log("Provider available:", provider);
      console.log("Connection available:", connection);
    } catch (error) {
      console.error("Blockchain operation failed:", error);
    }
  };

  return (
    <div>
      <p>Wallet Connected: {isConnected ? "Yes" : "No"}</p>
      <p>Provider Available: {provider ? "Yes" : "No"}</p>
      <p>Connection Available: {connection ? "Yes" : "No"}</p>
      <button onClick={handleBlockchainAction}>
        Perform Blockchain Action
      </button>
    </div>
  );
} 