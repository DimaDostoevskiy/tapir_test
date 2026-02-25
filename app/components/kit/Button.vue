<!-- BaseButton.vue -->
<template>
  <div :class="{ 'btn-wrap--full': fullWidth }">
    <component
        :is="props.to ? 'NuxtLink' : 'button'"
        v-bind="tagAttrs"
        class="btn"
        :class="btnClasses"
        @click="clickHandler"
    >
      <span class="btn__spinner" v-if="loading"/>
      <span class="btn__icon" v-if="icon && !loading" :class="iconPosition">{{ icon }}</span>
      <span v-if="(text || $slots.default) && !loading" class="btn__text">
        <slot>{{ text }}</slot>
      </span>
      <span class="btn__icon btn__icon--right" v-if="iconRight && !loading">{{ iconRight }}</span>
    </component>
  </div>
</template>

<script setup>
import {computed} from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: v => ['primary', 'secondary', 'outline', 'danger', 'success'].includes(v)
  },
  type: {type: String, default: 'button'},
  text: {type: String, default: null},
  to: {type: String, default: null},
  size: {
    type: String,
    default: 'md',
    validator: v => ['sm', 'md', 'lg'].includes(v)
  },
  disabled: Boolean,
  loading: Boolean,
  fullWidth: Boolean,
  icon: String,
  iconRight: String,
  iconPosition: {
    type: String,
    default: 'left',
    validator: v => ['left', 'right'].includes(v)
  }
})

const emit = defineEmits(['click'])

const btnClasses = computed(() => ({
  'btn--primary': props.variant === 'primary',
  'btn--secondary': props.variant === 'secondary',
  'btn--outline': props.variant === 'outline',
  'btn--danger': props.variant === 'danger',
  'btn--success': props.variant === 'success',
  'btn--lg': props.size === 'lg',
  'btn--sm': props.size === 'sm',
  'btn--full': props.fullWidth,
  'btn--loading': props.loading,
  'btn--disabled': props.disabled
}))

const attrs = useAttrs()
const tagAttrs = computed(() =>
  props.to
    ? { to: props.to, ...attrs }
    : { type: props.type, disabled: props.disabled || props.loading, ...attrs }
)

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

<style scoped>
.btn {
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

.btn-wrap--full {
  width: 100%;
}

/* eslint-disable */
.btn--full {
  width: 100%;
}

/* Variants */
.btn--primary {
  background: rgb(var(--color-primary-rgb));
  color: rgb(var(--color-bg-rgb));
}

.btn--primary:hover:not(:disabled) {
  background: rgb(var(--color-primary-hover-rgb));
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.btn--secondary {
  background: rgb(var(--color-surface-rgb));
  color: rgb(var(--color-text-rgb));
  border-color: rgb(var(--color-border-rgb) / 0.2);
}

.btn--secondary:hover:not(:disabled) {
  background: rgb(var(--color-surface-2-rgb));
  border-color: rgb(var(--color-border-rgb) / 0.4);
  transform: translateY(-1px);
}

.btn--outline {
  background: transparent;
  color: rgb(var(--color-text-rgb));
  border-color: rgb(var(--color-border-rgb) / 0.5);
}

.btn--outline:hover:not(:disabled) {
  background: rgb(var(--color-surface-2-rgb) / 0.5);
  border-color: rgb(var(--color-primary-rgb));
  transform: translateY(-1px);
}

.btn--danger {
  background: rgb(var(--color-danger-rgb));
  color: white;
}

.btn--danger:hover:not(:disabled) {
  background: rgb(var(--color-error-rgb));
  transform: translateY(-1px);
  box-shadow: 0 0 0 3px rgb(var(--color-danger-rgb) / 0.3);
}

.btn--success {
  background: rgb(var(--color-success-rgb));
  color: white;
}

.btn--success:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-1px);
  box-shadow: 0 0 0 3px rgb(var(--color-success-rgb) / 0.3);
}

/* Sizes */
.btn--sm {
  padding: 8px 16px;
  font-size: 0.875rem;
  border-radius: calc(var(--radius-sm) - 4px);
  gap: 6px;
}

.btn--lg {
  padding: 16px 32px;
  font-size: 1.125rem;
  border-radius: var(--radius-md);
  gap: 12px;
}

/* States */
.btn:focus-visible {
  box-shadow: 0 0 0 3px rgb(var(--color-primary-rgb) / 0.4);
}

.btn--disabled,
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.btn--loading {
  cursor: wait;
  opacity: 0.8;
  pointer-events: none;
}

/* eslint-enable */
/* Spinner */
.btn__spinner {
  width: 1.2em;
  height: 1.2em;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

/* Icon */
.btn__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  line-height: 1;
}

.btn__icon--right {
  order: 2;
}

/* Text styles */
.btn__text {
  width: 100%;
  font-weight: 600;
  text-transform: none;
  letter-spacing: 0.03em;
}
</style>
