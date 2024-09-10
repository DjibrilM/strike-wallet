import { createContext, useLayoutEffect, useState } from "react";
import { DataSource } from "typeorm";

import * as SQLite from "expo-sqlite/legacy";
import { Settings } from "./Entities/settings/settings";
import { WalletEntity } from "./Entities/wallet/wallet.entity";
import { TokenEntity } from "./Entities/tokens/Tokens";

interface Entities {
  WalletEntity: typeof WalletEntity | null | undefined;
  SettingsEntity: typeof Settings | null | undefined;
  tokenEntity: typeof TokenEntity | null | undefined
}

export const DatabaseConnectionContext = createContext<Entities>(
  {} as Entities
);

const DatabaseConnectionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [entities, setEntities] = useState<Entities>();
  const connect = async () => {
    try {
      const dataSource = new DataSource({
        type: "expo",
        database: "strikeWallet.db",
        driver: SQLite,
        logging: false,
        entities: [Settings, WalletEntity, TokenEntity],
        synchronize: true,
      });

      await dataSource.initialize();
      setEntities({
        SettingsEntity: Settings,
        WalletEntity: WalletEntity,
        tokenEntity: TokenEntity
      });
    } catch (error) {
      console.log(error);
    }
  };

  useLayoutEffect(() => {
    connect();
  }, []);

  return (
    <DatabaseConnectionContext.Provider
      value={{
        tokenEntity: entities?.tokenEntity,
        SettingsEntity: entities?.SettingsEntity,
        WalletEntity: entities?.WalletEntity,
      }}
    >
      {entities && children}
    </DatabaseConnectionContext.Provider>
  );
};

export default DatabaseConnectionProvider;
