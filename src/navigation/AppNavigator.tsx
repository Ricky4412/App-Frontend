import React from 'react';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';

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
import BookDetails from '../components/BookDetails';
import ReadingScreen from '../components/ReadingScreen';
import ReviewCard from '../components/ReviewCard';
import PasswordReset from '../components/PasswordReset';

// Define types for stack and tab navigators
type RootStackParamList = {
  Login: undefined;
  RegisterScreen: undefined;
  OTPVerificationScreen: { userId: string; role: string };
  Admin: undefined;
  Main: undefined;
  BookDetails: { book: { id: string; title: string; author: string; description: string; coverUrl: string } };
  ReadingScreen: { contentUrl: string };
  ReviewCard: { bookId: string };
  PasswordReset: { token?: string };
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

// ✅ Profile Stack Navigator
const ProfileNavigator: React.FC = () => (
  <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
    <ProfileStack.Screen name="ProfileMain" component={ProfileScreen} />
    <ProfileStack.Screen name="EditProfile" component={EditProfile} />
    <ProfileStack.Screen name="ChangePassword" component={ChangePassword} />
  </ProfileStack.Navigator>
);

// ✅ Subscription Stack Navigator
const SubscriptionNavigator: React.FC = () => (
  <SubscriptionStack.Navigator screenOptions={{ headerShown: false }}>
    <SubscriptionStack.Screen name="SubscriptionMain" component={SubscriptionScreen} />
    <SubscriptionStack.Screen name="PaymentScreen" component={PaymentScreen} />
    <SubscriptionStack.Screen name="PaymentSuccess" component={PaymentSuccess} />
  </SubscriptionStack.Navigator>
);

// ✅ Bottom Tab Navigator
const MainTabNavigator: React.FC = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        switch (route.name) {
          case 'Home':
            iconName = 'home-outline';
            break;
          case 'Profile':
            iconName = 'person-outline';
            break;
          case 'Subscription':
            iconName = 'wallet-outline';
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
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Profile" component={ProfileNavigator} />
    <Tab.Screen name="Subscription" component={SubscriptionNavigator} />
    <Tab.Screen name="Chat" component={Chat} />
  </Tab.Navigator>
);

// ✅ Deep Linking Configuration (Fix for Password Reset)
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [
    'https://app-frontend-five-dun.vercel.app', // ✅ Hosted frontend (update if needed)
    'frontend://app-frontend-five-dun.vercel.app/reset-password' 
  ],
  config: {
    screens: {
      Login: "login",
      RegisterScreen: "register",
      OTPVerificationScreen: "verify-otp",
      Main: "home",
      BookDetails: "book/:id",
      ReadingScreen: "reading/:contentUrl",
      ReviewCard: "review/:bookId",
      PasswordReset: {
        path: "reset-password/:token",
        parse: {
          token: (token: string) => token, // ✅ Extracts token correctly
        },
      },
    },
  },
  async getInitialURL() {
    try {
      const url = await Linking.getInitialURL();
      console.log("Initial deep link URL:", url); // ✅ Debugging log
      return url;
    } catch (error) {
      console.error("Failed to get initial URL:", error);
      return null;
    }
  },
  subscribe(listener) {
    const handleDeepLink = ({ url }: { url: string }) => {
      console.log("Deep link triggered:", url); // ✅ Debugging log
      listener(url);
    };

    const subscription = Linking.addEventListener("url", handleDeepLink);
    return () => subscription.remove();
  },
};

// ✅ Main Stack Navigator
const AppNavigator: React.FC = () => {
  const isAdmin: boolean = false; // Placeholder; should be dynamically determined from authentication context

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="OTPVerificationScreen" component={OTPVerificationScreen} />
        <Stack.Screen name="Main" component={MainTabNavigator} />
        
        {/* ✅ Correctly renders AdminNavigator only if isAdmin is true */}
        {isAdmin ? <Stack.Screen name="Admin" component={AdminNavigator} /> : null}

        <Stack.Screen name="BookDetails" component={BookDetails} />
        <Stack.Screen name="ReadingScreen" component={ReadingScreen} />
        <Stack.Screen name="ReviewCard" component={ReviewCard} />
        <Stack.Screen name="PasswordReset" component={PasswordReset} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
