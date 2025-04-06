import api from "./api";

export const authService = {
  async login(email, password) {
    try {
      const response = await api.post("/users/login", { email, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: "Error al iniciar sesión" };
    }
  },

  async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  isAuthenticated() {
    return !!localStorage.getItem("token");
  },

  getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  getToken() {
    return localStorage.getItem("token");
  },
};
