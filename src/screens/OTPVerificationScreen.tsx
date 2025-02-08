import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { verifyOtp } from '../../services/authService';

type OTPVerificationScreenRouteProp = RouteProp<{ params: { userId: string; role: string; nextScreen?: string } }, 'params'>;

const OTPVerificationScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<OTPVerificationScreenRouteProp>();
  const { userId, role, nextScreen } = route.params;
  const [otp, setOtp] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleVerifyOtp = async () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter the OTP.');
      return;
    }

    setLoading(true);
    try {
      // Verify OTP
      await verifyOtp(userId, otp);

      // Provide feedback to the user
      Alert.alert('Success', 'OTP verified successfully');

      // Navigate based on user role or next screen
      if (nextScreen) {
        navigation.navigate(nextScreen, { userId });
      } else if (role === 'admin') {
        navigation.navigate('Admin');
      } else {
        navigation.navigate('Main');
      }
    } catch (error: any) {
      Alert.alert('Verification failed', error.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Enter OTP</Text>
      <TextInput
        style={styles.input}
        placeholder="OTP"
        value={otp}
        onChangeText={setOtp}
        keyboardType="numeric"
        autoCapitalize="none"
      />
      <CustomButton title="Verify OTP" onPress={handleVerifyOtp} loading={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

export default OTPVerificationScreen;
