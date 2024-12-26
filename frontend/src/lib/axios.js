import axios from "axios";

 const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true, // use this to set cookie in every request
});

export default axiosInstance;