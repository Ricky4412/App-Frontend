import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { initializePayment } from '../services/subscriptionService';

type RootStackParamList = {
  PaymentScreen: { bookId: string, price: number, mobileNumber: string, serviceProvider: string, accountName: string };
  PaymentSuccess: { bookId: string };
  PaymentWebView: { url: string };
};

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'PaymentScreen'>;
type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentScreen'>;

interface Props {
  route: PaymentScreenRouteProp;
  navigation: PaymentScreenNavigationProp;
}

const PaymentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { bookId, price, mobileNumber, serviceProvider, accountName } = route.params;
  const [loading, setLoading] = useState<boolean>(false);

  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await initializePayment({ email: 'user@example.com', amount: price, mobileNumber, serviceProvider, accountName });
      if (response.status && response.data.authorization_url) {
        // Redirect to Paystack payment page
        navigation.navigate('PaymentWebView', { url: response.data.authorization_url });
      } else {
        Alert.alert('Payment initialization failed', 'Please try again');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Payment error', 'An error occurred during payment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment for Subscription</Text>
      <Text>Mobile Money Number: {mobileNumber}</Text>
      <Text>Service Provider: {serviceProvider}</Text>
      <Text>Account Name: {accountName}</Text>
      <Text>Amount to Pay: GHS {price}</Text>
      <Button title="Pay Now" onPress={handlePayment} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default PaymentScreen;
