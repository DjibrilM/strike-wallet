import { generateMnemonic, mnemonicToSeed } from "bip39";

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
