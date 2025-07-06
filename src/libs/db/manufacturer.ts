import { PublicKey, SystemProgram } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import type { Cassegrain } from "../program/cassegrain";
import { pdaGen } from "./pda";

const manufacturer = {
  register: async (
    manufacturer: {
      pubkey: PublicKey;
      companyName: string;
      certifications: string;
      role: string;
    },
    program: Program<Cassegrain>
  ) => {
    try {
      const configPda = pdaGen.config();
      const manufacturerPda = pdaGen.manufacturer(manufacturer.pubkey, program);

      // Check if manufacturer already exists
      try {
        const manufacturerAccount = await program.account.manufacturerProfile.fetch(
          manufacturerPda
        );
        console.log("Manufacturer already exists:", manufacturerAccount);
        return manufacturerAccount;
      } catch (error) {
        // Manufacturer doesn't exist, proceed with registration
        console.log("Creating new manufacturer account...", error);
      }

      // Use program.rpc() to automatically handle wallet signing
      const txHash = await program.methods
        .registerManufacturer(
          manufacturer.companyName,
          { manufacturer: {} }, // BusinessType::Manufacturer
          manufacturer.certifications
        )
        .accountsPartial({
          signer: manufacturer.pubkey,
          authority: new PublicKey("J4s3z9VPTdKspam9LN5pbQkt5qM5iuK4KCFvdCK6QcjW"),
          manufacturer: manufacturerPda,
          cassegrainConfig: configPda,
          systemProgram: SystemProgram.programId,
        })
        .rpc();

      console.log("Transaction hash:", txHash);
      return txHash;
    } catch (error) {
      console.error("Error in manufacturer registration:", error);
      throw error;
    }
  },

  manufacturerDetails: async (
    pubkey: PublicKey,
    program: Program<Cassegrain>
  ) => {
    const manufacturerPda = pdaGen.manufacturer(pubkey, program);
    try {
      const manufacturerAccount =
        await program.account.manufacturerProfile.fetch(manufacturerPda);
      return manufacturerAccount;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  manufacturerProducts: async (
    pubkey: PublicKey,
    program: Program<Cassegrain>
  ) => {
    const manufacturerPda = pdaGen.manufacturer(pubkey, program);
    try {
      const products = await program.account.productBatch.all();

      const prod = products.filter(
        (product) =>
          product.account.manufacturer.toString() === manufacturerPda.toString()
      );

      return prod;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export { manufacturer };
