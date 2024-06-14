import { useAppStateStore } from "../../states/appState";
import LockeScreen from "../../screens/Auth/LockeScreen";
import Visible from "../Common/Visibility";

import React from "react";

const LockCheckerScreen = ({ children }: { children: React.ReactNode }) => {
  const { isApplicationLocked } = useAppStateStore();

  return (
    <>
      <Visible condition={isApplicationLocked}>
        <LockeScreen />
      </Visible>

      <Visible condition={!isApplicationLocked}>{children}</Visible>
    </>
  );
};

export default LockCheckerScreen;
