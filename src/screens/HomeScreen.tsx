import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Text, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Greetings from '../components/Greetings';
import BookCard from '../components/BookCard';
import { getBooks } from '../../services/bookService';
import { getUserProfile } from '../../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';
import SearchBar from '../components/SearchBar';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks({ search, author, rating });
        setBooks(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUsername(userProfile.name);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch user profile');
      }
    };

    fetchBooks();
    fetchUserProfile();
  }, [search, author, rating]);

  if (loading) {
    return <LoadingSpinner />;
  }

  const renderBookCard = ({ item }: { item: any }) => (
    <BookCard
      book={item}
      onPress={() => navigation.navigate('BookDetails', { book: item })}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Greetings username={username} />
        <SearchBar placeholder="Search books..." onSearch={setSearch} />
        <Text style={styles.heading}>Explore the Good News</Text>
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item._id.toString()}
        renderItem={renderBookCard}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    marginTop: 30,
    backgroundColor: '#f8f8f8',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  heading: {
    marginTop: 10,
    marginBottom: 6,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default HomeScreen;
