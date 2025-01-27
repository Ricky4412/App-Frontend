import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface Review {
  user: {
    name: string;
  };
  rating: number;
  comment: string;
  createdAt: string;
}

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.username}>{review.user.name}</Text>
        <Text style={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</Text>
      </View>
      <Text style={styles.comment}>{review.comment}</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <MaterialIcons
            key={star}
            name="star"
            size={24}
            color={star <= review.rating ? '#FFD700' : '#DDD'}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'tomato',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  comment: {
    fontSize: 16,
    color: '#4d4d4d',
    textAlign: 'center',
    marginVertical: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ReviewCard;