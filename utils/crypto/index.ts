import crypto from "crypto-es";
import { WordArray } from "crypto-es/lib/core";

class Crypto {
  static deriveKey(passphrase: string, salt: WordArray, keyLength = 32) {
    try {
      console.log("something");
      const key = crypto.PBKDF2(passphrase, salt, { keySize: keyLength });
      return key;
    } catch (error) {
      console.error("Key derivation failed:", error);
      throw error;
    }
  }

  static encrypt({
    message,
    providedSalt,
    providedIV,
  }: {
    message: string;
    providedSalt?: WordArray;
    providedIV?: WordArray;
  }) {
    try {
      const iv = providedIV ? providedIV : crypto.lib.WordArray.random(16);
      const salt = providedSalt
        ? providedSalt
        : crypto.lib.WordArray.random(16);

      const encrypted = crypto.AES.encrypt(message, iv, {
        salt: salt,
        iv: iv,
      });

      return {
        encryptedMessage: encrypted.ciphertext?.toString(crypto.enc.Hex),
        iv: iv.toString(crypto.enc.Hex),
        salt: salt.toString(crypto.enc.Hex),
      }; //return the encypted message, the IV(initialization vector) the salt and the authTag
    } catch (error: any) {
      throw new Error(error);
    }
  }

  static decrypt(encryptedMessage: string, key: WordArray, iv: WordArray) {
    try {
      const decipher = crypto.AES.decrypt(encryptedMessage, key, {
        iv: iv,
      });

      return decipher;
    } catch (error) {
      console.log(error);
      console.log("Failed to decipher the encrypted message 🥵");
    }
  }

  static compare(
    message: string,
    iv: WordArray,
    salt: WordArray,
    encryptedMessage: string
  ) {
    return (
      this.encrypt({
        providedIV: iv,
        message: message,
        providedSalt: salt,
      }).encryptedMessage === encryptedMessage
    );
  }
}

export default Crypto;
