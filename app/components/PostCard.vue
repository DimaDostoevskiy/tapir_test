<template>
  <div class="post__card">
    <div class="card__image__wrapper">
      <img
        v-if="displayImageSrc && !isImageBroken"
        class="post__card__image"
        :src="displayImageSrc"
        :alt="`Изображение к посту: ${post.title}`"
        loading="lazy"
        @error="handleImageError"
      >
      <div v-else class="post__card__title">Нет изображения</div>
    </div>
    <div class="post__card__body">
      <h2 class="post__card__title">{{ post.title }}</h2>
      <p class="post__card__excerpt">{{ post.excerpt }}</p>
      <div class="post__card__content" v-html="post.content" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

type BlogPostWithImage = BlogPost & {
  image?: string | null
  imageUrl?: string | null
  cover?: string | null
}

const props = defineProps<{
  post: BlogPost
}>()

const placeholderImageSrc = 'https://placehold.co/1200x620/222222/fafafa?text=Post+image'
const isImageBroken = ref(false)

const displayImageSrc = computed(() => {
  const postWithImage = props.post as BlogPostWithImage
  return postWithImage.image?.trim()
    || postWithImage.imageUrl?.trim()
    || postWithImage.cover?.trim()
    || placeholderImageSrc
})

watch(() => props.post.id, () => {
  isImageBroken.value = false
})

function handleImageError() {
  isImageBroken.value = true
}
</script>

<style scoped lang="scss">
.post__card {
  border: 1px solid rgba(250, 250, 250, 0.18);
  border-radius: $radius-md;
  padding: 14px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.015));
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  display: grid;
  gap: 10px;
  transition: transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
}

.post__card:hover {
  border-color: rgba($color-primary, 0.88);
  box-shadow: 0 0 0 3px rgba($color-primary, 0.24), 0 16px 34px rgba($color-primary, 0.3);
}

.post__card__image {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.post__card__body {
  display: grid;
  gap: 1px;
  padding-inline: 6px;
  height: 200px;
}


.post__card__title {
  font-size: clamp(20px, 2.2vw, 26px);
  letter-spacing: -0.25px;
  line-height: 1.22;
  font-weight: 800;
  color: $color-text;
  text-wrap: balance;
  margin-bottom: 8px;
}

.post__card__excerpt {
  margin: 0;
  color: rgba(250, 250, 250, 0.72);
  font-size: 15px;
  line-height: 1.6;
  max-width: 78ch;
}

.post__card__content {
  color: rgba(250, 250, 250, 0.88);
  font-size: 15px;
  line-height: 1.7;
  letter-spacing: 0.1px;
  height: 60px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, #000 65%, transparent 100%);
  overflow-wrap: anywhere;
}

.post__card__content :deep(p) {
  margin: 0;
}

.post__card__content :deep(p + p) {
  margin-top: 10px;
}

.post__card__content :deep(a) {
  color: $color-primary;
  font-weight: 700;
  text-decoration: underline;
}
</style>
