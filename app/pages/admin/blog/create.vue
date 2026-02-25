<template>
  <section class="admin-page scroll">
    <div class="admin-page__header">
      <h1 class="admin-page__title">Создать пост</h1>
      <KitButton
          to="/admin/blog"
          variant="outline"
          text="Назад к списку"
      />
    </div>

    <KitForm
        submit-label="Создать"
        :loading="loading"
        :submit-disabled="!form.image?.trim()"
        @submit="submit"
    >
      <KitInput
          label="Заголовок"
          type="text"
          maxlength="255"
          required
          :debounce="200"
          v-model="form.title"
      />
      <KitInput
          label="Краткое описание"
          as="textarea"
          :rows="3"
          :debounce="200"
          v-model="form.excerpt"
      />
      <KitInput
          label="Контент"
          as="textarea"
          :rows="12"
          required
          :debounce="200"
          v-model="form.content"
      />
      <KitImageUpload
          label="Изображение"
          required
          v-model="form.image"
      />
      <label class="kit-form__checkbox">
        <input v-model="form.published" type="checkbox"/>
        <span>Опубликовано</span>
      </label>
    </KitForm>

    <p v-if="errorMessage" class="admin-page__state admin-page__state--error">{{ errorMessage }}</p>
  </section>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['auth'],
})

import type {IPostFormPayload} from '~/types/blog'

const loading = ref(false)
const errorMessage = ref('')
const form = ref<IPostFormPayload>({
  title: '',
  excerpt: '',
  content: '',
  published: true,
  slug: '',
  image: '',
})

const submit = async () => {
  loading.value = true
  errorMessage.value = ''
  await $fetch('/api/posts/create', {
    method: 'POST',
    body: form.value,
  } as Record<string, unknown>)
      .then(res => {
        console.log(res)
        // await navigateTo(`/blog/${res.slug}`)
      })
      .catch(err => {
        console.log(err)
        errorMessage.value = 'Не удалось сохранить пост'
      })
      .finally(() => {
        loading.value = false
      })
}
</script>

<style scoped>
.admin-page {
  display: grid;
  gap: 20px;
  padding: clamp(16px, 4vw, 32px);
  max-width: min(900px, 100%);
  margin: 0 auto;
  max-height: calc(100vh - 8rem);
  overflow-y: auto;
  min-height: 0;
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
