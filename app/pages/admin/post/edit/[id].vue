<template>
  <LayoutDefaultSection :title="'Редактировать пост'">
    <template #section-controls>
      <NuxtLink :to="'/admin/post/'"
                class="link-btn link-btn--outline"
      >Назад к списку
      </NuxtLink>
    </template>
    <template #section-content>
      <KitForm v-if="form"
               :loading="isLoading"
               submit-label="Сохранить"
               @submit="submit"
      >
        <KitImage :path="String(form.image)"
                  loading="lazy"
        />
        <KitImageUpload label="Изображение"
                        v-model="form.image"
        />
        <KitInput label="Заголовок"
                  v-model="form.title"
                  type="text"
                  maxlength="255"
                  required
                  :debounce="100"
        />
        <KitInput label="Краткое описание"
                  v-model="form.description"
                  as="textarea"
                  :rows="3"
                  :debounce="100"
        />
        <KitInput label="Контент"
                  v-model="form.content"
                  as="textarea"
                  :rows="12"
                  required
                  :debounce="100"
        />
        <KitInput
            :label="'Опубликовано'"
            type="checkbox"
            v-model="form.published"
        />
      </KitForm>
      <KitAlert v-if="pending"
                :type="'success'"
                :title="`Загрузка данных...`"
                :text="`...`"
      />
      <KitAlert v-if="fetchError"
                :type="'error'"
                :title="`Ошибка!`"
                :text="String(fetchError)"
      />
    </template>
  </LayoutDefaultSection>
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

const isLoading = ref(false)
const message = ref('')
const form = ref<IPostFormPayload>({
  id: undefined,
  title: '',
  description: '',
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
        navigateTo(`/admin/post`)
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
      description: String(post.value.description),
      content: post.value.content,
      published: post.value.published,
      slug: post.value.slug,
      image: post.value.image,
    }
  }
})
</script>
