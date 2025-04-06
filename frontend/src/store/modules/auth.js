import { authService } from "@/services";
import router from "@/router";

export default {
  namespaced: true,

  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    isLoading: false,
    error: null,
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user,
    error: (state) => state.error,
    isLoading: (state) => state.isLoading,
  },

  mutations: {
    LOGIN_REQUEST(state) {
      state.isLoading = true;
      state.error = null;
    },
    LOGIN_SUCCESS(state, { user, token }) {
      state.isLoading = false;
      state.user = user;
      state.token = token;
    },
    LOGIN_FAILURE(state, error) {
      state.isLoading = false;
      state.error = error;
    },
    LOGOUT(state) {
      state.user = null;
      state.token = null;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
  },

  actions: {
    async login({ commit }, { email, password }) {
      commit("LOGIN_REQUEST");
      try {
        const data = await authService.login(email, password);
        commit("LOGIN_SUCCESS", {
          user: data.user,
          token: data.token,
        });
        router.push("/");
        return data;
      } catch (error) {
        commit("LOGIN_FAILURE", error.error || "Error al iniciar sesión");
        throw error;
      }
    },

    logout({ commit }) {
      authService.logout();
      commit("LOGOUT");
      router.push("/login");
    },

    clearError({ commit }) {
      commit("CLEAR_ERROR");
    },
  },
};
