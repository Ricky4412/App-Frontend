import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';
import Rating from './Rating';
import ReviewCard from './ReviewCard';
import { getReviews, getBooks, addReview } from '../../services/bookService';

type BookDetailsRouteProp = RouteProp<{ params: { book: any } }, 'params'>;

const BookDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<BookDetailsRouteProp>();
  const { book } = route.params;

  const [reviews, setReviews] = useState<any[]>([]);
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [newReview, setNewReview] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(0);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);

  useEffect(() => {
    const fetchReviewsAndBooks = async () => {
      try {
        const reviewsData = await getReviews(book._id);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching reviews', error);
      }

      try {
        const booksData = await getBooks();
        setAllBooks(booksData);
      } catch (error) {
        console.error('Error fetching all books', error);
      }
    };

    fetchReviewsAndBooks();
  }, [book._id]);

  const handleReadingButtonPress = () => {
    if (!book.htmlUrl) {
      Alert.alert('Error', 'This book does not have valid content.');
      return;
    }
    navigation.navigate('ReadingScreen', { contentUrl: book.htmlUrl });
  };

  const handleReviewSubmit = async () => {
    if (newRating === 0 || newReview.trim() === '') {
      Alert.alert('Error', 'Please provide a rating and review.');
      return;
    }

    try {
      await addReview(book._id, newRating, newReview);
      Alert.alert('Success', 'Review submitted successfully');
      setNewReview('');
      setNewRating(0);
      setShowReviewForm(false);
      const reviewsData = await getReviews(book._id);
      setReviews(reviewsData);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{book.title}</Text>

      {/* Author */}
      <Text style={styles.author}>By: <Text style={styles.authorName}>{book.author}</Text></Text>

      {/* Book Cover */}
      <Image source={{ uri: book.coverImage }} style={styles.coverImage} />

      {/* Book Description */}
      <Text style={styles.description}>{book.description}</Text>

      {/* Rating Feature */}
      <Rating bookId={book._id} />

      {/* Reading Button */}
      <CustomButton
        title="Start Reading"
        onPress={handleReadingButtonPress}
      />

      {/* Reviews Section */}
      <View style={styles.reviewsSection}>
        <View style={styles.reviewHeader}>
          <Text style={styles.sectionTitle}>Reviews</Text>
          <TouchableOpacity
            onPress={() => setShowReviewForm(!showReviewForm)}
            style={styles.postReviewButton}
          >
            <Text style={styles.postReviewText}>Post Review</Text>
          </TouchableOpacity>
        </View>
        {showReviewForm && (
          <View style={styles.reviewForm}>
            <TextInput
              style={styles.input}
              placeholder="Your Review"
              value={newReview}
              onChangeText={setNewReview}
              multiline
            />
            <TextInput
              style={styles.input}
              placeholder="Rating (1-5)"
              value={newRating.toString()}
              onChangeText={(text) => setNewRating(Number(text))}
              keyboardType="numeric"
            />
            <CustomButton title="Submit Review" onPress={handleReviewSubmit} />
          </View>
        )}
        {reviews.map((review) => (
          <ReviewCard key={review._id} review={review} />
        ))}
      </View>

      {/* Recommended Books Section */}
      <Text style={styles.sectionTitle}>Recommended Books</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {allBooks.map((recommendedBook) => (
          <TouchableOpacity
            key={recommendedBook._id}
            onPress={() => navigation.navigate('BookDetails', { book: recommendedBook })}
            style={styles.bookContainer}
          >
            <Image source={{ uri: recommendedBook.coverImage }} style={styles.recommendedBookImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  author: {
    fontSize: 15,
    marginBottom: 10,
    fontStyle: 'italic',
    color: "#666666",
    textAlign: 'center',
  },
  authorName: {
    fontWeight: 'bold',
    color: '#333',
  },
  coverImage: {
    width: '100%',
    height: 450,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 20,
  },
  reviewsSection: {
    marginTop: 30,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  postReviewButton: {
    alignSelf: 'flex-end',
  },
  postReviewText: {
    color: '#007bff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookContainer: {
    marginRight: 10,
  },
  recommendedBookImage: {
    width: 100,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 5,
  },
  reviewForm: {
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

export default BookDetails;