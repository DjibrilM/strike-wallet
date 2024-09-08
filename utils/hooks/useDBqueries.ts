import { useCallback, useContext } from "react";
import { DatabaseConnectionContext } from "../../data/connection";
import { AppWallet } from "../shared/types";

const useDBqueries = () => {
  const databaseContext = useContext(DatabaseConnectionContext);

  const getSettingCounts = useCallback(async (): Promise<number> => {
    const SettingsCount = await databaseContext.SettingsEntity?.count();
    return SettingsCount as number;
  }, []);

  const getAppSettings = useCallback(async () => {
    const configurations = await databaseContext.SettingsEntity?.find();
    return configurations![0];
  }, []);

  const getWalletData = useCallback(async (): Promise<AppWallet> => {
    const wallet = await databaseContext.WalletEntity?.find();
    return wallet![0] as AppWallet;
  }, []);

  const createWallet = useCallback(
    async ({
      privateKey,
      address,
      publicKey,
      mnemonic,
      seedPhrase,
    }: {
      privateKey: string;
      address: string;
      publicKey: string;
      mnemonic: string;
      seedPhrase: string;
    }) => {
      if (databaseContext.WalletEntity) {
        await databaseContext.WalletEntity.clear();
        const wallet = new databaseContext.WalletEntity();

        wallet.privateKey = privateKey;
        wallet.address = address;
        wallet.publicKey = publicKey;
        wallet.mnemonic = mnemonic;
        wallet.seedPhrase = seedPhrase;
        await wallet.save();
      }
    },
    []
  );

  const createSettings = useCallback(
    async ({
      password,
      allowBiomtricCrediential,
      hasConfirguredWallet,
      passwordIv,
      passwordSalt,
    }: {
      password: string;
      allowBiomtricCrediential: boolean;
      hasConfirguredWallet: boolean;
      passwordIv: string;
      passwordSalt: string;
    }) => {
      await databaseContext.SettingsEntity!.clear();
      const settings = new databaseContext.SettingsEntity!();

      settings.password = password;
      settings.AllowBiomtricCrediential = allowBiomtricCrediential;
      settings.hasConfirguredWallet = hasConfirguredWallet;
      settings.passwordIv = passwordIv;
      settings.passwordSalt = passwordSalt;
      await settings.save();
    },
    []
  );

  return {
    getSettingCounts,
    getAppSettings,
    getWalletData,
    createWallet,
    createSettings,
  };
};

export default useDBqueries;
