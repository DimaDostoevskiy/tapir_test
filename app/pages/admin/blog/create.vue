<template>
  <section class="admin-page scroll">
    <div class="admin-page__header">
      <h1 class="admin-page__title">Создать пост</h1>
      <KitButton
          :loading="isLoading"
          :text="!isAutoGenerate ? 'Создать автоматически':'Ввести данные' "
          @click="isAutoGenerate = !isAutoGenerate"

      />
      <a :href="baseUrl + 'admin/blog'" class="link-btn link-btn--outline">Назад к списку</a>
    </div>
    <p v-if="errorMessage"
       class="admin-page__state admin-page__state--error"
    >{{ errorMessage }}</p>
    <KitForm
        v-if="form && !isAutoGenerate"
        submit-label="Создать"
        :loading="isLoading"
        :submit-disabled="!form.image?.trim()"
        @submit="submit"
    >
      <KitImageUpload
          label="Изображение"
          required
          v-model="form.image"
      />
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
      <label for="input">
        Опубликовано
        <input
            id="input"
            :type="'checkbox'"
            v-model="form.published"
        />
      </label>
    </KitForm>
    <KitForm
        v-if="isAutoGenerate"
        submit-label="Создать"
        :loading="isLoading"
        :submit-disabled="!promptTheme.trim()"
        @submit="fetchDeepSeek"
    >
      <KitInput
          label="Тема поста"
          type="text"
          maxlength="255"
          required
          :debounce="200"
          v-model="promptTheme"
      />
    </KitForm>
  </section>
</template>

<script setup lang="ts">

definePageMeta({
  middleware: ['auth'],
})

import type {IPostFormPayload} from '~/types/blog'

const {app: appConfig} = useRuntimeConfig()
const baseUrl = appConfig.baseURL || '/blog/'
const errorMessage = ref('')
const form = ref<IPostFormPayload>({
  id: undefined,
  title: '',
  excerpt: '',
  content: '',
  published: false,
  slug: '',
  image: '',
})
const isLoading = ref(false)
const isAutoGenerate = ref(false)
const promptTheme = ref<string>('Подсолнечное масло')

const submit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  await $fetch('/api/posts/create', {
    method: 'POST',
    body: form.value,
  } as Record<string, unknown>)
      .then(() => {
        navigateTo(`/admin/blog`)
      })
      .catch((err) => {
        console.log(err)
        errorMessage.value = err.error
      })
      .finally(() => {
        isLoading.value = false
      })
}

const fetchDeepSeek = () => {
  isLoading.value = true
  errorMessage.value = ''
  $fetch('/api/ai/generate-post', {
    method: 'POST',
    body: {
      promptTheme: promptTheme.value,
    },
  })
      .then(async (res) => {
        const data = res as any
        if (data?.error) {
          errorMessage.value = data.error.message
        } else {
          const generatePost = await parseResponse(data)
          form.value.title = generatePost.title || ''
          form.value.content = generatePost.content || ''
          form.value.excerpt = generatePost.description || ''
        }
      })
      .catch(() => {
        errorMessage.value = 'Ошибка! Не удалось сгенерировать пост!'
      })
      .finally(() => {
        isLoading.value = false
        isAutoGenerate.value = false
      })
}

const parseResponse = async (data: any) => {
  let content = data.choices[0].message.content
  content = content.replace(/<think>[\s\S]*?<\/think>/g, '')
  content = content.trim()
  return JSON.parse(content)
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
