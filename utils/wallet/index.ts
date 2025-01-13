import { generateMnemonic, mnemonicToSeed, validateMnemonic } from "bip39";
import "@ethersproject/shims";
import { ethers, HDNodeWallet, Mnemonic } from "ethers";


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
  const HD = ethers.HDNodeWallet.fromSeed(seed as any);
  return HD;
};

export const createWalletKeyPairFromMnemonic = async (
  mnemonic: string
): Promise<HDNodeWallet> => {
  const HD = ethers.HDNodeWallet.fromPhrase(mnemonic);
  return HD;
};

export const checkMnemonicValidity = (mnemonicPhrase: string) => {
  return validateMnemonic(mnemonicPhrase);
};
