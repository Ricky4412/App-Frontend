import React, { useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';
import store from './store';
import * as Notifications from 'expo-notifications';
import registerForPushNotificationsAsync from './src/utils/registerForPushNotifications';

const App: React.FC = () => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>('');
  const [notification, setNotification] = useState<Notifications.Notification | boolean>(false);
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  useEffect(() => {
    // Register for push notifications
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
    // Listener for receiving notifications
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // Listener for notification responses
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    // Cleanup listeners on unmount
    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(notificationListener.current);
      }
      if (responseListener.current) {
        Notifications.removeNotificationSubscription(responseListener.current);
      }
    };
  }, []);

  return (
    <Provider store={store}>
      <View style={styles.container}>
        <AppNavigator />
      </View>
    </Provider>
  );
};

// Styles for the container
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default App;
