import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { createUser, updateUser } from '../../services/adminService';

type UserFormRouteProp = RouteProp<{ params: { userId: string; existingUser: any } }, 'params'>;

const UserForm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<UserFormRouteProp>();

  const { userId, existingUser } = route.params || {};

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  useEffect(() => {
    if (existingUser) {
      setName(existingUser.name);
      setEmail(existingUser.email);
    }
  }, [existingUser]);

  const handleSubmit = async () => {
    const userData = { name, email };

    try {
      if (userId) {
        await updateUser(userId, userData);
        Alert.alert('Success', 'User updated successfully');
      } else {
        await createUser(userData);
        Alert.alert('Success', 'User created successfully');
      }
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{userId ? 'Edit User' : 'Add User'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Button title="Submit" onPress={handleSubmit} />
      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});

export default UserForm;