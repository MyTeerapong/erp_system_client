import axios from 'axios';

const API_URL = 'http://localhost:3000/types';

export const getTypes = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch types:', error);
    throw error;
  }
};

export const insertType = async (type) => {
  try {
    const response = await axios.post(`${API_URL}/insert`, type);
    return response.data;
  } catch (error) {
    console.error('Failed to insert type:', error);
    throw error;
  }
};

export const getTypeById = async (type_id) => {
  try {
    const response = await axios.get(`${API_URL}/get/${type_id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch type by ID:', error);
    throw error;
  }
};

export const updateType = async (type) => {
  try {
    const response = await axios.put(`${API_URL}/update/${type.type_id}`, type);
    return response.data;
  } catch (error) {
    console.error('Failed to update type:', error);
    throw error;
  }
};

export const deleteType = async (type_id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${type_id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete type:', error);
    throw error;
  }
};