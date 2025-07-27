<template>
  <div class="relative">
    <input
      ref="inputRef"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="inputClasses"
      @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
      @focus="$emit('focus', $event)"
      @blur="$emit('blur', $event)"
    />
    <slot name="icon" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Props {
  modelValue: string
  type?: 'text' | 'email' | 'password' | 'search' | 'number'
  placeholder?: string
  disabled?: boolean
  error?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  disabled: false,
  error: false,
  size: 'md'
})

defineEmits<{
  'update:modelValue': [value: string]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}>()

const inputRef = ref<HTMLInputElement>()

// Exponer métodos del input
const focus = () => {
  inputRef.value?.focus()
}

const blur = () => {
  inputRef.value?.blur()
}

const select = () => {
  inputRef.value?.select()
}

// Exponer métodos al componente padre
defineExpose({
  focus,
  blur,
  select
})

const inputClasses = computed(() => {
  const baseClasses = 'w-full bg-background-secondary border rounded-lg text-text-primary placeholder-text-secondary focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-3 text-base'
  }
  
  const borderClasses = props.error 
    ? 'border-error' 
    : 'border-border'
  
  return `${baseClasses} ${sizeClasses[props.size]} ${borderClasses}`
})
</script> 