import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { getBookDetails } from '../../services/bookService';
import { createSubscription } from '../../services/subscriptionService';

// Define the route prop type
type SubscriptionFormRouteProp = RouteProp<{ params: { bookId: string; email: string } }, 'params'>;

const SubscriptionForm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<SubscriptionFormRouteProp>();
  const { bookId, email } = route.params;

  const [book, setBook] = useState<any>(null);
  const [plan, setPlan] = useState<string>('15 Days');
  const [price, setPrice] = useState<number>(0);
  const [duration, setDuration] = useState<number>(15);
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [serviceProvider, setServiceProvider] = useState<string>('MTN');
  const [accountName, setAccountName] = useState<string>('');

  // Fetch book details
  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        const bookData = await getBookDetails(bookId);
        setBook(bookData);
        setPrice(bookData.price);
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    };

    fetchBookDetails();
  }, [bookId]);

  // Handle plan selection
  const handlePlanChange = (selectedPlan: string) => {
    if (!book) return;
    const updatedDuration = selectedPlan === '15 Days' ? 15 : 30;
    const updatedPrice = book.price * (updatedDuration / 15);
    
    setPlan(selectedPlan);
    setDuration(updatedDuration);
    setPrice(updatedPrice);
  };

  // Handle form submission
  const handleSubmit = useCallback(async () => {
    if (!mobileNumber || !accountName) {
      Alert.alert('Error', 'Please fill in all details.');
      return;
    }

    const subscriptionData = { bookId, plan, price, duration, mobileNumber, serviceProvider, accountName, email };

    try {
      await createSubscription(subscriptionData);
      navigation.navigate('PaymentScreen', { bookId, price, mobileNumber, serviceProvider, accountName, email });
    } catch (error: any) {
      Alert.alert('Subscription Error', error.response?.data?.message || error.message);
    }
  }, [bookId, plan, price, duration, mobileNumber, serviceProvider, accountName, email, navigation]);

  if (!book) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Choose a Subscription Plan for {book.title}</Text>
      <Button title={`15 Days - GHS ${book.price}`} onPress={() => handlePlanChange('15 Days')} />
      <Button title={`30 Days - GHS ${book.price * 2}`} onPress={() => handlePlanChange('30 Days')} />
      <Text>Selected Plan: {plan}</Text>
      <Text>Price: GHS {price}</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Money Number"
        value={mobileNumber}
        onChangeText={setMobileNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Account Name"
        value={accountName}
        onChangeText={setAccountName}
      />
      <Button title="Proceed to Payment" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  heading: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingHorizontal: 10 },
});

export default SubscriptionForm;
