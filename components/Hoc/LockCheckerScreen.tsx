import { useAppStateStore } from "../../states/appState";
import LockeScreen from "../../screens/Auth/LockeScreen";
import React from "react";

const LockCheckerScreen = ({
  children,
  enableLockScreen,
}: {
  children: React.ReactNode;
  enableLockScreen: boolean;
}) => {
  const { isApplicationLocked } = useAppStateStore();

  return (
    <>
      <LockeScreen visible={isApplicationLocked && enableLockScreen} />
      {children}
    </>
  );
};

export default LockCheckerScreen;
