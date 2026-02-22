<template>
  <section>
    <div class="blog__list scroll"
         ref="blogListRef"
    >
      <p v-if="isLoadingMore"
         class="blog__info"
      >Загрузка постов...</p>
      <PostCard v-for="post in postList"
                :key="post.id"
                :post="post"
      />
      <p v-if="loadMoreError"
         class="blog__info"
      >{{ loadMoreError }}</p>
    </div>
    <KitButton v-if="showScrollTopButton"
               class="up__btn"
               aria-label="Прокрутить наверх"
               @click="scrollToTop"
    >
      UP
    </KitButton>
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

const PAGE_SIZE = 10
const AUTO_LOAD_THRESHOLD = 40
const SHOW_SCROLL_TOP_THRESHOLD = 280

const searchQuery = useState<string>('postsSearchQuery', () => '')
const blogListRef = ref<HTMLElement | null>(null)
const postList = ref<BlogPost[]>([])
const pending = ref(false)
const error = ref('')
const isLoadingMore = ref(false)
const hasMore = ref(true)
const showScrollTopButton = ref(false)
const loadMoreError = ref('')

function getSearchQuery() {
  return searchQuery.value.trim()
}

function syncBottomState() {
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

async function loadMorePosts() {
  if (isLoadingMore.value || !hasMore.value || pending.value || Boolean(error.value)) {
    return
  }

  isLoadingMore.value = true
  loadMoreError.value = ''

  try {
    const nextChunk = await $fetch<BlogPost[]>('/api/posts', {
      query: {
        limit: PAGE_SIZE,
        offset: postList.value.length,
        q: getSearchQuery(),
      },
    })

    postList.value = [...postList.value, ...nextChunk]
    hasMore.value = nextChunk.length === PAGE_SIZE
    await nextTick()
    syncBottomState()
  } catch {
    loadMoreError.value = 'Не удалось загрузить ещё посты. Попробуйте снова.'
  } finally {
    isLoadingMore.value = false
  }
}

async function loadFirstPostsPage() {
  pending.value = true
  error.value = ''
  loadMoreError.value = ''
  hasMore.value = true
  postList.value = []

  try {
    const firstChunk = await $fetch<BlogPost[]>('/api/posts', {
      query: {
        limit: PAGE_SIZE,
        offset: 0,
        q: getSearchQuery(),
      },
    })

    postList.value = firstChunk
    hasMore.value = firstChunk.length === PAGE_SIZE
    await nextTick()
    syncBottomState()
  } catch {
    error.value = 'Ошибка загрузки постов.'
    hasMore.value = false
  } finally {
    pending.value = false
  }
}

function scrollToTop() {
  blogListRef.value?.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(async () => {
  await nextTick()
  await loadFirstPostsPage()
  syncBottomState()
  blogListRef.value?.addEventListener('scroll', syncBottomState)
})

onBeforeUnmount(() => {
  blogListRef.value?.removeEventListener('scroll', syncBottomState)
})

watch(searchQuery, async () => {
  await loadFirstPostsPage()
})
</script>

<style scoped>
.blog__list {
  padding-bottom: 200px;
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
