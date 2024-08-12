import { createContext, useLayoutEffect, useState } from "react";
import { DataSource } from "typeorm";
import { WalletEntity } from "./wallet/wallet.entity";
import * as SQLite from "expo-sqlite/legacy";
import { Settings } from "./settings/settings";

interface Entities {
  WalletEntity: typeof WalletEntity | null | undefined;
  SettingsEntity: typeof Settings | null | undefined;
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
        entities: [Settings, WalletEntity],
        synchronize: true,
      });

      await dataSource.initialize();
      setEntities({
        SettingsEntity: Settings,
        WalletEntity: WalletEntity,
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
        SettingsEntity: entities?.SettingsEntity,
        WalletEntity: entities?.WalletEntity,
      }}
    >
      {entities && children}
    </DatabaseConnectionContext.Provider>
  );
};

export default DatabaseConnectionProvider;
