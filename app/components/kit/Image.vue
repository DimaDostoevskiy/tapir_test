<template>
  <NuxtImg class="kit-image"
           fit="cover"
           :src="isError ? imageSrc : defaultImage"
           :alt="alt"
           :loading="loading"
           @error="handleError"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  path: {
    type: String || undefined || null,
    default: ''
  },
  alt: {
    type: String,
    default: 'Изображение'
  },
  loading: {
    type: String,
    default: 'lazy'
  },
  defaultImage: {
    type: String,
    default: `https://images.wallpaperscraft.ru/image/single/devushka_uedinenie_art_129798_1600x900.jpg`
  }
})

const isError = ref(false)
const imageSrc = ref(props.path)

const handleError = () => {
  isError.value = true
}

watch(() => (props.path), (newPath) => {
  imageSrc.value = newPath
  isError.value = false
})
</script>

<style scoped>
.kit-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}
</style>
