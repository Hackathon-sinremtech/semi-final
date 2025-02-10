import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Backend URL

export const createOrder = async (amount, currency) => {
  const { data } = await axios.post(`${API_URL}/create-order`, { amount, currency });
  return data;
};

export const verifyPayment = async (paymentDetails) => {
  const { data } = await axios.post(`${API_URL}/verify-payment`, paymentDetails);
  return data;
};