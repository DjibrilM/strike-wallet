import crypto from "crypto-es";
import { WordArray } from "crypto-es/lib/core";

class Crypto {
  static encrypt({
    key,
    message,
    providedSalt,
    providedIv,
  }: {
    key: string;
    message: string;
    providedSalt?: WordArray;
    providedIv?: WordArray;
  }) {
    try {
      const iv = providedIv ? providedIv : crypto.lib.WordArray.random(16);
      const salt = providedSalt
        ? providedSalt
        : crypto.lib.WordArray.random(16);

      const encrypted = crypto.AES.encrypt(message, key, { salt, iv });

      return {
        salt: salt.toString(crypto.enc.Hex),
        iv: iv.toString(crypto.enc.Hex),
        wordArrayEncryptedMessage: encrypted.ciphertext,
        encryptedMessage: encrypted.ciphertext?.toString(crypto.enc.Hex),
      };
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static decrypt({
    encryptedMessage,
    key,
    iv,
    salt,
  }: {
    encryptedMessage: string;
    key: WordArray | string;
    iv: WordArray;
    salt: WordArray;
  }) {
    try {
      const decryptionKey = crypto.enc.Hex.parse(key as string);
      const decipher = crypto.AES.decrypt(
        { ciphertext: crypto.enc.Hex.parse(encryptedMessage) },
        decryptionKey,
        {
          salt,
          iv,
        }
      );

      return decipher.toString(crypto.enc.Hex);
    } catch (error) {
      console.log(error);
      console.log("Failed to decipher the encrypted message 🥵");
    }
  }

  static compare({
    key,
    message,
    encryptedMessage,
    salt,
    iv,
  }: {
    key: string;
    message: string;
    encryptedMessage: string;
    salt: WordArray;
    iv: WordArray;
  }) {
    return (
      this.encrypt({
        key,
        message: message,
        providedIv: iv,
        providedSalt: salt,
      }).encryptedMessage === encryptedMessage
    );
  }

  static stringToWordArray(string: string) {
    // Convert the string to a UTF-8 encoded word array
    const wordArray = crypto.enc.Utf8.parse(string);

    // Extract the word array from the word array object
    const extractedWordArray = wordArray.words;

    return extractedWordArray;
  }
}

export default Crypto;
