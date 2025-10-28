// src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth APIs
export const registerUser = (userData) => {
  return api.post('/register', userData);
};

export const loginUser = (credentials) => {
  return api.post('/login', credentials);
};

// Vehicle APIs
export const addVehicle = (vehicleData) => {
  return api.post('/vehicles', vehicleData);
};

export const getUserVehicles = (userId) => {
  return api.get(`/vehicles/${userId}`);
};

// Service APIs
export const getAllServices = () => {
  return api.get('/services');
};

// Booking APIs
export const createBooking = (bookingData) => {
  return api.post('/bookings', bookingData);
};

export const getUserBookings = (userId) => {
  return api.get(`/bookings/${userId}`);
};

export const updateBookingStatus = (statusData) => {
  return api.put('/bookings/status', statusData);
};

export default api;