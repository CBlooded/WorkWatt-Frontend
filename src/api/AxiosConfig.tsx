import axios from "axios";

const AxiosConfig = axios.create({
  baseURL: "http://192.168.1.102:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosConfig;
