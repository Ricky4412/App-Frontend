import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ImageBackground, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { register, sendOtp } from '../../services/authService';

const RegisterScreen: React.FC = () => {
  const navigation = useNavigation();
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [telephone, setTelephone] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Registration failed', 'Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      // Register the user and send OTP
      const response = await register(name, email, telephone, password);
      await sendOtp(email);

      // Navigate to OTP verification screen
      navigation.navigate('OTPVerificationScreen', { userId: response.user._id, role: response.user.role });
    } catch (error: any) {
      if (error.response && error.response.data.message === 'User already exists') {
        Alert.alert('Registration failed', 'Email is already registered. Please use a different email or log in.');
      } else {
        Alert.alert('Registration failed', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/login2.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>Register</Text>
        <InputField
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#ccc"
          style={[styles.inputField, styles.textInput]}
        />
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#ccc"
          style={[styles.inputField, styles.textInput]}
        />
        <InputField
          placeholder="Telephone"
          value={telephone}
          onChangeText={setTelephone}
          keyboardType="phone-pad"
          placeholderTextColor="#ccc"
          style={[styles.inputField, styles.textInput]}
        />
        <InputField
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#ccc"
          style={[styles.inputField, styles.textInput]}
        />
        <InputField
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#ccc"
          style={[styles.inputField, styles.textInput]}
        />
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <CustomButton title="Register" onPress={handleRegister} style={styles.button} />
        )}
        <Text
          style={styles.loginText}
          onPress={() => navigation.navigate('Login')}
        >
          Already have an account? <Text style={styles.loginLink}>Login</Text>
        </Text>
      </View>
      <Text style={styles.footer}>Powered by Pempamsie</Text>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'sans-serif-condensed',
  },
  inputField: {
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    height: 50,
    fontSize: 16,
    paddingHorizontal: 10,
  },
  textInput: {
    color: '#ccc',
  },
  button: {
    marginTop: 20,
    backgroundColor: 'tomato',
    borderRadius: 10,
    padding: 10,
  },
  loginText: {
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  loginLink: {
    color: 'tomato',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default
