<!-- BaseAvatar.vue -->
<template>
  <div
      class="avatar"
      :class="{
      'avatar--sm': size === 'sm',
      'avatar--lg': size === 'lg',
      'avatar--xl': size === 'xl',
      'avatar--clickable': clickable
    }"
      @click="$emit('click', $event)"
      @mouseenter="showInfo = true"
      @mouseleave="showInfo = false"
      ref="avatarRef"
      v-bind="$attrs"
  >
    <img
        v-if="src"
        :src="src"
        :alt="alt"
        class="avatar__image"
    />

    <!-- Телепортируем информацию в body -->
    <Teleport to="body">
      <div
          v-if="showInfo"
          class="avatar__info"
          :style="infoStyle"
      >
        <p class="avatar__info-name">{{ userName }}</p>
        <p class="avatar__info-role">{{ userRole }}</p>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  src: {type: String, default: '/avatar.jpg'},
  alt: {type: String, default: 'avatar'},
  size: {type: String, default: 'md', validator: v => ['sm', 'md', 'lg', 'xl'].includes(v)},
  userImg: {type: String, default: ''},
  userName: {type: String, default: ''},
  userLink: {type: String, default: ''},
  userRole: {type: String, default: ''},
  clickable: {type: Boolean, default: false}
})

const emit = defineEmits(['click', 'mouseover'])
const showInfo = ref(false)
const avatarRef = ref(null)
const infoPosition = ref({ top: 0, left: 0 })

// Вычисляем позицию для всплывающего окна
const infoStyle = computed(() => ({
  position: 'fixed',
  top: infoPosition.value.top + 'px',
  left: infoPosition.value.left + 'px',
  transform: 'translateX(-50%)',
  marginTop: '8px',
  zIndex: 9999
}))

// Обновляем позицию при появлении
const updatePosition = () => {
  if (avatarRef.value) {
    const rect = avatarRef.value.getBoundingClientRect()
    infoPosition.value = {
      top: rect.bottom,
      left: rect.left + rect.width / 2
    }
  }
}

// Следим за скроллом и ресайзом
const handleScroll = () => {
  if (showInfo.value) {
    updatePosition()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, true)
  window.addEventListener('resize', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll, true)
  window.removeEventListener('resize', handleScroll)
})

// Обновляем позицию при показе
watch(showInfo, (newVal) => {
  if (newVal) {
    updatePosition()
  }
})

const mouseOver = () => {
  emit('mouseover')
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
  cursor: default;
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
</style>

<!-- Глобальные стили для информации (не скопированные) -->
<style>
.avatar__info {
  position: fixed;
  width: 220px;
  padding: 12px 16px;
  background: rgb(var(--color-surface-rgb));
  border: 1px solid rgb(var(--color-border-rgb) / 0.2);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-lg);
  backdrop-filter: blur(8px);
  z-index: 9999;
  pointer-events: none;
  animation: fadeIn 0.2s ease;
}

.avatar__info::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%) rotate(45deg);
  width: 12px;
  height: 12px;
  background: rgb(var(--color-surface-rgb));
  border-left: 1px solid rgb(var(--color-border-rgb) / 0.2);
  border-top: 1px solid rgb(var(--color-border-rgb) / 0.2);
}

.avatar__info-name {
  font-weight: 600;
  font-size: 1rem;
  color: rgb(var(--color-text-rgb));
  margin: 0 0 4px 0;
}

.avatar__info-role {
  font-size: 0.875rem;
  color: rgb(var(--color-muted-rgb));
  margin: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-5px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}
</style>
