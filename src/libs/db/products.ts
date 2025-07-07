import { Program } from "@coral-xyz/anchor";
import { Cassegrain } from "../program/cassegrain";
import { pdaGen } from "./pda";
import { PublicKey, SystemProgram } from "@solana/web3.js";

const productCategory = [
  "electronics",
  "automotive",
  "pharmaceuticals",
  "food",
  "textiles",
  "luxury",
  "industrial",
  "other",
];

type ProductCategory = (typeof productCategory)[number];

const products = {
  getProducts: async (programClass: Program<Cassegrain>) => {
    const products = await programClass.account.productBatch.all();
    return products;
  },
  registerBatch: async (
    programClass: Program<Cassegrain>,
    productBatch: {
      metadataIpfs: string;
      batchSize: number;
      user: PublicKey;
      productCategory: ProductCategory;
    }
  ) => {
    const batchId = Array.from(crypto.getRandomValues(new Uint8Array(32)));

    const batchPDA = pdaGen.batch(batchId, programClass);
    const manufacturer = pdaGen.manufacturer(productBatch.user, programClass);
    const configPDA = pdaGen.config();
    const authority = pdaGen.authority();

    const tx = await programClass.methods
      .registerProductBatch(
        Array.from(batchId),
        productBatch.metadataIpfs,
        { [productBatch.productCategory]: {} }, // ProductCategory::Electronics
        productBatch.batchSize
      )
      .accountsPartial({
        signer: productBatch.user,
        authority: authority,
        productBatch: batchPDA,
        cassegrainConfig: configPDA,
        manufacturer: manufacturer,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    return tx;
  },

  trackProduct: async () => {},
};

export { products };
