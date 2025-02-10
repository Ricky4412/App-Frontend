import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { getUserProfile, updateUserProfile, changePassword } from '../../services/profileService';

interface Profile {
  name: string;
  email: string;
}

interface ProfileManagementProps {
  userId: string;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ userId }) => {
  const [profile, setProfile] = useState<Profile>({ name: '', email: '' });
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile(userId);
        setProfile(data);
      } catch (error) {
        console.error('Failed to fetch profile', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleUpdateProfile = async () => {
    try {
      await updateUserProfile(userId, profile);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      await changePassword(userId, password);
      Alert.alert('Success', 'Password changed successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to change password');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile Management</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={profile.name}
        onChangeText={(text) => setProfile({ ...profile, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={profile.email}
        onChangeText={(text) => setProfile({ ...profile, email: text })}
        keyboardType="email-address"
      />
      <Button title="Update Profile" onPress={handleUpdateProfile} />
      <Text style={styles.heading}>Change Password</Text>
      <TextInput
        style={styles.input}
        placeholder="New Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      <Button title="Change Password" onPress={handleChangePassword} />
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
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
});

export default ProfileManagement;
