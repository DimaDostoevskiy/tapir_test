<template>
  <section v-if="post" class="post">
    <div class="post__header">
      <h1 class="post__title">{{ post.title }}</h1>
      <p class="post__meta">Обновлено: {{ formattedDate }}</p>
    </div>

    <div v-if="post.image?.trim()"
         class="image__container">
      <img
          class="post__image"
          loading="eager"
          :src="post.image"
          :alt="`Обложка: ${post.title}`"
      />
    </div>

    <p v-if="post.excerpt" class="post__excerpt">{{ post.excerpt }}</p>
    <div class="post__content">
      <p v-for="(paragraph, idx) in paragraphs" :key="idx">{{ paragraph }}</p>
    </div>
  </section>

  <section v-else class="post">
    <div class="post__header">
      <h1 class="post__title">Пост не найден</h1>
      <p class="post__meta">Обратитесь к администратору</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {BlogPost} from '~/types/blog'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const { data: post } = await useLazyFetch<BlogPost | null>(
  () => `/api/posts/${slug.value}`,
  { key: `post-${slug.value}`, watch: [slug] }
)


const paragraphs = computed(() => post.value?.content?.split(/\n{2,}/).filter(Boolean) ?? [])
const formattedDate = computed(() =>
  post.value?.updatedAt ? new Date(post.value.updatedAt).toLocaleDateString('ru-RU') : ''
)
useSeoMeta({
  title: () => (post.value ? `${post.value.title} — pro_moto_blog` : 'Пост — pro_moto_blog'),
})
</script>

<style scoped>
.post {
  display: grid;
  gap: 16px;
  padding: 16px;
}

.post__header {
  display: grid;
  gap: 8px;
}

.post__title {
  margin-bottom: 8px;
  font-size: 34px;
}

.post__meta {
  margin: 0;
  color: var(--color-text);
}

.image__container {
  max-width: 100%;
}

.post__image {
  display: block;
  width: 100%;
  max-height: 60vh;
  object-fit: contain;
  border-radius: var(--radius-md);
}

.post__excerpt {
  margin: 0;
  color: var(--color-text);
}

.post__content {}

.post__state {
  margin: 0;
  color: var(--color-primary);
}

.blog-page__state--error {
  color: var(--color-error);
}
</style>
