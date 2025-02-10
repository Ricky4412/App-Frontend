import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUsers, deleteUser } from '../../services/adminService'

interface User {
  _id: string;
  name: string;
  email: string;
}

const ManageUsers: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Failed to fetch users', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user');
    }
  };

  const handleBulkDelete = async () => {
    try {
      await Promise.all(selectedUsers.map((userId) => deleteUser(userId)));
      setUsers(users.filter((user) => !selectedUsers.includes(user._id)));
      setSelectedUsers([]);
    } catch (error) {
      Alert.alert('Error', 'Failed to delete selected users');
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedUsers((prevSelected) => {
      if (prevSelected.includes(userId)) {
        return prevSelected.filter((id) => id !== userId);
      } else {
        return [...prevSelected, userId];
      }
    });
  };

  const renderUserItem = ({ item }: { item: User }) => (
    <View style={styles.item}>
      <Text>{item.name}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('UserForm', { userId: item._id, existingUser: item })}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteUser(item._id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleSelectUser(item._id)}>
          <Text style={selectedUsers.includes(item._id) ? styles.selected : styles.unselected}>
            {selectedUsers.includes(item._id) ? 'Deselect' : 'Select'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Users</Text>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Users"
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(item) => item._id}
        renderItem={renderUserItem}
      />
      {selectedUsers.length > 0 && (
        <TouchableOpacity onPress={handleBulkDelete} style={styles.bulkDeleteButton}>
          <Text style={styles.bulkDeleteButtonText}>Delete Selected</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('AdminDashboard')}>
        <Text style={styles.backButton}>Back to Dashboard</Text>
      </TouchableOpacity>
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
  searchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  actions: {
    flexDirection: 'row',
  },
  editButton: {
    color: 'blue',
    marginRight: 10,
  },
  deleteButton: {
    color: 'red',
    marginRight: 10,
  },
  selected: {
    color: 'green',
  },
  unselected: {
    color: 'grey',
  },
  bulkDeleteButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  bulkDeleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center',
  },
});

export default ManageUsers;
