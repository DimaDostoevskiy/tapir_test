<template>
  <article class="blog-list__item">
    <h2 class="blog-list__title">{{ post.title }}</h2>
    <p class="blog-list__excerpt">{{ post.excerpt }}</p>
    <div class="post-card__content" v-html="post.content" />
  </article>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

defineProps<{
  post: BlogPost
}>()
</script>

<style scoped lang="scss">
.post-card__content :deep(a) {
  color: $color-primary;
  text-decoration: underline;
}
</style>
