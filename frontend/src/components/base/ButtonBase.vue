<template>
  <button
    :type="type"
    :class="[
      'rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent',
      sizeClasses,
      variantClasses,
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90',
      fullWidth ? 'w-full' : '',
      className,
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: {
    type: String,
    default: "button",
    validator: (value) => ["button", "submit", "reset"].includes(value),
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) =>
      ["primary", "secondary", "accent", "outline", "text"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  fullWidth: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
});

defineEmits(["click"]);

const variantClasses = computed(() => {
  const classes = {
    primary: "bg-primary text-white border border-transparent",
    secondary: "bg-dark-bg text-white border border-gray-700",
    accent: "bg-accent text-dark-bg border border-transparent",
    outline:
      "bg-transparent text-white border border-primary hover:bg-primary hover:bg-opacity-10",
    text: "bg-transparent text-accent hover:underline",
  };
  return classes[props.variant];
});

const sizeClasses = computed(() => {
  const classes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };
  return classes[props.size];
});
</script>
