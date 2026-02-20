<template>
  <section class="admin-page container">
    <header class="admin-page__header">
      <h1 class="admin-page__title">Админка: посты</h1>
      <div class="admin-page__actions">
        <NuxtLink class="button button--primary" to="/admin/blog/create">Создать пост</NuxtLink>
      </div>
    </header>

    <p v-if="pending" class="blog-page__state">Загрузка...</p>
    <p v-else-if="error" class="blog-page__state blog-page__state--error">Не удалось загрузить список</p>

    <div v-else class="admin-post-list">
      <article v-for="post in posts || []" :key="post.id" class="admin-post-list__item">
        <div class="admin-post-list__main">
          <h2 class="admin-post-list__title">{{ post.title }}</h2>
          <p class="admin-post-list__meta">
            slug: {{ post.slug }} • {{ post.published ? 'Опубликован' : 'Черновик' }}
          </p>
        </div>
        <div class="admin-post-list__actions">
          <NuxtLink class="button" :to="`/admin/blog/${post.id}/edit`">Редактировать</NuxtLink>
          <button class="button" type="button" @click="removePost(post.id)">Удалить</button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

useSeoMeta({
  title: 'Админка — Tapir',
})

const { data: posts, pending, error, refresh } = await useFetch<BlogPost[]>('/api/admin/posts')

async function removePost(id: number) {
  if (!confirm('Удалить пост?')) {
    return
  }

  await $fetch(`/api/admin/posts/${id}`, {
    method: 'DELETE',
  })

  await refresh()
}
</script>
