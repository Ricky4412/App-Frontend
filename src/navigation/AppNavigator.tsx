import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


// Import screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SubscriptionScreen from '../screens/SubscriptionScreen';
import EditProfile from '../components/EditProfile';
import ChangePassword from '../components/ChangePassword';
import PaymentSuccess from '../components/PaymentSuccess';
import PaymentScreen from '../screens/PaymentScreen';
import AdminNavigator from './AdminNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OTPVerificationScreen from '../screens/OTPVerificationScreen';
import Chat from '../components/Chat';
import BookDetails from '../components/BookDetails'; // Import BookDetails component
import ReadingScreen from '../components/ReadingScreen'; // Ensure ReadingScreen is imported
import ReviewCard from "../components/ReviewCard";

// Define types for stack and tab navigators
type RootStackParamList = {
  Login: undefined;
  RegisterScreen: undefined;
  OTPVerificationScreen: { userId: string; role: string };
  Admin: undefined;
  Main: undefined;
  BookDetails: { book: any }; // Add BookDetails route
  ReadingScreen: { contentUrl: string }; // Add ReadingScreen route
  ReviewCard: { bookId: string };
};

type TabParamList = {
  Home: undefined;
  Profile: undefined;
  Subscription: undefined;
  Chat: undefined;
};

type ProfileStackParamList = {
  ProfileMain: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
};

type SubscriptionStackParamList = {
  SubscriptionMain: undefined;
  PaymentScreen: undefined;
  PaymentSuccess: undefined;
};

// Create navigators
const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const ProfileStack = createStackNavigator<ProfileStackParamList>();
const SubscriptionStack = createStackNavigator<SubscriptionStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
      <ProfileStack.Screen name="EditProfile" component={EditProfile} />
      <ProfileStack.Screen name="ChangePassword" component={ChangePassword} />
    </ProfileStack.Navigator>
  );
};

const SubscriptionNavigator: React.FC = () => {
  return (
    <SubscriptionStack.Navigator screenOptions={{ headerShown: false }}>
      <SubscriptionStack.Screen name="SubscriptionMain" component={SubscriptionScreen} />
      <SubscriptionStack.Screen name="PaymentScreen" component={PaymentScreen} />
      <SubscriptionStack.Screen name="PaymentSuccess" component={PaymentSuccess} />
    </SubscriptionStack.Navigator>
  );
};

const MainTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string = '';

          switch (route.name) {
            case 'Home':
              iconName = 'home-outline';
              break;
            case 'Profile':
              iconName = 'person-outline';
              break;
            case 'Subscription':
              iconName = 'card-outline';
              break;
            case 'Chat':
              iconName = 'chatbubble-outline';
              break;
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        headerShown: route.name !== 'Home',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileNavigator} />
      <Tab.Screen name="Subscription" component={SubscriptionNavigator} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        <Stack.Screen name="Admin" component={AdminNavigator} />
        <Stack.Screen name="BookDetails" component={BookDetails} />
        <Stack.Screen name="ReadingScreen" component={ReadingScreen} />
        <Stack.Screen name="ReviewCard" component={ReviewCard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;