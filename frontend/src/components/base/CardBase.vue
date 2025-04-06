<template>
  <div
    :class="[
      'overflow-hidden rounded-lg shadow-md',
      bordered ? 'border border-gray-700' : '',
      'bg-dark-bg',
      className,
    ]"
  >
    <div v-if="$slots.header" class="px-4 py-3 border-b border-gray-700">
      <slot name="header"></slot>
    </div>
    <div :class="[padding ? 'p-4' : '']">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="px-4 py-3 border-t border-gray-700">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  bordered: {
    type: Boolean,
    default: true,
  },
  padding: {
    type: Boolean,
    default: true,
  },
  className: {
    type: String,
    default: "",
  },
});
</script>
