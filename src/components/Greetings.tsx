import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface GreetingsProps {
  username: string;
}

const Greetings: React.FC<GreetingsProps> = ({ username }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.greetingText}>
        Welcome Back, <Text style={styles.username}>{username}</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  username: {
    color: 'tomato',
    fontWeight: 'bold',
  },
});

export default Greetings;
