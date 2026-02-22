<template>
  <section class="admin-page container">
    <header class="admin-page__header">
      <h1 class="admin-page__title">Редактировать пост</h1>
      <KitButton to="/admin/blog" variant="ghost">Назад к списку</KitButton>
    </header>

    <PostForm v-model="form" :loading="loading" submit-label="Сохранить" @submit="submit"/>

    <p v-if="errorMessage" class="blog-page__state blog-page__state--error">{{ errorMessage }}</p>
  </section>
</template>

<script setup lang="ts">
import PostForm from '~/components/admin/PostForm.vue'
import type {BlogPost, PostFormPayload} from '~/types/blog'

definePageMeta({
  middleware: ['auth'],
})

const route = useRoute()
const id = Number(route.params.id)

const loading = ref(false)
const errorMessage = ref('')
const form = ref<PostFormPayload>({
  title: '',
  excerpt: '',
  content: '',
  published: true,
})

const {data, error} = await useFetch<BlogPost>(`/api/admin/posts/${id}`)

if (error.value || !data.value) {
  throw createError({statusCode: 404, statusMessage: 'Post not found'})
}

form.value = {
  title: data.value.title,
  excerpt: data.value.excerpt || '',
  content: data.value.content,
  published: data.value.published,
}

async function submit() {
  loading.value = true
  errorMessage.value = ''

  try {
    await $fetch(`/api/admin/posts/${id}`, {
      method: 'PUT',
      body: form.value,
    })

    await navigateTo('/admin/blog')
  } catch {
    errorMessage.value = 'Не удалось обновить пост'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
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

.blog-page__state {
  margin: 0;
  color: var(--color-primary);
}

.blog-page__state--error {
  color: var(--color-error);
}
</style>
