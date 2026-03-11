<template>
  <div class="kit-avatar"
       :class="{
      'kit-avatar_sm': size === 'sm',
      'kit-avatar_md': size === 'md',
      'kit-avatar_lg': size === 'lg',
      'kit-avatar_xl': size === 'xl'
    }"
       @click="$emit('click', $event)"
  >
    <img v-if="src"
         class="kit-avatar__image"
         :src="src"
         :alt="alt"
    />
  </div>
</template>

<script setup>
defineProps({
  src: {type: String, default: `https://motodart.pro/files/avatar.jpg`},
  alt: {type: String, default: 'Картинка'},
  size: {type: String, default: 'md', validator: v => ['sm', 'md', 'lg', 'xl'].includes(v)},
})

defineEmits(['click'])
</script>

<style scoped>
.kit-avatar {
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--color-primary);
  cursor: pointer;
  transition: all 0.1s;
  margin-right: 8px;
}

.kit-avatar_sm {
  width: 32px;
  height: 32px;
  border-width: 1px;
}

.kit-avatar_md {
  width: 42px;
  height: 42px;
  border-width: 1px;
}

.kit-avatar_lg {
  width: 64px;
  height: 64px;
  border-width: 2px;
}

.kit-avatar_xl {
  width: 96px;
  height: 96px;
  border-width: 3px;
}

.kit-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
</style>
