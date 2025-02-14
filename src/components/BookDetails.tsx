import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import CustomButton from './CustomButton';
import Rating from './Rating';
import ReviewCard from './ReviewCard';
import { getReviews, getBookDetails, addReview } from '../../services/bookService';
import { getUserSubscription } from '../../services/subscriptionService';

type BookDetailsRouteProp = RouteProp<{ params: { bookId: string } }, 'params'>;

const BookDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<BookDetailsRouteProp>();
  const { bookId } = route.params;

  const [book, setBook] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const [newReview, setNewReview] = useState<string>('');
  const [newRating, setNewRating] = useState<number>(0);
  const [showReviewForm, setShowReviewForm] = useState<boolean>(false);
  const [hasSubscription, setHasSubscription] = useState<boolean>(false);
  const [remainingDays, setRemainingDays] = useState<number>(0);

  useEffect(() => {
    const fetchBookDetailsAndReviews = async () => {
      try {
        const bookData = await getBookDetails(bookId);
        setBook(bookData);

        const reviewsData = await getReviews(bookId);
        setReviews(reviewsData);
      } catch (error) {
        console.error('Error fetching book details or reviews', error);
        Alert.alert('Error', 'Failed to fetch book details or reviews. Please try again later.');
      }

      try {
        const booksData = await getBooks();
        setAllBooks(booksData);
      } catch (error) {
        console.error('Error fetching all books', error);
      }
    };

    const fetchSubscription = async () => {
      try {
        const subscription = await getUserSubscription(bookId);
        if (subscription) {
          setHasSubscription(true);
          const now = new Date();
          const endDate = new Date(subscription.endDate);
          const diffTime = Math.abs(endDate - now);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          setRemainingDays(diffDays);
        }
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setHasSubscription(false);
        } else {
          console.error('Error fetching subscription', error);
        }
      }
    };

    fetchBookDetailsAndReviews();
    fetchSubscription();
  }, [bookId]);

  const handleReadingButtonPress = () => {
    if (!hasSubscription) {
      Alert.alert('Subscription Required', 'You need to subscribe to this book to read.');
      navigation.navigate('SubscriptionForm', { bookId });
      return;
    }

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
      await addReview(bookId, newRating, newReview);
      Alert.alert('Success', 'Review submitted successfully');
      setNewReview('');
      setNewRating(0);
      setShowReviewForm(false);
      const reviewsData = await getReviews(bookId);
      setReviews(reviewsData);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  if (!book) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{book.title}</Text>
      <Text style={styles.author}>By: <Text style={styles.authorName}>{book.author}</Text></Text>
      <Image source={{ uri: book.coverImage }} style={styles.coverImage} />
      <Text style={styles.description}>{book.description}</Text>
      <Rating bookId={book._id} />
      {hasSubscription && (
        <Text style={styles.subscriptionAlert}>
          {remainingDays} days left in your subscription.
        </Text>
      )}
      <CustomButton
        title="Start Reading"
        onPress={handleReadingButtonPress}
      />
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
      <Text style={styles.sectionTitle}>Recommended Books</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {allBooks.map((recommendedBook) => (
          <TouchableOpacity
            key={recommendedBook._id}
            onPress={() => navigation.navigate('BookDetails', { bookId: recommendedBook._id })}
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
  subscriptionAlert: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default BookDetails;
