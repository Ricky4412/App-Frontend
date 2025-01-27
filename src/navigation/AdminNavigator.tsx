import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AdminDashboard from '../components/AdminDashboard';
import ManageUsers from '../components/ManageUsers';
import ManageBooks from '../components/ManageBooks';
import ManageSubscriptions from '../components/ManageSubscriptions';
import UserForm from '../components/UserForm';
import BookForm from '../components/BookForm';
import SubscriptionForm from '../components/SubscriptionForm';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import AnalyticsDashboard from '../components/AnalyticsDashboard';

const Stack = createStackNavigator();

const AdminNavigator: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="ManageUsers" component={ManageUsers} />
      <Stack.Screen name="ManageBooks" component={ManageBooks} />
      <Stack.Screen name="ManageSubscriptions" component={ManageSubscriptions} />
      <Stack.Screen name="UserForm" component={UserForm} />
      <Stack.Screen name="BookForm" component={BookForm} />
      <Stack.Screen name="SubscriptionForm" component={SubscriptionForm} />
      <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
      <Stack.Screen name="AnalyticsDashboard" component={AnalyticsDashboard} />
    </Stack.Navigator>
  );
};

export default AdminNavigator;