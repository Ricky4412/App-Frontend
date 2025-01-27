import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Activity {
  action: string;
  timestamp: string;
}

interface ActivityCardProps {
  activity: Activity;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.action}>{activity.action}</Text>
      <Text style={styles.timestamp}>{new Date(activity.timestamp).toLocaleString()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  action: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default ActivityCard;