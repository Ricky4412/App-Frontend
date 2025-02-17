import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Correct import

const NotificationIcon = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.iconContainer} onPress={onPress}>
      <MaterialIcons name="notifications" size={24} color="#000" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    padding: 10,
  },
});

export default NotificationIcon;
