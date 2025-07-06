import { PublicKey } from "@solana/web3.js";
import { Program } from "@coral-xyz/anchor";
import type { Cassegrain } from "../program/cassegrain";

const pdaGen = {
  config: () => {
    // const address = "H8V5uaaYwJuStC31J7oMKEYynoBa6g7nv6tVijiG27By";
    const address = "Bsj4HpH7J5NxHNK5yQQVFgs4DTC8hYs9z68QMPRfy26t";

    // const address = "7gyjmugBPxx93NvdegiKz8JHeAaRYC8EbeFFuogWB9zX";
    return new PublicKey(address);
  },
  configNew: (pubkey: PublicKey, program: Program<Cassegrain>) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("config"), pubkey.toBuffer()],
      program.programId
    )[0];
  },
  manufacturer: (pubkey: PublicKey, program: Program<Cassegrain>) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("manufacturer"), pubkey.toBuffer()],
      program.programId
    )[0];
  },
  batch: (batchId: string, program: Program<Cassegrain>) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("batch"), Buffer.from(batchId)],
      program.programId
    )[0];
  },
  event: (eventId: string, program: Program<Cassegrain>) => {
    return PublicKey.findProgramAddressSync(
      [Buffer.from("event"), Buffer.from(eventId)],
      program.programId
    )[0];
  },
};

export { pdaGen };
