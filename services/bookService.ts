import api from './api';

// Function to get all books
export const getBooks = async (params?: { search?: string; author?: string; rating?: string }): Promise<any[]> => {
  try {
    const response = await api.get('/api/books', { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Failed to fetch books. Please try again later.');
  }
};

// Function to update reading progress
export const updateReadingProgress = async (bookId: string, progress: number): Promise<any> => {
  try {
    const response = await api.put('/reading-progress', { bookId, progress });
    return response.data;
  } catch (error) {
    console.error(`Error updating reading progress for book ID ${bookId}:`, error);
    throw new Error('Failed to update reading progress. Please try again later.');
  }
};

// Function to get reading progress for a specific book
export const getReadingProgress = async (bookId: string): Promise<any> => {
  try {
    const response = await api.get(`/reading-progress/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reading progress for book ID ${bookId}:`, error);
    throw new Error('Failed to fetch reading progress. Please try again later.');
  }
};

// Function to search for books
export const searchBooks = async (query: string): Promise<any[]> => {
  try {
    const response = await api.get(`/books/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error(`Error searching books with query "${query}":`, error);
    throw new Error('Failed to search books. Please try again later.');
  }
};

// Function to get book recommendations
export const getRecommendations = async (): Promise<any[]> => {
  try {
    const response = await api.get('/books/recommendations');
    return response.data;
  } catch (error) {
    console.error('Error fetching book recommendations:', error);
    throw new Error('Failed to fetch book recommendations. Please try again later.');
  }
};

// Function to get book details
export const getBookDetails = async (bookId: string): Promise<any> => {
  try {
    const response = await api.get(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching book details for book ID ${bookId}:`, error);
    throw new Error('Failed to fetch book details. Please try again later.');
  }
};

// Function to get similar books
export const getSimilarBooks = async (bookId: string): Promise<any[]> => {
  try {
    const response = await api.get(`/books/${bookId}/similar`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching similar books for book ID ${bookId}:`, error);
    throw new Error('Failed to fetch similar books. Please try again later.');
  }
};

// Function to submit a rating for a book
export const submitRating = async (bookId: string, rating: number): Promise<any> => {
  try {
    const response = await api.post(`/books/${bookId}/rating`, { rating });
    return response.data;
  } catch (error) {
    console.error(`Error submitting rating for book ID ${bookId}:`, error);
    throw new Error('Failed to submit rating. Please try again later.');
  }
};

// Function to add a review for a book
export const addReview = async (bookId: string, rating: number, comment: string): Promise<any> => {
  try {
    const response = await api.post('/reviews', { bookId, rating, comment });
    return response.data;
  } catch (error) {
    console.error(`Error adding review for book ID ${bookId}:`, error);
    throw new Error('Failed to add review. Please try again later.');
  }
};

// Function to get reviews for a specific book
export const getReviews = async (bookId: string): Promise<any[]> => {
  try {
    const response = await api.get(`/api/reviews/${bookId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching reviews for book ID ${bookId}:`, error);
    throw new Error('Failed to fetch reviews. Please try again later.');
  }
};
