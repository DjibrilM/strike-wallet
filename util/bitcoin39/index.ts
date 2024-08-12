import { generateMnemonic, mnemonicToSeed } from "bip39";
import "@ethersproject/shims";
import { ethers, HDNodeWallet } from "ethers";

export const createMnemonic = async () => {
  const mnemonic = generateMnemonic();
  const seed = await mnemonicToSeed(mnemonic);

  return {
    mnemonicCompactedString: mnemonic.split(" ").join(""),
    mnemonicArray: mnemonic.split(" "),
    mnemonicSeparatedString: mnemonic,
    seed: seed,
  };
};

export const createWalletKeyPair = async (
  seed: Buffer
): Promise<HDNodeWallet> => {
  const HD = ethers.HDNodeWallet.fromSeed(seed);
  return HD;
};
