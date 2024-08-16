
import LockeScreen from "../../screens/Auth/LockeScreen";
import useLockScreen from "../../utils/hooks/useLockScreen";
import React from "react";

const LockCheckerScreen = ({
  children,
  enableLockScreen,
}: {
  children: React.ReactNode;
  enableLockScreen: boolean;
}) => {
  const { isApplicationLocked, hasApplicationUnlocked } = useLockScreen();

  return (
    <>
      <LockeScreen visible={isApplicationLocked && enableLockScreen} />
      {hasApplicationUnlocked && children}
    </>
  );
};

export default LockCheckerScreen;
