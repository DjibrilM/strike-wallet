import { useCallback, useContext } from "react";
import { DatabaseConnectionContext } from "../../data/connection";
import { AppWallet, MoralisToken } from "../shared/types";

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

  const getTokens = async () => {
    return await databaseContext.tokenEntity!.find();
  }

  const addToken = async (token:MoralisToken) => {
    const newToken = new databaseContext.tokenEntity!();
    newToken.contract_address = token.contract_address;
    newToken.token_symbol = token.token_symbol;
    newToken.token_logo = token.token_logo;
    newToken.token_decimals = token.token_decimals;
    newToken.price_usd = token.price_usd;
    newToken.price_24h_percent_change = token.price_24h_percent_change;
    newToken.price_7d_percent_change = token.price_7d_percent_change;
    newToken.market_cap_usd = token.market_cap_usd;
    newToken.token_name = token.token_name;

   await newToken.save()
  }

  return {
    getSettingCounts,
    getAppSettings,
    getWalletData,
    createWallet,
    createSettings,
    getTokens,
    addToken,
  };
};

export default useDBqueries;
