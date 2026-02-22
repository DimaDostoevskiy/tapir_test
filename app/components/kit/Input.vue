<!-- BaseInput.vue -->
<template>
  <div class="input-wrapper">
    <label v-if="label" :for="id" class="input__label">{{ label }}</label>
    <input
        :type="type"
        :value="modelValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        :name="name"
        :id="id"
        @input="handleInput"
        @focus="$emit('focus')"
        @blur="$emit('blur')"
        @keyup.enter="$emit('enter')"
        v-bind="$attrs"
        class="input"
        :class="{
        'input_error': error,
        'input_success': success,
        'input_disabled': disabled,
        'input_lg': size === 'lg',
        'input_sm': size === 'sm'
      }"
    />
    <p v-if="error" class="input__error">{{ error }}</p>
    <p v-if="hint && !error" class="input__hint">{{ hint }}</p>
  </div>
</template>

<script setup>
import {onBeforeUnmount} from 'vue'

const props = defineProps({
  modelValue: null,
  type: {type: String, default: 'text'},
  placeholder: String,
  label: String,
  disabled: Boolean,
  readonly: Boolean,
  required: Boolean,
  name: String,
  id: String,
  error: String,
  success: Boolean,
  hint: String,
  size: {type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v)},
  debounce: {type: Number, default: 300}
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'enter'])

let debounceTimer = null

const handleInput = (e) => {
  const value = e.target.value

  if (debounceTimer) clearTimeout(debounceTimer)

  debounceTimer = setTimeout(() => {
    emit('update:modelValue', value)
  }, props.debounce)
}

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>

<style scoped>
.input-wrapper {
  width: 100%;
}

.input__label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.015em;
  color: rgb(var(--color-text-rgb));
  opacity: 0.9;
}

.input {
  padding: 12px 16px;
  background: rgb(var(--color-surface-2-rgb) / 0.4);
  border: 1px solid rgb(var(--color-border-rgb) / 0.15);
  border-radius: var(--radius-sm);
  color: rgb(var(--color-text-rgb));
  font-family: inherit;
  font-size: clamp(0.95rem, 0.92rem + 0.14vw, 1.05rem);
  font-weight: 500;
  line-height: 1.45;
  letter-spacing: 0.01em;
  outline: none;
  width: 100%;
  transition: all 0.2s ease;
}

.input_sm {
  padding: 8px 12px;
  font-size: 0.875rem;
  border-radius: calc(var(--radius-sm) - 2px);
}

.input_lg {
  padding: 16px 20px;
  font-size: 1.125rem;
  border-radius: var(--radius-md);
}

.input:hover:not(:disabled) {
  background: rgb(var(--color-surface-2-rgb) / 0.6);
  border-color: rgb(var(--color-border-rgb) / 0.3);
}

.input:focus {
  background: rgb(var(--color-surface-rgb));
  border-color: rgb(var(--color-primary-rgb));
  box-shadow: 0 0 0 3px rgb(var(--color-primary-rgb) / 0.15);
}

.input_error {
  border-color: rgb(var(--color-danger-rgb));
}

.input_error:focus {
  border-color: rgb(var(--color-danger-rgb));
  box-shadow: 0 0 0 3px rgb(var(--color-danger-rgb) / 0.15);
}

.input_success {
  border-color: rgb(var(--color-success-rgb));
}

.input_disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.input::placeholder {
  color: rgb(var(--color-muted-rgb) / 0.72);
  font-family: inherit;
  font-size: 1em;
  font-weight: 400;
  font-style: normal;
}

.input__error {
  margin-top: 4px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
  color: rgb(var(--color-danger-rgb));
}

.input__hint {
  margin-top: 4px;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  color: rgb(var(--color-muted-rgb));
  font-style: normal;
}
</style>
