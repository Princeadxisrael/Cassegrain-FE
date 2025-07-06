import { BN, Program } from "@coral-xyz/anchor";
import type { Cassegrain } from "../program/cassegrain";
import { pdaGen } from "./pda";
import { PublicKey, SystemProgram } from "@solana/web3.js";

//get pub key from Daniel TODO::
const config = {
  initialize: async (pubkey: PublicKey, program: Program<Cassegrain>) => {
    console.log(program.programId.toString());
    const configPda = pdaGen.configNew(pubkey, program);
    console.log(configPda.toString());
    // try {
    //   const configAccount = await program.account.cassegrainConfig.fetch(
    //     configPda
    //   );
    //   return configAccount;
    // } catch (error) {
    //   console.log(error);
    // }

    try{
    const tx = await program.methods
      .initialize(
        new BN(1_000_000), // 0.001 SOL registration fee
        1000, // max events per product
        5000, // max products per manufacturer
        new BN(5), // 5 seconds min interval (reasonable for testing)
        50 // max batch size
      )
      .accountsPartial({
        authority: pubkey,
        cassegrainConfig: configPda,
        systemProgram: SystemProgram.programId,
      })
      .rpc();

      return tx;
    } catch (error) {
      console.log(error);
    }
  },
};

export { config };
