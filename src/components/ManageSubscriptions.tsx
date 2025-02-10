import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getSubscriptions } from '../../services/adminService';

interface Subscription {
  _id: string;
  user: {
    name: string;
  };
  plan: string;
}

const ManageSubscriptions: React.FC = () => {
  const navigation = useNavigation();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const subscriptionData = await getSubscriptions();
        setSubscriptions(subscriptionData);
      } catch (error) {
        console.error('Failed to fetch subscriptions', error);
      }
    };

    fetchSubscriptions();
  }, []);

  const renderSubscriptionItem = ({ item }: { item: Subscription }) => (
    <View style={styles.item}>
      <Text>{item.user.name}</Text>
      <Text>{item.plan}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Manage Subscriptions</Text>
      <FlatList
        data={subscriptions}
        keyExtractor={(item) => item._id}
        renderItem={renderSubscriptionItem}
      />
      <TouchableOpacity onPress={() => navigation.navigate('AdminDashboard')}>
        <Text style={styles.backButton}>Back to Dashboard</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  backButton: {
    marginTop: 20,
    color: '#007bff',
    textAlign: 'center',
  },
});

export default ManageSubscriptions;
