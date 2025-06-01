import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosConfig.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default AxiosConfig;
