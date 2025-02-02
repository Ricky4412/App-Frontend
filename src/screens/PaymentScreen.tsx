import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  PaymentScreen: { plan: { name: string; price: number } };
  OTPVerificationScreen: { email: string; phoneNumber: string };
};

type PaymentScreenRouteProp = RouteProp<RootStackParamList, 'PaymentScreen'>;
type PaymentScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentScreen'>;

interface Props {
  route: PaymentScreenRouteProp;
  navigation: PaymentScreenNavigationProp;
}

const PaymentScreen: React.FC<Props> = ({ route, navigation }) => {
  const { plan } = route.params;
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/pay', {
        email,
        amount: plan.price,
        currency: 'GHS',
        phone_number: phoneNumber,
      });
      const { data } = response;
      if (data.ResponseCode === '0000') {
        navigation.navigate('OTPVerificationScreen', { email, phoneNumber });
      } else {
        Alert.alert('Payment failed', 'Please try again');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Payment error', 'An error occurred during payment');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment for {plan.name}</Text>
      <Text>Email:</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="Enter your email"
        style={styles.input}
      />
      <Text>Phone Number:</Text>
      <TextInput
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter phone number"
        style={styles.input}
      />
      <Button title="Pay Now" onPress={handlePayment} />
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
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default PaymentScreen;