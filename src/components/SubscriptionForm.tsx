import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createSubscription } from '../../services/subscriptionService';

type SubscriptionFormRouteProp = RouteProp<{ params: { bookId: string } }, 'params'>;

const SubscriptionForm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SubscriptionFormRouteProp>();
  const { bookId } = route.params;

  const [plan, setPlan] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [duration, setDuration] = useState<string>('');

  const handleSubmit = async () => {
    const subscriptionData = { bookId, plan, price: parseFloat(price), duration: parseInt(duration, 10) };

    try {
      await createSubscription(subscriptionData);
      navigation.navigate('PaymentScreen', { bookId, price: parseFloat(price) });
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Subscription Plan</Text>
      <TextInput
        style={styles.input}
        placeholder="Plan"
        value={plan}
        onChangeText={setPlan}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Duration (days)"
        value={duration}
        onChangeText={setDuration}
        keyboardType="numeric"
      />
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default SubscriptionForm;