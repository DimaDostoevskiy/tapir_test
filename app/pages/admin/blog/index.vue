<template>
  <section class="admin-page container">
    <header class="admin-page__header">
      <h1 class="admin-page__title">Админка: посты</h1>
      <div class="admin-page__actions">
        <KitButton to="/admin/blog/create" variant="primary">Создать пост</KitButton>
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
          <KitButton :to="`/admin/blog/${post.id}/edit`">Редактировать</KitButton>
          <KitButton type="button" @click="removePost(post.id)">Удалить</KitButton>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

definePageMeta({
  middleware: ['auth'],
})

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

<style scoped lang="scss">
.admin-page {
  display: grid;
  gap: 16px;
}

.admin-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.admin-page__title {
  margin: 0;
  font-size: 30px;
}

.admin-page__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.blog-page__state {
  margin: 0;
  color: var(--color-primary);
}

.blog-page__state--error {
  color: var(--color-error);
}

.admin-post-list {
  display: grid;
  gap: 12px;
}

.admin-post-list__item {
  border: 1px solid var(--color-border);
  border-radius: $radius-sm;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  flex-wrap: wrap;
}

.admin-post-list__title {
  margin: 0;
}

.admin-post-list__meta {
  margin: 6px 0 0;
  color: var(--color-primary);
}

.admin-post-list__actions {
  display: flex;
  gap: 8px;
}
</style>
