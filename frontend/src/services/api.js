import axios from "axios";

const baseURL = process.env.VUE_APP_API_URL;

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

//Incluiye el token en las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Manejo de errores y actualizacion de tokens
api.interceptors.response.use(
  (response) => {
    // Si hay un nuevo token en el header, actualízalo
    const newToken = response.headers.authorization;
    if (newToken) {
      localStorage.setItem("token", newToken.replace("Bearer ", ""));
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Sesión expirada - redirigir al login
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
