import { useCallback } from "react";
import { useAppStateStore } from "../../states/appStatus";

const useLockScreen = () => {
  const {
    hasApplicationUnlocked,
    isApplicationLocked,
    unlockApplication,
    authenticate,
    updateCurrentApplicationState,
    clearSuccessCallBackFunction,
    updateLockState,
    successCallBackFunction,
  } = useAppStateStore();

  const authenticateFn = useCallback((successCallback: Function) => {
    authenticate(successCallback);
  }, []);

  return {
    hasApplicationUnlocked,
    isApplicationLocked,
    unlockApplication,
    authenticateFn,
    updateCurrentApplicationState,
    clearSuccessCallBackFunction,
    successCallBackFunction,
    updateLockState,
  };
};

export default useLockScreen;
