<template>
  <div class="kit-input">
    <template v-if="type === 'checkbox'">
      <label class="kit-input__checkbox-wrap" :for="id">
        <input
            :id="id"
            :name="name"
            type="checkbox"
            :checked="Boolean(modelValue)"
            :disabled="disabled"
            :readonly="readonly"
            :required="required"
            class="kit-input__checkbox"
            @change="handleCheckboxChange"
            @focus="$emit('focus')"
            @blur="$emit('blur')"
        />
        <span v-if="label" class="kit-input__label kit-input__label_inline">
          {{ label }}
        </span>
      </label>
    </template>

    <template v-else>
      <label v-if="label"
             :for="id"
             class="kit-input__label"
      >{{ label }}</label>
      <textarea v-if="as === 'textarea'"
                :value="modelValue"
                :placeholder="placeholder"
                :disabled="disabled"
                :readonly="readonly"
                :required="required"
                :name="name"
                :id="id"
                :rows="rows"
                class="kit-input__field kit-input__field_textarea"
                :class="{
                     'kit-input__field_error': error,
                     'kit-input__field_success': success,
                     'kit-input__field_disabled': disabled,
                     'kit-input__field_lg': size === 'lg',
                     'kit-input__field_sm': size === 'sm'
                }"
                v-bind="$attrs"
                @input="handleInput"
                @focus="$emit('focus')"
                @blur="$emit('blur')"
      />
      <input v-else
             :type="type"
             :value="modelValue"
             :placeholder="placeholder"
             :disabled="disabled"
             :readonly="readonly"
             :required="required"
             :name="name"
             :id="id"
             class="kit-input__field"
             :class="{
          'kit-input__field_error': error,
          'kit-input__field_success': success,
          'kit-input__field_disabled': disabled,
          'kit-input__field_lg': size === 'lg',
          'kit-input__field_sm': size === 'sm'
        }"
             v-bind="$attrs"
             @input="handleInput"
             @focus="$emit('focus')"
             @blur="$emit('blur')"
             @keyup.enter="$emit('enter')"
      />
    </template>
    <p v-if="error" class="kit-input__error">{{ error }}</p>
    <p v-if="hint && !error" class="kit-input__hint">{{ hint }}</p>
  </div>
</template>

<script setup>
import {onBeforeUnmount} from 'vue'

const props = defineProps({
  modelValue: {type: [String, Boolean, Number], default: ''},
  type: {type: String, default: 'text'},
  as: {type: String, default: 'input', validator: v => ['input', 'textarea'].includes(v)},
  rows: {type: Number, default: 3},
  placeholder: {type: String, default: ''},
  label: {type: String, default: ''},
  disabled: {type: Boolean, default: false},
  readonly: {type: Boolean, default: false},
  required: {type: Boolean, default: false},
  name: {type: String, default: ''},
  id: {type: String, default: ''},
  error: {type: String, default: ''},
  success: {type: Boolean, default: false},
  hint: {type: String, default: ''},
  size: {type: String, default: 'md', validator: v => ['sm', 'md', 'lg'].includes(v)},
  debounce: {type: Number, default: 300}
})

const emit = defineEmits(['update:modelValue', 'focus', 'blur', 'enter'])

let debounceTimer = null

const handleInput = (e) => {
  const value = e.target.value
  const isTextarea = e.target.tagName === 'TEXTAREA'

  if (isTextarea || props.debounce <= 0) {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = null
    emit('update:modelValue', value)
    return
  }

  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('update:modelValue', value)
  }, props.debounce)
}

const handleCheckboxChange = (e) => {
  const checked = e.target.checked
  emit('update:modelValue', checked)
}

onBeforeUnmount(() => {
  if (debounceTimer) clearTimeout(debounceTimer)
})
</script>

<style scoped>
.kit-input {
  width: 100%;
}

.kit-input__checkbox-wrap {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
}

.kit-input__label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.015em;
  color: rgb(var(--color-text-rgb));
  opacity: 0.9;
}

.kit-input__label_inline {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 500;
}

.kit-input__checkbox {
  width: 22px;
  height: 22px;
  border-radius: 8px;
  border: 1px solid rgb(var(--color-border-rgb) / 0.8);
  background: rgb(var(--color-surface-2-rgb));
  accent-color: rgb(var(--color-primary-rgb));
  box-shadow: 0 0 0 1px rgb(15 23 42 / 0.5);
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease;
}

.kit-input__checkbox:focus-visible {
  outline: none;
  box-shadow: 0 0 0 3px rgb(var(--color-primary-rgb) / 0.4);
}

.kit-input__checkbox:hover {
  transform: scale(1.04);
  border-color: rgb(var(--color-primary-rgb));
}

.kit-input__field {
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

.kit-input__field_sm {
  padding: 8px 12px;
  font-size: 0.875rem;
  border-radius: calc(var(--radius-sm) - 2px);
}

.kit-input__field_lg {
  padding: 16px 20px;
  font-size: 1.125rem;
  border-radius: var(--radius-md);
}

.kit-input__field:hover:not(:disabled) {
  background: rgb(var(--color-surface-2-rgb) / 0.6);
  border-color: rgb(var(--color-border-rgb) / 0.3);
}

.kit-input__field:focus {
  background: rgb(var(--color-surface-rgb));
  border-color: rgb(var(--color-primary-rgb));
  box-shadow: 0 0 0 3px rgb(var(--color-primary-rgb) / 0.15);
}

.kit-input__field_error {
  border-color: rgb(var(--color-danger-rgb));
}

.kit-input__field_error:focus {
  border-color: rgb(var(--color-danger-rgb));
  box-shadow: 0 0 0 3px rgb(var(--color-danger-rgb) / 0.15);
}

.kit-input__field_success {
  border-color: rgb(var(--color-success-rgb));
}

.kit-input__field_disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.kit-input__field::placeholder {
  color: rgb(var(--color-muted-rgb) / 0.72);
  font-family: inherit;
  font-size: 1em;
  font-weight: 400;
  font-style: normal;
}

.kit-input__field_textarea {
  min-height: auto;
  resize: vertical;
}

.kit-input__error {
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
  color: rgb(var(--color-danger-rgb));
}

.kit-input__hint {
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 0.875rem;
  font-weight: 400;
  line-height: 1.4;
  color: rgb(var(--color-muted-rgb));
  font-style: normal;
}
</style>
