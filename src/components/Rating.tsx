import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { submitRating } from '../../services/bookService';

interface RatingProps {
  bookId: string;
}

const Rating: React.FC<RatingProps> = ({ bookId }) => {
  const [rating, setRating] = useState<number>(0);

  const handleRating = async (newRating: number) => {
    setRating(newRating);
    await submitRating(bookId, newRating);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rate this book:</Text>
      <View style={styles.stars}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <MaterialIcons
              name="star"
              size={32}
              color={star <= rating ? '#FFD700' : '#DDD'}
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  stars: {
    flexDirection: 'row',
  },
});

export default Rating;