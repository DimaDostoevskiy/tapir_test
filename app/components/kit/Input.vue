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
  height: 40px;
  padding: 0 14px;
  font-size: 14px;
  line-height: 1;
  font-weight: 500;
  border-radius: 999px;
  border: 1px solid rgba($color-primary, 0.55);
  background-color: #000000 !important;
  color: #ffffff !important;
  caret-color: #ffffff;
  outline: none;
  transition: border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
  box-sizing: border-box;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
.kit-input::placeholder {
  color: rgba(250, 250, 250, 0.58);
}
.kit-input:hover:not(:disabled) {
  border-color: rgba($color-primary, 0.72);
  background-color: #000000 !important;
}
.kit-input:focus-visible {
  border-color: rgba($color-primary, 0.88);
  box-shadow: 0 0 0 3px rgba($color-primary, 0.26);
  background-color: #000000 !important;
}
.kit-input:focus,
.kit-input:active,
.kit-input:not(:placeholder-shown) {
  border-color: rgba($color-primary, 0.84);
}
.kit-input:disabled {
  opacity: 0.62;
  cursor: not-allowed;
  background-color: #000000 !important;
  color: rgba(255, 255, 255, 0.78) !important;
  border-color: rgba($color-primary, 0.4);
}
.kit-input:-webkit-autofill,
.kit-input:-webkit-autofill:hover,
.kit-input:-webkit-autofill:focus,
.kit-input:-webkit-autofill:active {
  -webkit-text-fill-color: #ffffff !important;
  box-shadow: 0 0 0 1000px #000000 inset !important;
  -webkit-box-shadow: 0 0 0 1000px #000000 inset !important;
  transition: background-color 9999s ease-in-out 0s;
}
</style>
