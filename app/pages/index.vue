<template>
  <section id="posts" class="blog-page container">
    <header class="blog-page__header">
      <h1 class="blog-page__title">Посты (mock)</h1>
      <p class="blog-page__subtitle">Одна страница с лентой постов</p>
    </header>

    <div class="blog-list">
      <PostCard v-for="post in mockPosts" :key="post.id" :post="post" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { mockPosts } from '~/utils/mockPosts'

useSeoMeta({
  title: 'Посты — Pro Moto Blog',
})
</script>
