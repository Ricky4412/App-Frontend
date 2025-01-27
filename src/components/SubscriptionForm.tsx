import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createSubscription, updateSubscription } from '../../services/adminService'

type SubscriptionFormRouteProp = RouteProp<{ params: { subscriptionId: string; existingSubscription: any } }, 'params'>;

const SubscriptionForm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SubscriptionFormRouteProp>();

  const { subscriptionId, existingSubscription } = route.params || {};

  const [user, setUser] = useState<string>('');
  const [plan, setPlan] = useState<string>('');

  useEffect(() => {
    if (existingSubscription) {
      setUser(existingSubscription.user);
      setPlan(existingSubscription.plan);
    }
  }, [existingSubscription]);

  const handleSubmit = async () => {
    const subscriptionData = { user, plan };

    try {
      if (subscriptionId) {
        await updateSubscription(subscriptionId, subscriptionData);
        alert('Subscription updated successfully');
      } else {
        await createSubscription(subscriptionData);
        alert('Subscription created successfully');
      }
      navigation.goBack();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{subscriptionId ? 'Edit Subscription' : 'Add Subscription'}</Text>
      <TextInput
        style={styles.input}
        placeholder="User"
        value={user}
        onChangeText={setUser}
      />
      <TextInput
        style={styles.input}
        placeholder="Plan"
        value={plan}
        onChangeText={setPlan}
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