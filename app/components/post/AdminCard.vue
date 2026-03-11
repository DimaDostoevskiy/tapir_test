<template>
  <div class="admin-card">
    <div class="admin-card__media">
      <img class="admin-card__media-image"
           v-if="post.image?.trim() && !isImageBroken"
           :src="post.image?.trim()"
           :alt="`Изображение к посту: ${post.title}`"
           loading="lazy"
           @error="handleImageError"
      />
      <div v-else class="admin-card__media-fallback">Нет изображения</div>
    </div>
    <div class="admin-card__body">
      <h2 class="admin-card__title">{{ post.title }}</h2>
      <p class="admin-card__description">{{ post.description }}</p>
      <div class="admin-card__content" v-html="post.content"/>
    </div>
    <NuxtLink class="link-btn link-btn_outline"
              :to="`/admin/post/edit/${post.id}`"
    >Редактировать пост
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type {BlogPost} from '~/types/blog'

defineProps({
  post: {
    type: Object as () => BlogPost,
    required: true
  }
})

const isImageBroken = ref(false)

const handleImageError = () => {
  isImageBroken.value = true
}
</script>

<style scoped>
.admin-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  border: 1px solid rgb(var(--color-primary-rgb) / 0.44);
  border-radius: 16px;
  margin: 8px;
  padding: 8px;
}

.admin-card:hover {
  border-color: rgb(var(--color-primary-rgb) / 0.88);
  box-shadow: 0 0 0 3px rgb(var(--color-primary-rgb) / 0.24), 0 16px 34px rgb(var(--color-primary-rgb) / 0.3);
}

.admin-card__media {
  min-height: 100%;
  min-width: 100%;
  width: fit-content;
  border: 1px solid white;
  border-radius: 8px;
}

.admin-card__media-image {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.admin-card__media-fallback {
  aspect-ratio: 16 / 9;
  display: grid;
  place-items: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: var(--radius-sm);
  color: var(--color-muted);
  font-weight: 600;
}

.admin-card__body {
  min-width: 100%;
  text-align: left;
}

.admin-card__title {
  font-size: clamp(20px, 2.2vw, 26px);
  letter-spacing: -0.25px;
  line-height: 1.22;
  font-weight: 800;
  color: var(--color-text);
  text-wrap: balance;
}

.admin-card__description {
  margin: 0;
  color: rgba(250, 250, 250, 0.72);
  font-size: 15px;
  line-height: 1.6;
  max-width: 78ch;
}

.admin-card__content {
  position: relative;
  color: rgba(250, 250, 250, 0.88);
  font-size: 15px;
  line-height: 1.7;
  letter-spacing: normal;
  height: 60px;
  overflow: hidden;
  mask-image: linear-gradient(to bottom, #000 48%, transparent 100%);
  overflow-wrap: anywhere;
}

.admin-card__content::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 26px;
  pointer-events: none;
  background: linear-gradient(
      to bottom,
      rgba(22, 22, 22, 0),
      rgba(22, 22, 22, 0.72)
  );
}

@media (max-width: 900px) {
  .admin-card__body {
    height: auto;
    gap: 8px;
  }

  .admin-card__content {
    height: auto;
    max-height: 88px;
  }
}
</style>
