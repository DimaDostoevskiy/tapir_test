<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <h1 class="admin-page__title">Создать пост</h1>
      <KitButton to="/admin/blog" variant="outline">Назад к списку</KitButton>
    </header>

    <KitForm :loading="loading" submit-label="Создать" @submit="submit">
      <KitInput
        label="Заголовок"
        v-model="form.title"
        type="text"
        maxlength="255"
        required
        :debounce="0"
      />
      <KitInput
        label="Краткое описание"
        v-model="form.excerpt"
        as="textarea"
        :rows="3"
        :debounce="0"
      />
      <KitInput
        label="Контент"
        v-model="form.content"
        as="textarea"
        :rows="12"
        required
        :debounce="0"
      />
      <label class="kit-form__checkbox">
        <input v-model="form.published" type="checkbox" />
        <span>Опубликовано</span>
      </label>
    </KitForm>

    <p v-if="errorMessage" class="admin-page__state admin-page__state--error">{{ errorMessage }}</p>
  </section>
</template>

<script setup lang="ts">
import type { PostFormPayload } from '~/types/blog'

definePageMeta({
  middleware: ['auth'],
})

const loading = ref(false)
const errorMessage = ref('')
const form = ref<PostFormPayload>({
  title: '',
  excerpt: '',
  content: '',
  published: true,
  slug: '',
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

<style scoped>
.admin-page {
  display: grid;
  gap: 20px;
  padding: clamp(16px, 4vw, 32px);
  max-width: min(900px, 100%);
  margin: 0 auto;
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

.admin-page__state {
  margin: 0;
  color: var(--color-muted);
}

.admin-page__state--error {
  color: var(--color-danger);
}
</style>
