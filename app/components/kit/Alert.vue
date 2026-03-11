<template>
  <div
      class="kit-alert"
      :class="`kit-alert_${props.type}`"
      role="alert"
  >
    <div class="kit-alert__icon" aria-hidden="true">
      {{ icon }}
    </div>
    <div class="kit-alert__body">
      <h3
          v-if="title"
          class="kit-alert__title"
      >
        {{ title }}
      </h3>
      <p
          v-if="text"
          class="kit-alert__text"
      >
        {{ text }}
      </p>
      <slot/>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: ''
  },
  type: {
    type: String as () => 'info' | 'success' | 'warning' | 'error',
    default: 'info',
    validator: (v: string) => ['info', 'success', 'warning', 'error'].includes(v)
  }
})

const icon = computed(() => {
  switch (props.type) {
    case 'success':
      return '✓'
    case 'warning':
      return '!'
    case 'error':
      return '⨯'
    default:
      return 'ℹ'
  }
})
</script>

<style scoped>
.kit-alert {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 10px 12px;
  align-items: flex-start;
  width: 100%;
  padding: 12px 14px;
  border-radius: var(--radius-sm);
  border: 1px solid rgb(var(--color-border-rgb) / 0.35);
  background: rgb(var(--color-surface-2-rgb) / 0.7);
  color: rgb(var(--color-text-rgb));
}

.kit-alert__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  border-radius: 999px;
  font-size: 16px;
  font-weight: 700;
  background: rgb(var(--color-surface-rgb));
}

.kit-alert__body {
  display: grid;
  gap: 4px;
}

.kit-alert__title {
  margin: 0;
  font-size: 0.98rem;
  font-weight: 600;
}

.kit-alert__text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.5;
  color: rgb(var(--color-muted-rgb));
}

.kit-alert_info {
  border-color: rgb(var(--color-primary-rgb) / 0.4);
  background: rgb(var(--color-surface-2-rgb) / 0.8);
}

.kit-alert_success {
  border-color: rgb(var(--color-success-rgb) / 0.6);
  background: rgb(22 163 74 / 0.12);
}

.kit-alert_warning {
  border-color: rgb(var(--color-accent-rgb) / 0.6);
  background: rgb(234 179 8 / 0.12);
}

.kit-alert_error {
  border-color: rgb(var(--color-danger-rgb) / 0.7);
  background: rgb(220 38 38 / 0.12);
}

@media (max-width: 600px) {
  .kit-alert {
    grid-template-columns: auto 1fr;
    padding: 10px 12px;
  }

  .kit-alert__title {
    font-size: 0.94rem;
  }

  .kit-alert__text {
    font-size: 0.86rem;
  }
}
</style>

