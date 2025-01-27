import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { getAnalyticsData } from '../../services/analyticsService'

interface AnalyticsData {
  totalUsers: number;
  activeSubscriptions: number;
  totalBooks: number;
}

const AnalyticsDashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [data, setData] = useState<AnalyticsData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const analyticsData = await getAnalyticsData();
        setData(analyticsData);
      } catch (error) {
        console.error('Failed to fetch analytics data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!data) {
    return <Text style={styles.errorText}>Failed to load analytics data.</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Analytics Dashboard</Text>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Users</Text>
        <Text style={styles.cardValue}>{data.totalUsers}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Active Subscriptions</Text>
        <Text style={styles.cardValue}>{data.activeSubscriptions}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Books</Text>
        <Text style={styles.cardValue}>{data.totalBooks}</Text>
      </View>
      {/* Add more metrics as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default AnalyticsDashboard;