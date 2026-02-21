<template>
  <input
    :value="modelValue"
    :type="type"
    :placeholder="placeholder"
    :aria-label="ariaLabel"
    :autocomplete="autocomplete"
    :disabled="disabled"
    class="kit-input"
    @input="onInput"
    @keyup.enter="emitEnter"
  >
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  modelValue: string
  type?: string
  placeholder?: string
  ariaLabel?: string
  autocomplete?: string
  disabled?: boolean
}>(), {
  type: 'text',
  placeholder: '',
  ariaLabel: 'Текстовое поле',
  autocomplete: 'off',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'enter:value', value: string): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function emitEnter(event: Event) {
  const target = event.target as HTMLInputElement
  emit('enter:value', target.value)
}
</script>

<style scoped lang="scss">
.kit-input {
  width: 100%;
  height: 46px;
  padding: 0 16px;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  border-radius: 999px;
  border: 1px solid rgb(var(--color-primary-rgb) / 0.55);
  background-color: rgb(var(--color-bg-rgb) / 0.92);
  color: var(--color-text);
  caret-color: var(--color-text);
  outline: none;
  transition: border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
  box-sizing: border-box;
  box-shadow: inset 0 1px 0 rgb(var(--color-text-rgb) / 0.04);
}
.kit-input::placeholder {
  color: rgb(var(--color-text-rgb) / 0.58);
}
.kit-input:hover:not(:disabled) {
  border-color: rgb(var(--color-primary-rgb) / 0.72);
  background-color: rgb(var(--color-bg-rgb) / 0.96);
}
.kit-input:focus-visible {
  border-color: rgb(var(--color-primary-rgb) / 0.88);
  box-shadow: 0 0 0 3px rgb(var(--color-primary-rgb) / 0.26);
  background-color: rgb(var(--color-bg-rgb) / 1);
}
.kit-input:focus,
.kit-input:active,
.kit-input:not(:placeholder-shown) {
  border-color: rgb(var(--color-primary-rgb) / 0.84);
}
.kit-input:disabled {
  opacity: 0.62;
  cursor: not-allowed;
  background-color: rgb(var(--color-bg-rgb) / 0.75);
  color: rgb(var(--color-text-rgb) / 0.78);
  border-color: rgb(var(--color-primary-rgb) / 0.4);
}
.kit-input:-webkit-autofill,
.kit-input:-webkit-autofill:hover,
.kit-input:-webkit-autofill:focus,
.kit-input:-webkit-autofill:active {
  -webkit-text-fill-color: var(--color-text) !important;
  box-shadow: 0 0 0 1000px rgb(var(--color-bg-rgb) / 1) inset !important;
  -webkit-box-shadow: 0 0 0 1000px rgb(var(--color-bg-rgb) / 1) inset !important;
  transition: background-color 9999s ease-in-out 0s;
}
</style>
