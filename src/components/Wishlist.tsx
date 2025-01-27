import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getWishlist, removeFromWishlist } from '../../services/wishlistService'
import BookCard from './BookCard';

interface WishlistItem {
  _id: string;
  book: {
    _id: string;
    title: string;
    author: string;
    coverImage: string;
    rating: number;
  };
}

const Wishlist: React.FC = () => {
  const navigation = useNavigation();
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const data = await getWishlist();
        setWishlist(data);
      } catch (error) {
        console.error('Failed to fetch wishlist', error);
      }
    };

    fetchWishlist();
  }, []);

  const handleRemove = async (bookId: string) => {
    try {
      await removeFromWishlist(bookId);
      setWishlist(wishlist.filter(item => item.book._id !== bookId));
    } catch (error) {
      Alert.alert('Error', 'Failed to remove book from wishlist');
    }
  };

  const renderBookCard = ({ item }: { item: WishlistItem }) => (
    <View style={styles.cardContainer}>
      <BookCard
        book={item.book}
        onPress={() => navigation.navigate('BookDetails', { book: item.book })}
      />
      <TouchableOpacity onPress={() => handleRemove(item.book._id)} style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Wishlist</Text>
      <FlatList
        data={wishlist}
        keyExtractor={(item) => item._id}
        renderItem={renderBookCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  heading: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a4a4a',
    textAlign: 'left',
    paddingHorizontal: 10,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 10,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Wishlist;