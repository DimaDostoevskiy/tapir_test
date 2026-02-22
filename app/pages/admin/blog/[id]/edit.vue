<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <h1 class="admin-page__title">Редактировать пост</h1>
      <KitButton to="/admin/blog" variant="outline">Назад к списку</KitButton>
    </header>

    <p v-if="pending" class="admin-page__state">Загрузка...</p>
    <p v-else-if="fetchError" class="admin-page__state admin-page__state--error">Не удалось загрузить пост</p>

    <template v-else-if="post">
      <KitForm :loading="loading" submit-label="Сохранить" @submit="submit">
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
        <div class="admin-page__image">
          <label class="admin-page__image-label">Изображение</label>
          <input
              type="file"
              accept="image/*"
              class="admin-page__file-input"
              @change="onImageChange"
          />
          <p v-if="imageError" class="admin-page__state admin-page__state--error">{{ imageError }}</p>
          <div v-if="form.image" class="admin-page__preview">
            <img :src="form.image" alt="Превью" class="admin-page__preview-img"/>
          </div>
        </div>
        <label class="kit-form__checkbox">
          <input v-model="form.published" type="checkbox"/>
          <span>Опубликовано</span>
        </label>
      </KitForm>
      <p v-if="errorMessage" class="admin-page__state admin-page__state--error">{{ errorMessage }}</p>
    </template>
  </section>
</template>

<script setup lang="ts">
import type {BlogPost, PostFormPayload} from '~/types/blog'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Редактировать пост — Админка',
})

const route = useRoute()
const id = Number(route.params.id)

const loading = ref(false)
const errorMessage = ref('')
const imageError = ref('')
const form = ref<PostFormPayload>({
  title: '',
  excerpt: '',
  content: '',
  published: false,
  slug: '',
  image: '',
})

const {data: post, pending, error: fetchError} = await useFetch<BlogPost>(`/api/admin/posts/${id}`)

watch(
    post,
    (p) => {
      if (p) {
        form.value = {
          title: p.title,
          excerpt: p.excerpt ?? '',
          content: p.content,
          published: p.published,
          slug: p.slug,
          image: p.image ?? '',
        }
      }
    },
    {immediate: true}
)

async function onImageChange(event: Event) {
  imageError.value = ''
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  try {
    const formData = new FormData()
    formData.append('file', file)
    const res = await $fetch<{ path: string }>('/api/admin/upload', {
      method: 'POST',
      body: formData,
    })
    form.value.image = res.path
  } catch {
    imageError.value = 'Не удалось загрузить изображение'
  }
  input.value = ''
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

.admin-page__image {
  display: grid;
  gap: 8px;
}

.admin-page__image-label {
  font-weight: 500;
}

.admin-page__file-input {
  max-width: 100%;
}

.admin-page__preview {
  max-width: min(400px, 100%);
}

.admin-page__preview-img {
  display: block;
  max-width: 100%;
  height: auto;
  border-radius: 4px;
}
</style>
