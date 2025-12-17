import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true, 
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("access-token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosSecure;
