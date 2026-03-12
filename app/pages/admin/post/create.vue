<script setup lang="ts">
import useAgent from "../../../composables/useAgent";

definePageMeta({
  middleware: ['auth'],
})

import type {IPostFormPayload} from '~/types/blog'

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
const promptTheme = ref<string>('')
const errorMessage = ref('')
const isAutoGenerate = ref(false)

const submitFormHandler = async () => {
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

const generatePostHandler = async () => {
  isLoading.value = true
  errorMessage.value = ''

  const {message, result} = await useAgent().fetchDeepSeek(promptTheme.value)

  if (result) {
    form.value.title = result.title || ''
    form.value.content = result.content || ''
    form.value.description = result.description || ''
  } else {
    errorMessage.value = String(message)
  }

  isLoading.value = false
  isAutoGenerate.value = false
}
</script>

<template>
  <LayoutDefaultSection :title="'Создать пост'">
    <template #section-controls>
      <KitButton class="mr-2"
                 :text="isAutoGenerate ? 'создать' : 'генерировать'"
                 @click="isAutoGenerate = !isAutoGenerate"
      />
      <NuxtLink :to="'/admin/post/'"
                class="link-btn link-btn_outline"
      >назад
      </NuxtLink>
    </template>
    <template #section-content>
      <KitForm v-if="form && !isAutoGenerate"
               submit-label="Создать"
               :loading="isLoading"
               :submit-disabled="!form.image?.trim()"
               @submit="submitFormHandler"
      >
        <KitImage
            :path="form.image"
            loading="lazy"
        />
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
               submit-label="Сгенерировать"
               :loading="isLoading"
               :submit-disabled="!promptTheme.trim()"
               @submit="generatePostHandler"
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
                style="margin-top: 1em"
                title="Ошибка"
                :text="errorMessage"
                :type="'error'"
      />
    </template>
  </LayoutDefaultSection>
</template>

