<template>
  <section class="blog-page container">
    <header class="blog-page__header">
      <h1 class="blog-page__title">Блог</h1>
      <p class="blog-page__subtitle">Публичная лента статей</p>
    </header>

    <p v-if="pending" class="blog-page__state">Загрузка...</p>
    <p v-else-if="error" class="blog-page__state blog-page__state--error">Не удалось загрузить посты</p>

    <div v-else-if="posts?.length" class="blog-list">
      <article v-for="post in posts" :key="post.id" class="blog-list__item">
        <h2 class="blog-list__title">
          <NuxtLink :to="`/blog/${post.slug}`">{{ post.title }}</NuxtLink>
        </h2>
        <p class="blog-list__excerpt">{{ post.excerpt || 'Без описания' }}</p>
        <NuxtLink class="blog-list__link" :to="`/blog/${post.slug}`">Читать</NuxtLink>
      </article>
    </div>

    <p v-else class="blog-page__state">Постов пока нет</p>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

useSeoMeta({
  title: 'Блог — Tapir',
})

const { data: posts, pending, error } = await useFetch<BlogPost[]>('/api/posts')
</script>
