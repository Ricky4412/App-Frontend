import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from 'react-native-vector-icons';

interface NotificationIconProps {
  onPress: () => void;
}

const NotificationIcon: React.FC<NotificationIconProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
      <MaterialIcons name="notifications" size={24} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 20,
  },
});

export default NotificationIcon;