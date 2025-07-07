import { Program } from "@coral-xyz/anchor";
import { Cassegrain } from "../program/cassegrain";

const products = {
  getProducts: async (programClass: Program<Cassegrain>) => {
    const products = await programClass.account.productBatch.all();
    return products;
  },
  registerBatch: async () => {},

  trackProduct: async () => {},
};

export { products };
