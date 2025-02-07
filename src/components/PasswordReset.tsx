import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

const PasswordReset: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // ✅ Extract token from React Navigation route params
    if (route.params?.token) {
      setToken(route.params.token as string);
    }
  }, [route.params]);

  const handleSendResetLink = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      await api.post('/api/auth/request-reset', { email });
      Alert.alert('Success', 'A password reset link has been sent to your email.');
    } catch (error: any) {
      setErrorMessage(error.response?.data?.message || 'Failed to send reset link. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!token) {
      setErrorMessage('Invalid or expired reset link. Please request a new one.');
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
      // ✅ Fixed: Sending token inside the request body (not the URL)
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
          <Text style={styles.label}>Enter your email to receive a reset link:</Text>
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
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <Button title="Send Reset Link" onPress={handleSendResetLink} />
          )}
        </>
      ) : (
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
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    textAlign: 'center',
  },
});

export default PasswordReset;
