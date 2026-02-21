<template>
  <div class="post__card">
    <h2 class="post__card__title">{{ post.title }}</h2>
    <p class="post__card__excerpt">{{ post.excerpt }}</p>
    <div class="post__card__content" v-html="post.content" />
  </div>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

defineProps<{
  post: BlogPost
}>()
</script>

<style scoped lang="scss">
.post__card {
  background-color: #d70101;
  max-width: 768px;
  border: 1px solid white;
  border-radius: $radius-md;
  padding: 16px;
  box-shadow: 0 10px 24px rgba($color-primary, 0.14);
  display: grid;
  gap: 10px;
  transition: border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease;
}

.post__card:hover {
  border-color: rgba($color-primary, 0.65);
  box-shadow: 0 0 0 3px rgba($color-primary, 0.2), 0 14px 30px rgba($color-primary, 0.22);
  background: rgba(255, 255, 255, 0.06);
}

.post__card__title {
  margin: 0;
  font-size: 22px;
}

.post__card__excerpt {
  margin: 0;
  color: $color-muted;
}

.post__card__content :deep(a) {
  color: $color-primary;
  font-weight: 700;
}
</style>
