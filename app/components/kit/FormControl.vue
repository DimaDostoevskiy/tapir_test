<template>
  <textarea
    v-if="as === 'textarea'"
    :value="modelValue"
    class="kit-form-control kit-form-control--textarea"
    v-bind="attrs"
    @input="onInput"
  />
  <input
    v-else
    :value="modelValue"
    class="kit-form-control"
    v-bind="attrs"
    @input="onInput"
  >
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

const props = withDefaults(defineProps<{
  modelValue: string | number
  as?: 'input' | 'textarea'
}>(), {
  as: 'input',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | number): void
}>()

const attrs = useAttrs()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement | HTMLTextAreaElement

  if (target instanceof HTMLInputElement && target.type === 'number') {
    if (target.value === '') {
      emit('update:modelValue', '')
      return
    }

    const parsed = Number(target.value)
    emit('update:modelValue', Number.isNaN(parsed) ? target.value : parsed)
    return
  }

  emit('update:modelValue', target.value)
}
</script>

<style scoped>
.kit-form-control {
  width: 100%;
  min-height: 46px;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background: rgb(var(--color-surface-rgb) / 0.8);
  color: var(--color-text);
  padding: 10px 14px;
  line-height: 1.45;
  transition: border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
}

.kit-form-control::placeholder {
  color: rgb(var(--color-text-rgb) / 0.6);
}

.kit-form-control:hover:not(:disabled) {
  border-color: rgb(var(--color-primary-rgb) / 0.5);
  background: rgb(var(--color-surface-rgb) / 0.92);
}

.kit-form-control:focus-visible {
  outline: 2px solid rgb(var(--color-primary-rgb) / 0.55);
  outline-offset: 1px;
  border-color: rgb(var(--color-primary-rgb) / 0.75);
  background: rgb(var(--color-surface-rgb) / 1);
}

.kit-form-control:disabled {
  opacity: 0.62;
  cursor: not-allowed;
}

.kit-form-control--textarea {
  min-height: auto;
  resize: vertical;
}
</style>
