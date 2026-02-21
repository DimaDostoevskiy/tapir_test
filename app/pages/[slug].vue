<template>
  <article v-if="post" class="blog-post container">
    <header class="blog-post__header">
      <h1 class="blog-post__title">{{ post.title }}</h1>
      <p class="blog-post__meta">Обновлено: {{ formattedDate }}</p>
    </header>

    <p v-if="post.excerpt" class="blog-post__excerpt">{{ post.excerpt }}</p>
    <div class="blog-post__content">
      <p v-for="(paragraph, idx) in paragraphs" :key="idx">{{ paragraph }}</p>
    </div>
  </article>

  <section v-else class="container">
    <p class="blog-page__state blog-page__state--error">Пост не найден</p>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

const route = useRoute()

const { data: post } = await useFetch<BlogPost | null>(() => `/api/posts/${route.params.slug}`)

useSeoMeta({
  title: () => (post.value ? `${post.value.title} — pro_moto_blog` : 'Пост — pro_moto_blog'),
})

const paragraphs = computed(() => post.value?.content.split(/\n{2,}/).filter(Boolean) || [])
const formattedDate = computed(() => {
  if (!post.value) return ''
  return new Date(post.value.updatedAt).toLocaleDateString('ru-RU')
})
</script>

<style scoped lang="scss">
.blog-post {
  display: grid;
  gap: 16px;
}

.blog-post__header {
  display: grid;
  gap: 8px;
}

.blog-post__title {
  margin: 0;
  font-size: 34px;
}

.blog-post__meta {
  margin: 0;
  color: $color-muted;
}

.blog-post__excerpt {
  margin: 0;
  color: $color-accent;
}

.blog-post__content {
  border: 1px solid $color-border;
  border-radius: $radius-md;
  padding: 18px;
  line-height: 1.65;
  background: rgb(var(--color-text-rgb) / 0.02);
}

.blog-page__state {
  margin: 0;
  color: $color-muted;
}

.blog-page__state--error {
  color: $color-error;
}
</style>
