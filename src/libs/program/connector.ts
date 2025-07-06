import { Connection, Keypair, Transaction } from "@solana/web3.js";

import { AnchorProvider, Program } from "@coral-xyz/anchor";
import type { Cassegrain } from "./cassegrain";
import IDL from "./cassegrain.json";
// import { GetCommitmentSignature } from "@magicblock-labs/ephemeral-rollups-sdk";

export const connection = new Connection(process.env.NEXT_PUBLIC_RPC_URL || "");

export const program = (provider: AnchorProvider) =>  {
  return new Program(IDL as Cassegrain, provider) as unknown as Program<Cassegrain>;
};

const programMethods = {
  // IMPROVED RAW TRANSACTION for Magic Block ER
  sendERTransaction: async (
    program: Program<Cassegrain>,
    methodBuilder: any,
    signer: Keypair,
    provider: AnchorProvider,
    description: string
  ): Promise<string> => {
    console.log(`🔧 [ER] Building transaction for: ${description}`);

    let tx = await methodBuilder.transaction();
    tx.feePayer = provider.wallet.publicKey;
    tx.recentBlockhash = (
      await provider.connection.getLatestBlockhash()
    ).blockhash;

    // Sign with the actual signer first
    tx.partialSign(signer);
    // Then sign with provider wallet (fee payer)
    tx = await provider.wallet.signTransaction(tx);

    const rawTx = tx.serialize();

    return rawTx;
    // const txHash = await provider.connection.sendRawTransaction(rawTx);
    // await provider.connection.confirmTransaction(txHash);

    // console.log(`🔧 [ER] Transaction sent: ${txHash}`);

    // try {
    //   await new Promise((resolve) => setTimeout(resolve, 2000));
    //   const txCommitSgn = await GetCommitmentSignature(
    //     txHash,
    //     provider.connection
    //   );
    //   console.log(`🔧 [ER] ✅ Commitment signature: ${txCommitSgn}`);
    //   return txCommitSgn;
    // } catch (commitError) {
    //   console.log(
    //     `🔧 [ER] ⚠️ Using transaction hash as fallback: ${txHash}`,
    //     commitError
    //   );
    //   return txHash;
    // }
  },

  sendTransaction: async (tx: Buffer<ArrayBufferLike>) => {
    const txHash = await connection.sendRawTransaction(tx);
    await connection.confirmTransaction(txHash);
    return txHash;
  }

};

export default programMethods;
