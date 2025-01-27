import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUserProfile, getActivityLog } from '../../services/profileService';
import CustomButton from '../components/CustomButton';
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';
import avatar5 from '../../assets/avatar5.jpg'

const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const [profile, setProfile] = useState<any>(null);
  const [activityLog, setActivityLog] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingProfile, setEditingProfile] = useState<boolean>(false);
  const [changingPassword, setChangingPassword] = useState<boolean>(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await getUserProfile();
        const activityData = await getActivityLog();
        setProfile(profileData);
        setActivityLog(activityData);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileImagePress = () => {
    navigation.navigate('EditProfile');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (editingProfile) {
    return <EditProfile />;
  }

  if (changingPassword) {
    return <ChangePassword />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <TouchableOpacity onPress={handleProfileImagePress}>
          <Image source={profile?.profilePicture ? { uri: profile.profilePicture } : avatar5} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.profileName}>{profile?.name}</Text>
        <Text style={styles.profileEmail}>{profile?.email}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <CustomButton title="Edit Profile" onPress={() => setEditingProfile(true)} />
        <CustomButton title="Change Password" onPress={() => setChangingPassword(true)} />
      </View>
      <View style={styles.sectionsContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Activity Log</Text>
          {activityLog.length > 0 ? (
            activityLog.map((activity, index) => (
              <View key={index} style={styles.activityItem}>
                <Text>{activity.action}</Text>
                <Text>{new Date(activity.timestamp).toLocaleString()}</Text>
              </View>
            ))
          ) : (
            <Text>No activities found.</Text>
          )}
        </View>
        <View style={styles.bookmarksSection}>
          <Text style={styles.sectionTitle}>Bookmarks</Text>
          <Text>No notes yet</Text>

        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileEmail: {
    fontSize: 18,
    color: 'gray',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sectionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  section: {
    flex: 1,
    marginRight: 10,
  },
  bookmarksSection: {
    flex: 1,
    marginLeft: 60,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  activityItem: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default ProfileScreen;