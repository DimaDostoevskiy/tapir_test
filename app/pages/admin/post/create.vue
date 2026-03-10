<script setup lang="ts">

definePageMeta({
  middleware: ['auth'],
})

import type {IPostFormPayload} from '~/types/blog'

const errorMessage = ref('')
const form = ref<IPostFormPayload>({
  id: undefined,
  title: '',
  description: '',
  content: '',
  published: false,
  slug: '',
  image: '',
})
const isLoading = ref(false)
const isAutoGenerate = ref(false)
const promptTheme = ref<string>('Например: Подсолнечное масло')

const submit = async () => {
  isLoading.value = true
  errorMessage.value = ''
  await $fetch('/api/posts/create', {
    method: 'POST',
    body: form.value,
  } as Record<string, unknown>)
      .then(() => {
        navigateTo(`/admin/post`)
      })
      .catch((err) => {
        errorMessage.value = err.data.message || 'Ошибка при создании поста'
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
          form.value.description = generatePost.description || ''
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

<template>
  <LayoutDefaultSection :title="'Создать пост'">
    <template #section-controls>
      <NuxtLink :to="'/admin/post/'"
                class="link-btn link-btn--outline"
      >Назад к списку
      </NuxtLink>
    </template>
    <template #section-content>
      <KitImage :path="String(form.image)"
                loading="lazy"
      />
      <KitForm v-if="form && !isAutoGenerate"
               submit-label="Создать"
               :loading="isLoading"
               :submit-disabled="!form.image?.trim()"
               @submit="submit"
      >
        <KitImageUpload label="Изображение"
                        required
                        v-model="form.image"
        />
        <KitInput label="Заголовок"
                  type="text"
                  maxlength="255"
                  required
                  :debounce="200"
                  v-model="form.title"
        />
        <KitInput label="Краткое описание"
                  as="textarea"
                  :rows="3"
                  :debounce="200"
                  v-model="form.description"
        />
        <KitInput label="Контент"
                  as="textarea"
                  :rows="12"
                  required
                  :debounce="200"
                  v-model="form.content"
        />
        <KitInput label="Опубликовать пост"
                  class="mb-4"
                  type="checkbox"
                  v-model="form.published"
        />
      </KitForm>
      <KitForm v-if="isAutoGenerate"
               submit-label="Создать"
               :loading="isLoading"
               :submit-disabled="!promptTheme.trim()"
               @submit="fetchDeepSeek"
      >
        <KitInput label="Тема поста"
                  type="text"
                  maxlength="255"
                  required
                  :debounce="200"
                  v-model="promptTheme"
        />
      </KitForm>
      <KitAlert v-if="errorMessage"
                title="Ошибка"
                :text="errorMessage"
                :type="'error'"
      />
    </template>
  </LayoutDefaultSection>
</template>
