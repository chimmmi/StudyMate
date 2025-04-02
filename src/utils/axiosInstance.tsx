import axios from "axios";
import Cookies from "js-cookie";

// Create an axios instance
const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Request Interceptor to add token to requests
api.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get("accessToken"); // Get token from cookies

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepting responses for token expiration (401)
api.interceptors.response.use(
  (response) => response, // Success case
  async (error) => {
    if (error.response?.status === 401) {
      // If access token expires
      try {
        // Making a call to refresh the access token
        const { data } = await api.post(
          "/refresh",
          {},
          { withCredentials: true }
        );
        // Retry the original request with the new access token
        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axios(error.config); // Retry the original request with the new access token
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
