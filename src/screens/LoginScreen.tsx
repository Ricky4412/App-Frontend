import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';
import { login } from '../../services/authService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen: React.FC = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await login(email, password);
      const { role } = response.user;
      await AsyncStorage.setItem('authToken', response.token); // Save the token
      Alert.alert('Login successful', `Welcome, ${response.user.name}`);
      if (role === 'admin') {
        navigation.navigate('Admin');
      } else {
        navigation.navigate('Main');
      }
    } catch (error: any) {
      Alert.alert('Login failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/LoginPic.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.heading}>Welcome to JEM</Text>
        <InputField
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
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
        {loading ? (
          <ActivityIndicator size="large" color="#fff" />
        ) : (
          <CustomButton title="Login" onPress={handleLogin} style={styles.loginButton} />
        )}
        <Text style={styles.registerPrompt}>
          Don't have an account?{' '}
          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate('RegisterScreen')}
          >
            Register
          </Text>
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
  loginButton: {
    marginTop: 20,
    backgroundColor: 'tomato',
    borderRadius: 10,
    padding: 10,
  },
  registerPrompt: {
    marginTop: 20,
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
  registerText: {
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

export default LoginScreen;
