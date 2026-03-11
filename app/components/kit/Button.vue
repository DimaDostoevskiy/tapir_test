<script setup>
import {computed} from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: v => ['primary', 'secondary', 'outline', 'danger', 'success'].includes(v)
  },
  type: {
    type: String,
    default: 'button'
  },
  text: {
    type: String,
    default: null
  },
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  disabled: Boolean,
  loading: Boolean,
  fullWidth: Boolean,
  icon: {
    type: String,
    default: ''
  },
  iconRight: {
    type: String,
    default: ''
  },
  iconPosition: {
    type: String,
    default: 'left',
    validator: v => ['left', 'right'].includes(v)
  }
})

const emit = defineEmits(['click'])

const btnClasses = computed(() => ({
  'kit-button_primary': props.variant === 'primary',
  'kit-button_secondary': props.variant === 'secondary',
  'kit-button_outline': props.variant === 'outline',
  'kit-button_danger': props.variant === 'danger',
  'kit-button_success': props.variant === 'success',
  'kit-button_lg': props.size === 'lg',
  'kit-button_sm': props.size === 'sm',
  'kit-button_full': props.fullWidth,
  'kit-button_loading': props.loading,
  'kit-button_disabled': props.disabled
}))

const clickHandler = (e) => {
  if (props.disabled || props.loading) {
    e.preventDefault()
    return
  }
  if (!props.to) {
    emit('click')
  }
}
</script>

<template>
  <div class="kit-button__wrap"
       :class="{ 'kit-button__wrap_full': fullWidth }"
  >
    <button type: props.type
            disabled: props.disabled
            props.loading
            class="kit-button"
            :class="btnClasses"
            @click="clickHandler"
    >
      <span v-if="loading" class="kit-button__spinner"/>
      <span v-if="icon && !loading"
            class="kit-button__icon"
            :class="{ 'kit-button__icon_right': iconPosition === 'right' }"
      >{{ icon }}</span>
      <span v-if="(text || $slots.default) && !loading"
            class="kit-button__text"
      >
        <slot>{{ text }}</slot>
      </span>
      <span v-if="iconRight && !loading"
            class="kit-button__icon kit-button__icon_right"
      >{{ iconRight }}</span>
    </button>
  </div>
</template>

<style scoped>
.kit-button__wrap {
  display: inline-block;
}

.kit-button__wrap_full {
  width: 100%;
}

.kit-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: 1px solid transparent;
  border-radius: var(--radius-sm);
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.02em;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
  width: auto;
}

.kit-button_full {
  width: 100%;
}

.kit-button_primary {
  background: rgb(var(--color-primary-rgb));
  color: rgb(var(--color-bg-rgb));
}

.kit-button_primary:hover:not(:disabled) {
  background: rgb(var(--color-primary-hover-rgb));
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.kit-button_secondary {
  background: rgb(var(--color-surface-rgb));
  color: rgb(var(--color-text-rgb));
  border-color: rgb(var(--color-border-rgb) / 0.2);
}

.kit-button_secondary:hover:not(:disabled) {
  background: rgb(var(--color-surface-2-rgb));
  border-color: rgb(var(--color-border-rgb) / 0.4);
  transform: translateY(-1px);
}

.kit-button_outline {
  background: transparent;
  color: rgb(var(--color-text-rgb));
  border-color: rgb(var(--color-border-rgb) / 0.5);
}

.kit-button_outline:hover:not(:disabled) {
  background: rgb(var(--color-surface-2-rgb) / 0.5);
  border-color: rgb(var(--color-primary-rgb));
  transform: translateY(-1px);
}

.kit-button_danger {
  background: rgb(var(--color-danger-rgb));
  color: white;
}

.kit-button_danger:hover:not(:disabled) {
  background: rgb(var(--color-error-rgb));
  transform: translateY(-1px);
  box-shadow: 0 0 0 3px rgb(var(--color-danger-rgb) / 0.3);
}

.kit-button_success {
  background: rgb(var(--color-success-rgb));
  color: white;
}

.kit-button_success:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 0 0 3px rgb(var(--color-success-rgb) / 0.3);
}

.kit-button_sm {
  padding: 8px 16px;
  font-size: 0.875rem;
  border-radius: calc(var(--radius-sm) - 4px);
  gap: 6px;
}

.kit-button_lg {
  padding: 16px 32px;
  font-size: 1.125rem;
  border-radius: var(--radius-md);
  gap: 12px;
}

.kit-button:focus-visible {
  box-shadow: 0 0 0 3px rgb(var(--color-primary-rgb) / 0.4);
}

.kit-button_disabled,
.kit-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.kit-button_loading {
  cursor: wait;
  opacity: 0.8;
  pointer-events: none;
}

.kit-button__spinner {
  width: 1.2em;
  height: 1.2em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: kit-button-spin 0.6s linear infinite;
}

@keyframes kit-button-spin {
  to {
    transform: rotate(360deg);
  }
}

.kit-button__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  line-height: 1;
}

.kit-button__icon_right {
  order: 2;
}

.kit-button__text {
  width: 100%;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.03em;
}
</style>
