import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getUsers, getBooks, getSubscriptions, deleteUser, deleteBook } from '../../services/adminService';

interface User {
  _id: string;
  name: string;
}

interface Book {
  _id: string;
  title: string;
}

interface Subscription {
  _id: string;
  user: User;
  plan: string;
}

const AdminDashboard: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userData, bookData, subscriptionData] = await Promise.all([
          getUsers(),
          getBooks(),
          getSubscriptions(),
        ]);
        setUsers(userData);
        setBooks(bookData);
        setSubscriptions(subscriptionData);
      } catch (error) {
        console.error('Failed to fetch data', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteUser = async (userId: string) => {
    try {
      await deleteUser(userId);
      setUsers(users.filter((user) => user._id !== userId));
      Alert.alert('Success', 'User deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user');
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteBook(bookId);
      setBooks(books.filter((book) => book._id !== bookId));
      Alert.alert('Success', 'Book deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete book');
    }
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
      </View>
    </View>
  );

  const renderBookItem = ({ item }: { item: Book }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('BookForm', { bookId: item._id, existingBook: item })}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteBook(item._id)}>
          <Text style={styles.deleteButton}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSubscriptionItem = ({ item }: { item: Subscription }) => (
    <View style={styles.item}>
      <Text>{item.user.name}</Text>
      <Text>{item.plan}</Text>
      <View style={styles.actions}>
        <TouchableOpacity onPress={() => navigation.navigate('SubscriptionForm', { subscriptionId: item._id, existingSubscription: item })}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Dashboard</Text>
      
      <TouchableOpacity
        style={styles.analyticsButton}
        onPress={() => navigation.navigate('AnalyticsDashboard')}
      >
        <Text style={styles.analyticsButtonText}>View Analytics</Text>
      </TouchableOpacity>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Users</Text>
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => navigation.navigate('UserForm')}
        >
          <Text style={styles.manageButtonText}>Add User</Text>
        </TouchableOpacity>
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}
          renderItem={renderUserItem}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Books</Text>
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => navigation.navigate('BookForm')}
        >
          <Text style={styles.manageButtonText}>Add Book</Text>
        </TouchableOpacity>
        <FlatList
          data={books}
          keyExtractor={(item) => item._id}
          renderItem={renderBookItem}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Subscriptions</Text>
        <TouchableOpacity
          style={styles.manageButton}
          onPress={() => navigation.navigate('SubscriptionForm')}
        >
          <Text style={styles.manageButtonText}>Add Subscription</Text>
        </TouchableOpacity>
        <FlatList
          data={subscriptions}
          keyExtractor={(item) => item._id}
          renderItem={renderSubscriptionItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 100,
  },
  editButton: {
    color: 'blue',
  },
  deleteButton: {
    color: 'red',
    marginLeft: 10,
  },
  manageButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  manageButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  analyticsButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
  },
  analyticsButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default AdminDashboard;
