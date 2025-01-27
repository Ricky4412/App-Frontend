import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

interface SearchParams {
  search: string;
  author: string;
  rating: string;
}

interface AdvancedSearchBarProps {
  onSearch: (params: SearchParams) => void;
}

const AdvancedSearchBar: React.FC<AdvancedSearchBarProps> = ({ onSearch }) => {
  const [search, setSearch] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [rating, setRating] = useState<string>('');

  const handleSearch = () => {
    onSearch({ search, author, rating });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        placeholder="Search by title"
      />
      <TextInput
        style={styles.input}
        value={author}
        onChangeText={setAuthor}
        placeholder="Search by author"
      />
      <TextInput
        style={styles.input}
        value={rating}
        onChangeText={setRating}
        placeholder="Search by rating"
      />
      <Button title="Search" onPress={handleSearch} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
  },
});

export default AdvancedSearchBar;