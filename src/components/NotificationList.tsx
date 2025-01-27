import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Button } from 'react-native';
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  getUnreadNotificationCount,
} from '../../services/notificationService';

interface Notification {
  _id: string;
  message: string;
  timestamp: string;
  read: boolean;
}

const NotificationList: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        setNotifications(data);
        const count = await getUnreadNotificationCount();
        setUnreadCount(count);
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleMarkAsRead = async (id: string) => {
    try {
      await markNotificationAsRead(id);
      setNotifications(notifications.map((notification) =>
        notification._id === id ? { ...notification, read: true } : notification
      ));
      setUnreadCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error('Failed to mark notification as read', error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications(notifications.map((notification) => ({ ...notification, read: true })));
      setUnreadCount(0);
    } catch (error) {
      console.error('Failed to mark all notifications as read', error);
    }
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity onPress={() => handleMarkAsRead(item._id)}>
      <View style={[styles.notification, item.read ? styles.read : styles.unread]}>
        <Text style={styles.message}>{item.message}</Text>
        <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
        {!item.read && <Text style={styles.unreadText}>Unread</Text>}
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        <Text style={styles.unreadCount}>Unread: {unreadCount}</Text>
        <Button title="Mark All as Read" onPress={handleMarkAllAsRead} />
      </View>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  unreadCount: {
    fontSize: 16,
    color: '#ff0000',
  },
  notification: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    borderRadius: 5,
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
  },
  unread: {
    backgroundColor: '#ffe6e6',
  },
  read: {
    backgroundColor: '#e6ffe6',
  },
  unreadText: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default NotificationList;