import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

const NotificationProvider = ({ children }: { children: JSX.Element }) => {

  useEffect(() => {
    requestNotificationPermission()
  }, [])

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== 'granted') {
      await Notifications.requestPermissionsAsync();
    }
  }
  return <>{children}</>
}

export default NotificationProvider