<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <h1 class="admin-page__title">Посты</h1>
      <div class="admin-page__actions">
        <a :href="baseUrl + 'admin/blog/create'" class="link-btn link-btn--primary">Создать пост</a>
      </div>
    </header>

    <div class="admin-page__list scroll">
      <p v-if="pending" class="admin-page__state">Загрузка...</p>
      <p v-else-if="error" class="admin-page__state admin-page__state--error">Не удалось загрузить список</p>

      <div v-else class="admin-post-list">
      <article v-for="post in posts || []" :key="post.id" class="admin-post-list__item">
        <div class="admin-post-list__main">
          <h2 class="admin-post-list__title">{{ post.title }}</h2>
          <p class="admin-post-list__meta">
            {{ post.slug }} · {{ post.published ? 'Опубликован' : 'Черновик' }}
          </p>
        </div>
        <div class="admin-post-list__actions">
          <a :href="baseUrl + 'admin/blog/' + post.id + '/edit'" class="link-btn link-btn--outline link-btn--sm">Редактировать</a>
          <KitButton type="button" variant="danger" size="sm" @click="removePost(post.id)">Удалить</KitButton>
        </div>
      </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {BlogPost} from '~/types/blog'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Админка',
})

const { app: appConfig } = useRuntimeConfig()
const baseUrl = appConfig.baseURL || '/blog/'
const {data: posts, pending, error, refresh} = await useFetch<BlogPost[]>('/api/posts/get-all')

async function removePost(id: number) {
  if (!confirm('Удалить пост?')) {
    return
  }

  await $fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  } as Record<string, unknown>)

  await refresh()
}
</script>

<style scoped>
.admin-page {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: clamp(16px, 4vw, 32px);
  max-width: min(900px, 100%);
  margin: 0 auto;
  height: 100vh;
  min-height: 0;
}

.admin-page__list {
  flex: 1;
  min-height: 0;
  padding-bottom: 100px;
  margin-top: 20px;
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
  font-size: clamp(1.375rem, 3.5vw, 1.875rem);
  font-weight: 600;
}

.admin-page__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.admin-page__state {
  margin: 0;
  color: var(--color-muted);
}

.admin-page__state--error {
  color: var(--color-danger);
}

.admin-post-list {
  display: grid;
  gap: 12px;
}

.admin-post-list__item {
  padding: 16px 20px;
  background: rgb(var(--color-surface-rgb) / 0.5);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  flex-wrap: wrap;
}

.admin-post-list__title {
  margin: 0;
  font-size: 1.0625rem;
  font-weight: 600;
  line-height: 1.35;
}

.admin-post-list__meta {
  margin: 4px 0 0;
  font-size: 0.875rem;
  color: var(--color-muted);
}

.admin-post-list__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 40px;
}
</style>
