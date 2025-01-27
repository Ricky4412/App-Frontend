import api from './api';

export const getWishlist = async (): Promise<any[]> => {
  try {
    const response = await api.get('/wishlist');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addToWishlist = async (bookId: string): Promise<any> => {
  try {
    const response = await api.post('/wishlist', { bookId });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeFromWishlist = async (bookId: string): Promise<any> => {
  try {
    const response = await api.delete(`/wishlist/${bookId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};