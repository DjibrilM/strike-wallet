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
  };
};

export default useLockScreen;
