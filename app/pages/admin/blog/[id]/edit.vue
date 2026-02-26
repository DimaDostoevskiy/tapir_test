<template>
  <section class="admin-page scroll">
    <div class="admin-page__header">
      <h1 class="admin-page__title"
      >Редактировать пост</h1>
      <a :href="baseUrl + 'admin/blog'" class="link-btn link-btn--outline">Назад к списку</a>
    </div>
    <p v-if="pending"
       class="admin-page__state"
    >Загрузка...</p>
    <p v-else-if="fetchError"
       class="admin-page__state admin-page__state--error"
    >Не удалось загрузить пост</p>

    <template v-else-if="post">
      <KitForm
          :loading="isLoading"
          submit-label="Сохранить"
          @submit="submit">
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
        <KitImageUpload
            v-model="form.image"
            label="Изображение"
        />
        <label class="kit-form__checkbox">
          <KitInput
              v-model="form.published"
              type="checkbox"
          />
          <span>Опубликовано</span>
        </label>
      </KitForm>
      <p
          v-if="errorMessage"
          class="admin-page__state admin-page__state--error"
      >{{ errorMessage }}</p>
    </template>
  </section>
</template>

<script setup lang="ts">
import type {BlogPost, IPostFormPayload} from '~/types/blog'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Редактировать пост — Админка',
})

const route = useRoute()
const id = Number(route.params.id)
const {app: appConfig} = useRuntimeConfig()
const baseUrl = appConfig.baseURL

const isLoading = ref(false)
const message = ref('')
const form = ref<IPostFormPayload>({
  id: undefined,
  title: '',
  excerpt: '',
  content: '',
  published: false,
  slug: '',
  image: '',
})

const {data: post, pending, error: fetchError} = await useFetch<BlogPost>(`/api/posts/${id}`)

const submit = async () => {
  message.value = ''
  isLoading.value = true

  await $fetch(`/api/posts/update`, {
    method: 'POST',
    body: form.value
  } as Record<string, unknown>)
      .then(() => {
        navigateTo(`/admin/blog`)
      }).catch((err) => {
        message.value = err.errorMessage || 'Ошибка!'
      }).finally(() => {
        isLoading.value = false
      })
}

onMounted(() => {
  if (post.value) {
    form.value = {
      id: post.value.id,
      title: post.value.title,
      excerpt: String(post.value.excerpt),
      content: post.value.content,
      published: post.value.published,
      slug: post.value.slug,
      image: post.value.image,
    }
  }
})
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
