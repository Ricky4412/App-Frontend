import React from 'react';
import { View, StyleSheet } from 'react-native';
import NotificationIcon from './NotificationIcon';
import Greetings from './Greetings';

interface HeaderProps {
  onNotificationPress: () => void;
  username: string;
}

const Header: React.FC<HeaderProps> = ({ onNotificationPress, username }) => {
  return (
    <View style={styles.header}>
      <Greetings username={username} />
      <NotificationIcon onPress={onNotificationPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});

export default Header;