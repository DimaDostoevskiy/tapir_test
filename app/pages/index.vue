<script setup lang="ts">
useSeoMeta({
  title: 'Блог - Главная',
})

definePageMeta({
  middleware: ['auth'],
})

import type {BlogPost} from '~/types/blog'

const QUERY_LIMIT = 5

const searchQuery = useState<string>('postsSearchQuery', () => '')
const postService = usePostService()

// Первую порцию постов получаем перед сборкой на сервере (SSR)
const {data: initialPosts, pending} = await useAsyncData('posts-initial', () => postService.getPostList())

const postList = ref<BlogPost[]>(initialPosts.value ?? [])

const scrollListHandler = async () => {
  const chunk = await postService.getPostList(searchQuery.value, QUERY_LIMIT, postList.value.length)
  postList.value = [...postList.value, ...chunk]
}

watch(searchQuery, async (newValue) => {
  postList.value = await postService.getPostList(newValue, QUERY_LIMIT, 0)
})
</script>

<template>
  <PostList @bottom-scroll="scrollListHandler">
    <PostCard v-for="post in postList"
              :key="post.id"
              :post="post"
              class="mb-8"
    />
    <KitAlert v-if="pending"
              :type="'success'"
              :title="`Загрузка данных...`"
              :text="`...`"
    />
    <KitAlert v-if="!pending && postList.length > 0"
              class="pl-8"
              title="элементов больше нет"
    />
  </PostList>
</template>
