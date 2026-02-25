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
useSeoMeta({
  title: 'Блог - Главная',
})

definePageMeta({
  middleware: ['auth'],
})

import type {BlogPost} from '~/types/blog'

const PAGE_SIZE = 5
const AUTO_LOAD_THRESHOLD = 300
const SHOW_SCROLL_TOP_THRESHOLD = 5

const searchQuery = useState<string>('postsSearchQuery', () => '')
const blogListRef = ref<HTMLElement | null>(null)
const postList = ref<BlogPost[]>([])
const pending = ref(false)
const error = ref('')
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

const loadMorePosts = async (reset = false) => {
  if (
      isLoadingMore.value
      || (!reset && !hasMore.value)
      || pending.value
      || Boolean(error.value)
  ) {
    return
  }

  isLoadingMore.value = true

  if (reset) {
    postList.value = []
    hasMore.value = true
  }

  try {
    const nextChunk = await $fetch<BlogPost[]>('/api/posts/get-all', {
      query: {
        q: searchQuery.value.trim(),
        limit: PAGE_SIZE,
        offset: postList.value.length,
      },
    })
    const list = Array.isArray(nextChunk) ? nextChunk : []
    postList.value = [...postList.value, ...list]
    hasMore.value = list.length === PAGE_SIZE
  } finally {
    isLoadingMore.value = false
  }
}

const scrollToTop = () => {
  blogListRef.value?.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

let listMutationObserver: MutationObserver | null = null

onMounted(async () => {
  await loadMorePosts()
  const el = blogListRef.value
  if (el) {
    el.addEventListener('scroll', syncBottomState)
    listMutationObserver = new MutationObserver(syncBottomState)
    listMutationObserver.observe(el, { childList: true, subtree: true })
  }
})

onBeforeUnmount(() => {
  const el = blogListRef.value
  if (el) {
    el.removeEventListener('scroll', syncBottomState)
  }
  if (listMutationObserver) {
    try {
      listMutationObserver.disconnect()
    } catch (_) {
      // ignore cleanup errors
    }
    listMutationObserver = null
  }
})

watch(searchQuery, async () => {
  await loadMorePosts(true)
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
