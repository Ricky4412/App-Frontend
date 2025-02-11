import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/Header';
import SubscriptionCard from '../components/SubscriptionCard';
import LoadingSpinner from '../components/LoadingSpinner';

const subscriptionPlans = [
  { id: '1', name: '15 Days Plan', price: 5, duration: 15 },
  { id: '2', name: '30 Days Plan', price: 10, duration: 30 },
  // Add more plans if needed
];

const SubscriptionScreen: React.FC = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubscription = (plan: { name: string; price: number }) => {
    navigation.navigate('PaymentScreen', { plan });
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={subscriptionPlans}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SubscriptionCard
            plan={item}
            onPress={() => handleSubscription(item)}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
});

export default SubscriptionScreen;
