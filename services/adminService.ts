import api from './api';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add other user fields as necessary
}

interface BookData {
  id?: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  rating: number;
  htmlUrl: string;
  price: number; 
}

interface SubscriptionData {
  id: string;
  userId: string;
  plan: string;
  startDate: string;
  endDate: string;
  // Add other subscription fields as necessary
}

// Fetch all users
export const getUsers = async (): Promise<UserData[]> => {
  try {
    const response = await api.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users. Please try again later.');
  }
};

// Fetch all books
export const getBooks = async (): Promise<BookData[]> => {
  try {
    const response = await api.get('/admin/books');
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books. Please try again later.');
  }
};

// Fetch all subscriptions
export const getSubscriptions = async (): Promise<SubscriptionData[]> => {
  try {
    const response = await api.get('/admin/subscriptions');
    return response.data;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    throw new Error('Failed to fetch subscriptions. Please try again later.');
  }
};

// Create a new user
export const createUser = async (userData: UserData): Promise<UserData> => {
  try {
    const response = await api.post('/admin/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user. Please try again later.');
  }
};

// Update a user by ID
export const updateUser = async (userId: string, userData: UserData): Promise<UserData> => {
  try {
    const response = await api.put(`/admin/users/${userId}`, userData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${userId}:`, error);
    throw new Error('Failed to update user. Please try again later.');
  }
};

// Delete a user by ID
export const deleteUser = async (userId: string): Promise<void> => {
  try {
    await api.delete(`/admin/users/${userId}`);
  } catch (error) {
    console.error(`Error deleting user with ID ${userId}:`, error);
    throw new Error('Failed to delete user. Please try again later.');
  }
};

// Create a new book
export const createBook = async (bookData: BookData): Promise<BookData> => {
  try {
    const response = await api.post('/admin/books', bookData);
    return response.data;
  } catch (error) {
    console.error('Error creating book:', error);
    throw new Error('Failed to create book. Please try again later.');
  }
};


// Update a book by ID
export const updateBook = async (bookId: string, bookData: BookData): Promise<BookData> => {
  try {
    const response = await api.put(`/admin/books/${bookId}`, bookData);
    return response.data;
  } catch (error) {
    console.error(`Error updating book with ID ${bookId}:`, error);
    throw new Error('Failed to update book. Please try again later.');
  }
};

// Delete a book by ID
export const deleteBook = async (bookId: string): Promise<void> => {
  try {
    await api.delete(`/admin/books/${bookId}`);
  } catch (error) {
    console.error(`Error deleting book with ID ${bookId}:`, error);
    throw new Error('Failed to delete book. Please try again later.');
  }
};

// Create a new subscription
export const createSubscription = async (subscriptionData: SubscriptionData): Promise<SubscriptionData> => {
  try {
    const response = await api.post('/admin/subscriptions', subscriptionData);
    return response.data;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw new Error('Failed to create subscription. Please try again later.');
  }
};

// Update a subscription by ID
export const updateSubscription = async (subscriptionId: string, subscriptionData: SubscriptionData): Promise<SubscriptionData> => {
  try {
    const response = await api.put(`/admin/subscriptions/${subscriptionId}`, subscriptionData);
    return response.data;
  } catch (error) {
    console.error(`Error updating subscription with ID ${subscriptionId}:`, error);
    throw new Error('Failed to update subscription. Please try again later.');
  }
};

// Delete a subscription by ID
export const deleteSubscription = async (subscriptionId: string): Promise<void> => {
  try {
    await api.delete(`/admin/subscriptions/${subscriptionId}`);
  } catch (error) {
    console.error(`Error deleting subscription with ID ${subscriptionId}:`, error);
    throw new Error('Failed to delete subscription. Please try again later.');
  }
};
