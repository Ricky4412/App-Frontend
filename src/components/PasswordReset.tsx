import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import api from '../../services/api';

type PasswordResetRouteProp = RouteProp<{ params: { token?: string } }, 'params'>;

const PasswordReset: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<PasswordResetRouteProp>();
  const token = route.params?.token;

  const handleSendResetLink = async () => {
    setLoading(true);
    try {
      await api.post('/api/auth/request-reset', { email });
      Alert.alert('Success', 'Reset link sent to your email');
      setErrorMessage('');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
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
    setLoading(true);
    try {
      await api.post('/api/auth/reset-password', { token, password: newPassword });
      Alert.alert('Success', 'Your password has been updated.');
      navigation.navigate('Login');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validatePassword = (password: string) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return regex.test(password);
  };

  return (
    <View style={styles.container}>
      {!token ? (
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
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Send Reset Link" onPress={handleSendResetLink} />
          )}
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
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Update Password" onPress={handleUpdatePassword} />
          )}
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
