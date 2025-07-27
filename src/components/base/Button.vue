<template>
  <button
    :class="buttonClasses"
    :style="buttonStyles"
    :type="type"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  type: 'button',
  disabled: false,
  fullWidth: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const baseClasses = 'inline-flex items-center justify-center font-medium focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'
  
  const sizeClasses = {
    sm: 'h-6',
    md: '',
    lg: ''
  }
  
  const variantClasses = {
    primary: 'rounded-lg',
    secondary: 'rounded-lg',
    success: 'rounded-lg',
    error: 'rounded-lg',
    ghost: 'rounded-lg'
  }
  
  const widthClasses = props.fullWidth ? 'w-full' : ''
  
  return `${baseClasses} ${sizeClasses[props.size]} ${variantClasses[props.variant]} ${widthClasses}`
})

const buttonStyles = computed(() => {
  const baseStyles = {
    fontSize: '14px',
    border: 'none',
    cursor: 'pointer'
  }
  
  const sizeStyles = {
    sm: {
      padding: '6px 12px'
    },
    md: {
      padding: '8px 16px'
    },
    lg: {
      padding: '12px 24px'
    }
  }
  
  const variantStyles = {
    primary: {
      backgroundColor: '#1446a0',
      color: '#E0E0E0'
    },
    secondary: {
      backgroundColor: '#F8B400',
      color: '#E0E0E0'
    },
    success: {
      backgroundColor: '#22C55E',
      color: '#E0E0E0'
    },
    error: {
      backgroundColor: '#EF4444',
      color: '#E0E0E0'
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#A0A0A0'
    }
  }
  
  return {
    ...baseStyles,
    ...sizeStyles[props.size],
    ...variantStyles[props.variant]
  }
})
</script> 