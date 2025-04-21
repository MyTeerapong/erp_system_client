import axios from 'axios';

const API_URL = 'http://localhost:3000/products';

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
};

export const insertProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/insert`, product);
    return response.data;
  } catch (error) {
    console.error('Failed to insert product:', error);
    throw error;
  }
};

export const getProductById = async (product_id) => {
  try {
    const response = await axios.get(`${API_URL}/get/${product_id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch product by ID:', error);
    throw error;
  }
};

export const updateProduct = async (product) => {
  try {
    const response = await axios.put(`${API_URL}/update/${product.product_id}`, product);
    return response.data;
  } catch (error) {
    console.error('Failed to update product:', error);
    throw error;
  }
};

export const deleteProduct = async (product_id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${product_id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete product:', error);
    throw error;
  }
};