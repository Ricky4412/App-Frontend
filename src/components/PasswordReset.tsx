import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import api from '../../services/api';

type PasswordResetRouteProp = RouteProp<{ params: { token?: string } }, 'params'>;

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [step, setStep] = useState(1);
  const navigation = useNavigation();
  const route = useRoute<PasswordResetRouteProp>();
  const token = route.params?.token;

  const handleSendResetLink = async () => {
    try {
      await api.post('/auth/request-reset', { email });
      Alert.alert('Success', 'Reset link sent to your email');
      setStep(2);
    } catch (error: any) {
      setErrorMessage('Failed to send reset link. Please try again.');
    }
  };

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }
    if (!validatePassword(newPassword)) {
      setErrorMessage('Password must be at least 8 characters and include alphabets, numbers, and symbols.');
      return;
    }
    try {
      await api.post('/auth/reset-password', { token, password: newPassword });
      Alert.alert('Success', 'Your password has been updated.');
      navigation.navigate('Login');
    } catch (error: any) {
      setErrorMessage('Failed to update password. Please try again.');
    }
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  return (
    <View style={styles.container}>
      {step === 1 ? (
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your email address"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <Button title="Send Reset Link" onPress={handleSendResetLink} />
        </>
      ) : (
        <>
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
          <Button title="Update Password" onPress={handleUpdatePassword} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default PasswordReset;
