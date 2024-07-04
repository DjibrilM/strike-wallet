import { useAppStateStore } from "../../states/appState";
import LockeScreen from "../../screens/Auth/LockeScreen";
import Visible from "../Common/Visibility";

import React from "react";

const LockCheckerScreen = ({
  children,
  enableLockScreen,
}: {
  children: React.ReactNode;
  enableLockScreen: boolean;
}) => {
  const { isApplicationLocked } = useAppStateStore();

  return enableLockScreen ? (
    <>
      <Visible condition={isApplicationLocked}>
        <LockeScreen />
      </Visible>

      <Visible condition={!isApplicationLocked}>{children}</Visible>
    </>
  ) : (
    <>{children}</>
  );
};

export default LockCheckerScreen;
