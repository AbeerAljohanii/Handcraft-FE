import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const API_URL = "https://handcraft-be.onrender.com/api/v1";

const api = axios.create({
  baseURL: API_URL,
});

// Add an interceptor (This checks each outgoing request before it is sent) to handle authorization and errors centrally
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors centrally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.status === 403 || error.response.status === 401)
    ) {
      // Display a message to inform the user
      toast.error("Session expired. Redirecting to login...");

      // Clear the expired token from localStorage
      localStorage.removeItem("token");

      // Redirect to login page
      window.location.href = "/signin"; // OR use navigate("/signin") in a component with routing context

      return Promise.reject("Session expired. Please log in again.");
    }

    return Promise.reject(error);
  }
);

// Fetch all items (GET request)
export const fetchItems = (endpoint) => {
  return api.get(endpoint);
};

// Fetch a single item by ID (GET request)
export const fetchItemById = (endpoint, id) => {
  return api.get(`${endpoint}/${id}`);
};

// Create a new item (POST request)
export const createItem = (endpoint, data) => {
  return api.post(endpoint, data);
};

// Update an item by ID (PATCH)
export const updateItem = (endpoint, id, data) => {
  return api.patch(`${endpoint}/${id}`, data);
};

// Delete an item by ID (DELETE request)
export const deleteItem = (endpoint, id) => {
  return api.delete(`${endpoint}/${id}`);
};

// General method for file upload
export const uploadFile = async (endpoint, formData) => {
  try {
    const response = await api.post(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure the header is set for file upload
      },
    });
    return response;
  } catch (error) {
    if (error.response.data.errors) {
      console.error("Validation Errors:", error.response.data.errors);
    }
    throw error;
  }
};

export default api;
