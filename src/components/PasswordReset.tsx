import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, StyleSheet 
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api'

const PasswordReset: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();

  // ✅ State variables
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [userId, setUserId] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Function to send reset link
  const handleSendResetLink = async () => {
    if (!email) {
      setErrorMessage('Please enter your email.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const response = await api.post('/api/auth/request-reset', { email });
      setUserId(response.data.userId);
      setStep(2);
      Alert.alert('Success', 'A password reset OTP has been sent to your email.');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to send reset OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Function to verify OTP
  const handleVerifyOtp = async () => {
    if (!otp) {
      setErrorMessage('Please enter the OTP.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      const response = await api.post('/api/auth/verify-otp', { userId, otp });
      setStep(3);
      Alert.alert('Success', 'OTP verified successfully.');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Function to update password
  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      setErrorMessage('Please enter both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!validatePassword(newPassword)) {
      setErrorMessage('Password must be at least 8 characters and include letters, numbers, and symbols.');
      return;
    }

    setLoading(true);
    setErrorMessage('');
    try {
      await api.post(`/api/auth/reset-password`, { userId, otp, password: newPassword, confirmPassword });
      Alert.alert('Success', 'Your password has been updated.');
      navigation.navigate('Login');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // ✅ Password validation function
  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  return (
    <View style={styles.container}>
      {step === 1 && (
        <>
          <Text style={styles.label}>Enter your email to receive a reset OTP:</Text>
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleSendResetLink}>
              <Text style={styles.buttonText}>Send Reset OTP</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      {step === 2 && (
        <>
          <Text style={styles.label}>Enter the OTP sent to your email:</Text>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleVerifyOtp}>
              <Text style={styles.buttonText}>Submit OTP</Text>
            </TouchableOpacity>
          )}
        </>
      )}
      {step === 3 && (
        <>
          <Text style={styles.label}>Enter your new password:</Text>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          {loading ? (
            <ActivityIndicator size="large" color="#007bff" />
          ) : (
            <TouchableOpacity style={styles.button} onPress={handleUpdatePassword}>
              <Text style={styles.buttonText}>Update Password</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
};

// ✅ Updated Styles for better UI
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  input: {
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PasswordReset;
