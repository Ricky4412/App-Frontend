import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, Image, ScrollView } from 'react-native';
import { createBook, updateBook } from '../../services/adminService';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import CustomButton from './CustomButton';

type BookFormRouteProp = RouteProp<{ params: { bookId: string; existingBook: any } }, 'params'>;

const BookForm: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<BookFormRouteProp>();

  const { bookId, existingBook } = route.params || {};

  const [title, setTitle] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [htmlUrl, setHtmlUrl] = useState<string>('');
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');

  useEffect(() => {
    if (existingBook) {
      setTitle(existingBook.title);
      setAuthor(existingBook.author);
      setDescription(existingBook.description);
      setRating(existingBook.rating?.toString() || '');
      setHtmlUrl(existingBook.htmlUrl);
      setCoverImageUrl(existingBook.coverImage);
    }
  }, [existingBook]);

  const handleSubmit = async () => {
    if (!title || !author || !description || !coverImageUrl || !rating || !htmlUrl) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    const formData = {
      title,
      author,
      description,
      rating: parseFloat(rating),
      coverImage: coverImageUrl,
      htmlUrl,
    };

    console.log('Submitting book data:', formData);

    try {
      if (bookId) {
        await updateBook(bookId, formData);
        Alert.alert('Success', 'Book updated successfully');
      } else {
        await createBook(formData);
        Alert.alert('Success', 'Book created successfully');
      }
      navigation.goBack();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>{bookId ? 'Edit Book' : 'Add Book'}</Text>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Author"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Rating"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="HTML URL"
        value={htmlUrl}
        onChangeText={setHtmlUrl}
      />
      <TextInput
        style={styles.input}
        placeholder="Cover Image URL"
        value={coverImageUrl}
        onChangeText={setCoverImageUrl}
      />
      {coverImageUrl && <Image source={{ uri: coverImageUrl }} style={styles.coverImage} />}
      <CustomButton title="Submit" onPress={handleSubmit} />
      <CustomButton title="Cancel" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
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
  coverImage: {
    width: '100%',
    height: 200,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default BookForm;