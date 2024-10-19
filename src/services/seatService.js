import axios from "axios";

const API_URL = "https://seat-booking-backend-r595.onrender.com/api"; // Adjust the URL if different

// Fetch all seats
export const getSeats = () => {
  return axios.get(`${API_URL}`);
};

// Reserve seats
export const reserveSeats = (numberOfSeats) => {
  return axios.post(`${API_URL}/reserve-seats`, { numberOfSeats });
};
