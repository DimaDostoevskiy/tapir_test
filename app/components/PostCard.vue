<template>
  <article class="blog-list__item">
    <h2 class="blog-list__title">{{ post.title }}</h2>
    <p class="blog-list__excerpt">{{ post.excerpt }}</p>
    <p>{{ post.content }}</p>
  </article>
</template>

<script setup lang="ts">
import type { MockPost } from '~/utils/mockPosts'

defineProps<{
  post: MockPost
}>()
</script>
