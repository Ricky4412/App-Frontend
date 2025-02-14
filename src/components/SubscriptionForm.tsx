import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createSubscription } from '../../services/subscriptionService';

type SubscriptionFormRouteProp = RouteProp<{ params: { bookId: string } }, 'params'>;

const SubscriptionForm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SubscriptionFormRouteProp>();
  const { bookId } = route.params;

  const [plan, setPlan] = useState<string>('15 Days'); // Default to 15 Days
  const [price, setPrice] = useState<number>(0); // Price will be set based on plan
  const [duration, setDuration] = useState<number>(15); // Default to 15 days

  const handlePlanChange = (selectedPlan: string) => {
    if (selectedPlan === '15 Days') {
      setPlan('15 Days');
      setPrice(10); // Example price for 15 days
      setDuration(15);
    } else if (selectedPlan === '30 Days') {
      setPlan('30 Days');
      setPrice(20); // Example price for 30 days (2x the 15 days price)
      setDuration(30);
    }
  };

  const handleSubmit = async () => {
    const subscriptionData = { bookId, plan, price, duration };

    try {
      await createSubscription(subscriptionData);
      navigation.navigate('PaymentScreen', { bookId, price });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Subscription Plan</Text>
      <Button title="15 Days - $10" onPress={() => handlePlanChange('15 Days')} />
      <Button title="30 Days - $20" onPress={() => handlePlanChange('30 Days')} />
      <Text>Selected Plan: {plan}</Text>
      <Text>Price: ${price}</Text>
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SubscriptionForm;
