<template>
  <section class="admin-page container">
    <header class="admin-page__header">
      <h1 class="admin-page__title">Создать пост</h1>
      <NuxtLink class="button button--ghost" to="/admin/blog">Назад к списку</NuxtLink>
    </header>

    <PostForm v-model="form" :loading="loading" submit-label="Создать" @submit="submit" />

    <p v-if="errorMessage" class="blog-page__state blog-page__state--error">{{ errorMessage }}</p>
  </section>
</template>

<script setup lang="ts">
import PostForm from '~/components/admin/PostForm.vue'
import type { PostFormPayload } from '~/types/blog'

definePageMeta({
  middleware: ['admin'],
})

const loading = ref(false)
const errorMessage = ref('')
const form = ref<PostFormPayload>({
  title: '',
  excerpt: '',
  content: '',
  published: true,
})

async function submit() {
  loading.value = true
  errorMessage.value = ''

  try {
    await $fetch('/api/admin/posts', {
      method: 'POST',
      body: form.value,
    })

    await navigateTo('/admin/blog')
  } catch {
    errorMessage.value = 'Не удалось сохранить пост'
  } finally {
    loading.value = false
  }
}
</script>
