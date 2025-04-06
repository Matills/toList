<template>
  <div
    class="min-h-screen flex items-center justify-center bg-dark-bg py-12 px-4 sm:px-6 lg:px-8"
  >
    <CardBase class="max-w-md w-full">
      <div class="text-center mb-6">
        <h2 class="text-3xl font-bold text-white">Iniciar sesión</h2>
        <p class="mt-2 text-sm text-accent">Accede a tu cuenta de ToList</p>
      </div>

      <AlertBase
        v-if="error"
        type="error"
        class="mb-4"
        dismissible
        @dismiss="clearError"
      >
        {{ error }}
      </AlertBase>

      <form class="space-y-6" @submit.prevent="handleLogin">
        <InputBase
          id="email"
          v-model="email"
          type="email"
          label="Correo electrónico"
          placeholder="tu@ejemplo.com"
          required
          :disabled="isLoading"
        />

        <InputBase
          id="password"
          v-model="password"
          type="password"
          label="Contraseña"
          required
          :disabled="isLoading"
        />

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="remember"
              type="checkbox"
              class="h-4 w-4 bg-gray-800 border-gray-700 rounded text-primary focus:ring-accent"
              :disabled="isLoading"
            />
            <label for="remember-me" class="ml-2 block text-sm text-white">
              Recordarme
            </label>
          </div>

          <div class="text-sm">
            <a href="#" class="font-medium text-accent hover:text-white">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </div>

        <ButtonBase
          type="submit"
          variant="primary"
          :full-width="true"
          :disabled="isLoading"
        >
          <span v-if="isLoading">Cargando...</span>
          <span v-else>Iniciar sesión</span>
        </ButtonBase>

        <div class="text-center mt-4">
          <p class="text-sm text-white">
            ¿No tienes cuenta?
            <router-link
              to="/register"
              class="font-medium text-accent hover:text-white"
            >
              Regístrate
            </router-link>
          </p>
        </div>
      </form>
    </CardBase>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import CardBase from "../components/base/CardBase.vue";
import InputBase from "../components/base/InputBase.vue";
import ButtonBase from "../components/base/ButtonBase.vue";
import AlertBase from "../components/base/AlertBase.vue";

const store = useStore();
const email = ref("");
const password = ref("");
const remember = ref(false);

const error = computed(() => store.getters["auth/error"]);
const isLoading = computed(() => store.getters["auth/isLoading"]);

const handleLogin = async () => {
  if (!email.value || !password.value) {
    store.commit("auth/LOGIN_FAILURE", "Por favor, completa todos los campos");
    return;
  }

  try {
    await store.dispatch("auth/login", {
      email: email.value,
      password: password.value,
    });

    if (remember.value) {
      localStorage.setItem("rememberMe", "true");
    }
  } catch (error) {
    console.error("Error en login:", error);
  }
};

const clearError = () => {
  store.dispatch("auth/clearError");
};
</script>
