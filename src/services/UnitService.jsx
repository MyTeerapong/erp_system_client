import axios from 'axios';

const API_URL = 'http://localhost:3000/units';

export const getUnit = async () => {
  try {
    const response = await axios.get(`${API_URL}/get`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch units:', error);
    throw error;
  }
};

export const inserUnit = async (unit) => {
  try {
    const response = await axios.post(`${API_URL}/insert`, unit);
    return response.data;
  } catch (error) {
    console.error('Failed to insert units:', error);
    throw error;
  }
};

export const getUnitById = async (unit_id) => {
  try {
    const response = await axios.get(`${API_URL}/get/${unit_id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch unit by ID:', error);
    throw error;
  }
};

export const updateUnit = async (unit) => {
  try {
    const response = await axios.put(`${API_URL}/update/${unit.unit_id}`, unit);
    return response.data;
  } catch (error) {
    console.error('Failed to update unit:', error);
    throw error;
  }
};

export const deleteUnit = async (unit_id) => {
  try {
    const response = await axios.delete(`${API_URL}/delete/${unit_id}`);
    return response.data;
  } catch (error) {
    console.error('Failed to delete unit:', error);
    throw error;
  }
};