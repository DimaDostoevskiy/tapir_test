<!-- BaseAvatar.vue -->
<template>
  <div
      class="avatar"
      :class="{
      'avatar--clickable': clickable,
      'avatar--sm': size === 'sm',
      'avatar--lg': size === 'lg',
      'avatar--xl': size === 'xl'
    }"
      @click="$emit('click', $event)"
      v-bind="$attrs"
  >
    <img
        v-if="src"
        :src="src"
        :alt="alt"
        class="avatar__image"
        @error="handleError"
    />
    <div v-else class="avatar__fallback">
      <slot>{{ initials }}</slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  src: String,
  alt: { type: String, default: 'avatar' },
  size: { type: String, default: 'md', validator: v => ['sm', 'md', 'lg', 'xl'].includes(v) },
  name: String, // для инициалов
  clickable: { type: Boolean, default: false }
})

const emit = defineEmits(['click', 'error'])

const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
})

const handleError = (e) => {
  emit('error', e)
}
</script>

<style scoped>
.avatar {
  position: relative;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  overflow: hidden;
  background: rgb(var(--color-surface-2-rgb));
  color: rgb(var(--color-text-rgb));
  border: 2px solid rgb(var(--color-border-rgb) / 0.1);
  transition: all 0.2s ease;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar--clickable {
  cursor: pointer;
}

.avatar--clickable:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
  border-color: rgb(var(--color-primary-rgb) / 0.3);
}

/* Sizes */
.avatar--sm {
  width: 32px;
  height: 32px;
  border-width: 1.5px;
}

.avatar--lg {
  width: 64px;
  height: 64px;
  border-width: 2px;
}

.avatar--xl {
  width: 96px;
  height: 96px;
  border-width: 3px;
}

.avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avatar__fallback {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  background: rgb(var(--color-primary-rgb) / 0.2);
  color: rgb(var(--color-primary-rgb));
}

.avatar--sm .avatar__fallback {
  font-size: 0.75rem;
}

.avatar--lg .avatar__fallback {
  font-size: 1.25rem;
}

.avatar--xl .avatar__fallback {
  font-size: 2rem;
}
</style>
