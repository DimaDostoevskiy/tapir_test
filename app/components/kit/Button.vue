<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="buttonClass"
    @click="onClick"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'primary' | 'ghost'
  size?: 'sm' | 'md'
  disabled?: boolean
}>(), {
  type: 'button',
  variant: 'default',
  size: 'md',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonClass = computed(() => [
  'kit-button',
  `kit-button--${props.variant}`,
  `kit-button--${props.size}`,
])

function onClick(event: MouseEvent) {
  if (props.disabled) {
    event.preventDefault()
    return
  }
  emit('click', event)
}
</script>

<style scoped lang="scss">
.kit-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  height: 40px;
  border-radius: 999px;
  border: 1px solid rgba(250, 250, 250, 0.2);
  background: rgba(255, 255, 255, 0.04);
  color: $color-text;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
  transition: transform 120ms ease, box-shadow 120ms ease, border-color 120ms ease, background-color 120ms ease, color 120ms ease, opacity 120ms ease;
  box-sizing: border-box;
  flex-shrink: 0;
}

.kit-button--md {
  padding: 0 16px;
  font-size: 14px;
}

.kit-button--default {
  border-color: rgba(250, 250, 250, 0.2);
  background: rgba(255, 255, 255, 0.04);
  color: $color-text;
}

.kit-button--sm {
  height: 34px;
  padding: 0 14px;
  font-size: 13px;
}

.kit-button--primary {
  background: linear-gradient(135deg, rgba($color-primary, 0.96), rgba($color-primary-hover, 0.92));
  border-color: rgba($color-primary, 0.55);
  color: #ffffff;
}

.kit-button--default:hover {
  background: rgba(255, 255, 255, 0.07);
  border-color: rgba(250, 250, 250, 0.28);
  box-shadow: 0 0 0 2px rgba(250, 250, 250, 0.08);
}

.kit-button--primary:hover {
  border-color: rgba($color-primary, 0.72);
  box-shadow: 0 0 0 3px rgba($color-primary, 0.2);
}

.kit-button--ghost {
  background: transparent;
  border-color: $color-border;
  color: $color-text;
}

.kit-button--ghost:hover {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(250, 250, 250, 0.22);
  box-shadow: 0 0 0 2px rgba(250, 250, 250, 0.08);
}

.kit-button:active {
  transform: translateY(1px);
}

.kit-button:focus-visible {
  @include focus-ring;
}

.kit-button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}
</style>
