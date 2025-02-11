import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface SubscriptionCardProps {
  plan: {
    name: string;
    price: number;
    duration: number;
  };
  onPress: () => void;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({ plan, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.details}>
        <Text style={styles.title}>{plan.name}</Text>
        <Text style={styles.price}>{plan.price} GHS</Text>
        <Text style={styles.duration}>{plan.duration} days</Text>
      </View>
    </TouchableOpacity>
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
  details: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  duration: {
    fontSize: 12,
    color: '#aaa',
  },
});

export default SubscriptionCard;
