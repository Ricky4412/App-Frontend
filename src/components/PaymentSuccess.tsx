import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useNavigation, RouteProp, useRoute } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  PaymentSuccess: { bookId: string };
  BookDetails: { bookId: string };
};

type PaymentSuccessRouteProp = RouteProp<RootStackParamList, 'PaymentSuccess'>;
type PaymentSuccessNavigationProp = StackNavigationProp<RootStackParamList, 'PaymentSuccess'>;

interface Props {
  route: PaymentSuccessRouteProp;
  navigation: PaymentSuccessNavigationProp;
}

const PaymentSuccess: React.FC<Props> = ({ route, navigation }) => {
  const { bookId } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Payment Successful!</Text>
      <Button
        title="Continue"
        onPress={() => navigation.navigate('BookDetails', { bookId })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default PaymentSuccess;
