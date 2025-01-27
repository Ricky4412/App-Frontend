import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getBooks, deleteBook } from '../../services/adminService';

interface Book {
  _id: string;
  title: string;
}

const ManageBooks: React.FC = () => {
  const navigation = useNavigation();
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookData = await getBooks();
        setBooks(bookData);
      } catch (error) {
        console.error('Failed to fetch books', error);
      }
    };

    fetchBooks();
  }, []);

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteBook(bookId);
      setBooks(books.filter((book) => book._id !== bookId));
      Alert.alert('Success', 'Book deleted successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete book');
    }
  };

  const renderBookItem = ({ item }: { item: Book }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
      <TouchableOpacity onPress={() => handleDeleteBook(item._id)}>
        <Text style={styles.deleteButton}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Books</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item._id}
        renderItem={renderBookItem}
      />
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
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  deleteButton: {
    color: 'red',
  },
  backButton: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center',
  },
});

export default ManageBooks;