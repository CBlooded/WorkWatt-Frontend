import axiosConfig from "./axiosConfig";

const setupInterceptors = () => {
  axiosConfig.interceptors.request.use(
    (config) => {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosConfig.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response?.status === 401) {
        console.log("Unauthorized");
        sessionStorage.removeItem("token");
      }

      return Promise.reject(error);
    }
  );
};

export default setupInterceptors;
