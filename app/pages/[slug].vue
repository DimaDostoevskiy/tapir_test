<template>
  <LayoutDefaultSection v-if="post"
                        :title="post.title"
  >
    <template #section-controls>
      <p>Обновлено: {{ normalizeDate(post.updatedAt) }}</p>
    </template>
    <template #section-content>
      <KitImage :src="post.image"
                loading="eager"
      />
      <p class="">{{ post.content }}</p>
    </template>
  </LayoutDefaultSection>
  <KitAlert v-else
            :title="'Ошибка'"
            :text="'Не удалось загрузить пост'"
            :type="'error'"
  />
</template>

<script setup lang="ts">
import type {BlogPost} from '~/types/blog'

const route = useRoute()
const slug = computed(() => String(route.params.slug ?? ''))

const {data: post} = await useLazyFetch<BlogPost | null>(
    () => `/api/posts/${slug.value}`,
    {
      key: `post-${slug.value}`,
      watch: [slug]
    }
)

useSeoMeta({
  title: () => (post.value ? `${post.value.title} — pro_moto_blog` : 'Пост — pro_moto_blog'),
})
</script>
