import api from './api';

export const getNotifications = async (): Promise<any[]> => {
  try {
    const response = await api.get('/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw new Error('Failed to fetch notifications. Please try again later.');
  }
};

export const markNotificationAsRead = async (id: string): Promise<any> => {
  try {
    const response = await api.put(`/notifications/${id}/read`);
    return response.data;
  } catch (error) {
    console.error(`Error marking notification ${id} as read:`, error);
    throw new Error('Failed to mark notification as read. Please try again later.');
  }
};

export const markAllNotificationsAsRead = async (): Promise<any> => {
  try {
    const response = await api.put('/notifications/markAllAsRead');
    return response.data;
  } catch (error) {
    console.error('Error marking all notifications as read:', error);
    throw new Error('Failed to mark all notifications as read. Please try again later.');
  }
};

export const getUnreadNotificationCount = async (): Promise<number> => {
  try {
    const response = await api.get('/notifications/unreadCount');
    return response.data.count;
  } catch (error) {
    console.error('Error fetching unread notification count:', error);
    throw new Error('Failed to fetch unread notification count. Please try again later.');
  }
};