<!-- BaseAvatar.vue -->
<template>
  <div class="avatar"
       :class="{
      'avatar_sm': size === 'sm',
      'avatar_md': size === 'md',
      'avatar_lg': size === 'lg',
      'avatar_xl': size === 'xl',
    }"
       @click="$emit('click', $event)"
  >
    <img v-if="src"
         class="avatar__image"
         :src="src"
         :alt="alt"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  src: {type: String, default: '/avatar.jpg'},
  alt: {type: String, default: 'Картинка'},
  size: {type: String, default: 'md', validator: v => ['sm', 'md', 'lg', 'xl'].includes(v)},
})
</script>

<style scoped>
.avatar {
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

.avatar:hover {
}

/* Sizes */
.avatar_sm {
  width: 32px;
  height: 32px;
  border-width: 1px;
}

.avatar_md {
  width: 42px;
  height: 42px;
  border-width: 1px;
}


.avatar_lg {
  width: 64px;
  height: 64px;
  border-width: 2px;
}

.avatar_xl {
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
