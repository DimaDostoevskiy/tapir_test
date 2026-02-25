<template>
  <section>
    <div class="blog__list scroll"
         ref="blogListRef"
    >
      <PostCard v-for="post in postList"
                :key="post.id"
                :post="post"
      />
      <p v-if="!pending && !error && !hasMore && postList.length > 0"
         class="blog__info"
      >элементов больше нет</p>
    </div>
    <KitButton v-if="showScrollTopButton"
               class="up__btn"
               aria-label="Прокрутить наверх"
               text="UP"
               @click="scrollToTop"
    />
  </section>
</template>

<script setup lang="ts">
import {nextTick} from 'vue'

useSeoMeta({
  title: 'Блог - Главная',
})

definePageMeta({
  middleware: ['auth'],
})

import type {BlogPost} from '~/types/blog'

const PAGE_SIZE = 5
const AUTO_LOAD_THRESHOLD = 5
const SHOW_SCROLL_TOP_THRESHOLD = 5

const searchQuery = useState<string>('postsSearchQuery', () => '')
const blogListRef = ref<HTMLElement | null>(null)
const postList = ref<BlogPost[]>([])
const pending = ref(false)
const error = ref('')
const errorMessage = ref('')
const isLoadingMore = ref(false)
const hasMore = ref(true)
const showScrollTopButton = ref(false)

const syncBottomState = () => {
  const container = blogListRef.value

  if (!container) {
    return
  }

  const distanceToBottom = container.scrollHeight - (container.scrollTop + container.clientHeight)
  showScrollTopButton.value = container.scrollTop >= SHOW_SCROLL_TOP_THRESHOLD

  if (
      distanceToBottom <= AUTO_LOAD_THRESHOLD
      && hasMore.value
      && !pending.value
      && !error.value
      && !isLoadingMore.value
  ) {
    void loadMorePosts()
  }
}

const loadMorePosts = async () => {
  if (
      isLoadingMore.value
      || !hasMore.value
      || pending.value
      || Boolean(error.value)
  ) {
    return
  }

  isLoadingMore.value = true

  const nextChunk = await $fetch<BlogPost[]>('api/posts/get-all', {
    query: {
      q: searchQuery.value.trim(),
      limit: PAGE_SIZE,
      offset: postList.value.length,
    },
  }).catch(() => {
    return []
  })

  postList.value = [...postList.value, ...nextChunk]
  hasMore.value = nextChunk.length === PAGE_SIZE
  await nextTick()
  syncBottomState()
}

function scrollToTop() {
  blogListRef.value?.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(async () => {
  await nextTick()
  await loadMorePosts()
  syncBottomState()
  blogListRef.value?.addEventListener('scroll', syncBottomState)
})

onBeforeUnmount(() => {
  blogListRef.value?.removeEventListener('scroll', syncBottomState)
})

watch(searchQuery, async () => {
  await loadMorePosts()
})
</script>

<style scoped>
.blog__list {
  padding-bottom: 100px;
  height: 100vh;
  width: 100%;
  max-width: 100%;
}

.blog__info {
  height: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}


.up__btn {
  position: fixed;
  right: clamp(16px, 4vw, 40px);
  bottom: clamp(16px, 6vh, 40px);
  z-index: 20;
}
</style>
