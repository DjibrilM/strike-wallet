import { useCallback } from "react";
import { ALERT_TYPE, Toast, Dialog } from "react-native-alert-notification";

interface NotificationConfig {
  message: string;
  type: ALERT_TYPE;
  title: string;
}

const useDialogue = () => {
  const showToast = useCallback(
    ({ message, type, title }: NotificationConfig) => {
      Toast.show({
        titleStyle: { fontSize: 12, marginBottom: 4, color: "#1e293b" },
        textBodyStyle: { color: "#475569" },
        type: type,
        title: title,
        textBody: message,
      });
    },
    []
  );

  const showDialogue = useCallback(
    ({
      message,
      type,
      title,
      onPressButton,
      buttonLabel,
    }: NotificationConfig & {
      buttonLabel: string;
      onPressButton: () => void;
    }) => {
      Dialog.show({
        type: type,
        title: title,
        textBody: message,
        onPressButton: () => onPressButton(),
        button: buttonLabel,
      });
    },
    []
  );

  return { showToast, showDialogue };
};

export default useDialogue;
