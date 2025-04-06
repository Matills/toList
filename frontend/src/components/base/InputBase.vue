<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block text-sm font-medium text-white mb-1"
    >
      {{ label }}
      <span v-if="required" class="text-primary">*</span>
    </label>
    <div class="relative">
      <input
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'appearance-none block w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-accent focus:border-accent sm:text-sm',
          disabled ? 'opacity-60 cursor-not-allowed' : '',
          error ? 'border-primary' : 'border-gray-700',
          'bg-gray-800 text-white placeholder-gray-400',
          className,
        ]"
        @input="$emit('update:modelValue', $event.target.value)"
      />
    </div>
    <p v-if="error" class="mt-1 text-xs text-primary">{{ error }}</p>
    <p v-if="helperText" class="mt-1 text-xs text-gray-400">{{ helperText }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  type: {
    type: String,
    default: "text",
  },
  placeholder: {
    type: String,
    default: "",
  },
  helperText: {
    type: String,
    default: "",
  },
  error: {
    type: String,
    default: "",
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  className: {
    type: String,
    default: "",
  },
});

defineEmits(["update:modelValue"]);
</script>
