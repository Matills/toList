<template>
  <div :class="avatarClasses">
    <img 
      v-if="src" 
      :src="src" 
      :alt="alt"
      class="w-full h-full object-cover rounded-full"
    />
    <div v-else class="w-full h-full bg-background-secondary rounded-full flex items-center justify-center">
      <slot>
        <User class="text-text-secondary" :class="iconClasses" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { User } from 'lucide-vue-next'

interface Props {
  src?: string
  alt?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  alt: 'Avatar',
  size: 'md'
})

const avatarClasses = computed(() => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  }
  
  return sizeClasses[props.size]
})

const iconClasses = computed(() => {
  const iconSizeClasses = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-6 w-6',
    xl: 'h-8 w-8'
  }
  
  return iconSizeClasses[props.size]
})
</script> 