import api from './api';

// Subscription Data Interface
interface SubscriptionData {
  bookId: string;
  plan: string;
  price: number;
  duration: number;
  mobileNumber: string;
  serviceProvider: string;
  accountName: string;
}

// Payment Data Interface
interface PaymentData {
  email: string;
  amount: number;
  mobileNumber: string;
  serviceProvider: string;
  accountName: string;
}

// Create a new subscription
export const createSubscription = async (subscriptionData: SubscriptionData): Promise<any> => {
  try {
    const response = await api.post('/api/subscriptions', subscriptionData);
    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Get user subscription by ID
export const getUserSubscription = async (subscriptionId: string): Promise<any> => {
  try {
    const response = await api.get(`/api/subscriptions/${subscriptionId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user subscription:', error);
    throw error;
  }
};

// Initialize payment request
export const initializePayment = async (paymentData: PaymentData): Promise<any> => {
  try {
    const response = await api.post('/api/subscriptions/pay', paymentData);
    return response.data;
  } catch (error) {
    console.error('Error initializing payment:', error);
    throw error;
  }
};

// Verify payment status
export const verifyPayment = async (reference: string): Promise<any> => {
  try {
    const response = await api.get(`/api/subscriptions/pay/verify/${reference}`);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};
