<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    @click="closeModal"
  >
    <div 
      class="bg-background-secondary rounded-lg shadow-xl w-full max-w-sm"
      @click.stop
    >
      <div class="p-8">
        <div class="relative text-center mb-8 ">
          <button 
            v-if="!showEmailForm"
            @click="closeModal"
            class="absolute top-2 left-0 text-text-secondary hover:text-text-primary transition-colors"
          >
            <X class="h-6 w-6" />
          </button>
          <div v-if="!showEmailForm">
            <h2 class="text-3xl font-bold text-text-primary">Hello!</h2>
            <p class="text-text-secondary mt-2">
              Use your email or another service to continue.
            </p>
          </div>
           <div v-else>
              <button 
                @click="showEmailForm = false"
                class="absolute top-2 left-0 text-text-secondary hover:text-text-primary transition-colors flex items-center gap-1"
              >
                <ChevronLeft class="h-6 w-6" />
              </button>
              <h2 class="text-2xl font-bold text-text-primary">
                {{ isSignUp ? 'Sign up' : 'Sign in' }}
              </h2>
              <p class="text-text-secondary mt-2">
                {{ isSignUp ? 'Create your account to get started' : 'Sign in with your email here' }}
              </p>
          </div>
        </div>

        <div v-if="!showEmailForm" class="space-y-3">
          <button class="w-full flex items-center px-4 py-3 border border-border rounded-lg hover:bg-background-primary transition-colors">
            <img :src="googleIcon" alt="Google" class="w-5 h-5" />
            <span class="flex-1 text-center text-text-primary font-medium text-base">Continue with Google</span>
          </button>
          
          <button class="w-full flex items-center px-4 py-3 border border-border rounded-lg hover:bg-background-primary transition-colors">
            <img :src="facebookIcon" alt="Facebook" class="w-5 h-5" />
            <span class="flex-1 text-center text-text-primary font-medium text-base">Continue with Facebook</span>
          </button>
          
          <button 
            class="w-full flex items-center px-4 py-3 bg-primary text-text-primary rounded-lg hover:bg-blue-700 transition-colors"
            @click="showEmailForm = true"
          >
            <span class="flex-1 text-center font-semibold text-base">Continue with email</span>
          </button>
        </div>

        <div v-else class="space-y-4">
          <div v-if="isSignUp">
            <label for="username" class="text-sm font-medium text-text-secondary sr-only">Username</label>
            <Input
              id="username"
              v-model="username"
              type="text"
              placeholder="Enter your username"
              size="lg"
            />
          </div>

          <div>
            <label for="email" class="text-sm font-medium text-text-secondary sr-only">Email</label>
            <Input
              id="email"
              v-model="email"
              type="email"
              placeholder="Enter your email address"
              size="lg"
            />
          </div>
          
          <div class="relative">
            <label for="password" class="text-sm font-medium text-text-secondary sr-only">Password</label>
            <Input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Password"
              size="lg"
            />
            <button 
              @click="togglePassword"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              <Eye v-if="!showPassword" class="w-5 h-5" />
              <EyeOff v-else class="w-5 h-5" />
            </button>
          </div>

          <div v-if="isSignUp" class="relative">
            <label for="confirmPassword" class="text-sm font-medium text-text-secondary sr-only">Confirm Password</label>
            <Input
              id="confirmPassword"
              v-model="confirmPassword"
              :type="showConfirmPassword ? 'text' : 'password'"
              placeholder="Confirm password"
              size="lg"
            />
            <button 
              @click="toggleConfirmPassword"
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-secondary hover:text-text-primary"
            >
              <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
              <EyeOff v-else class="w-5 h-5" />
            </button>
          </div>

          <Button 
            variant="primary" 
            size="lg" 
            class="w-full"
            @click="handleSubmit"
          >
            {{ isSignUp ? 'Sign up' : 'Sign in' }}
          </Button>

          <div class="text-center text-sm text-text-secondary">
            <p v-if="!isSignUp">
              Don't have an account? 
              <button @click="toggleMode" class="text-primary hover:underline">Sign up</button>
            </p>
            <p v-else>
              Already have an account? 
              <button @click="toggleMode" class="text-primary hover:underline">Sign in</button>
            </p>
          </div>
        </div>

        <div class="mt-8 text-center text-xs text-text-secondary">
          <p>
            By continuing, you agree to our 
            <a href="#" class="text-primary hover:underline">Terms of Service</a>. 
          </p>
          <p>
            Read our 
            <a href="#" class="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { X, Eye, EyeOff, ChevronLeft } from 'lucide-vue-next'
import { Button, Input } from './base'
import googleIcon from '@/assets/google.svg'
import facebookIcon from '@/assets/Facebook.svg'

interface Props {
  isOpen: boolean
  mode?: 'signin' | 'signup'
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'signin'
})

const emit = defineEmits<{
  close: []
  'update:isOpen': [value: boolean]
}>()

const isSignUp = ref(props.mode === 'signup')
const showEmailForm = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const username = ref('')

watch(() => props.isOpen, (newVal) => {
  if (!newVal) {
    setTimeout(() => {
      showEmailForm.value = false
      email.value = ''
      password.value = ''
      confirmPassword.value = ''
      username.value = ''
      showPassword.value = false
      showConfirmPassword.value = false
    }, 200)
  }
})

watch(() => props.mode, (newMode) => {
  isSignUp.value = newMode === 'signup'
})

const closeModal = () => {
  emit('update:isOpen', false)
}

const toggleMode = () => {
  isSignUp.value = !isSignUp.value
  email.value = ''
  password.value = ''
  confirmPassword.value = ''
  username.value = ''
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value
}

const handleSubmit = () => {
  console.log('Form submitted:', { 
    username: username.value,
    email: email.value, 
    password: password.value,
    confirmPassword: confirmPassword.value,
    mode: isSignUp.value ? 'signup' : 'signin' 
  })
}
</script>
