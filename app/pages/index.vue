<template>
  <section>
    <div class="blog__list scroll"
         ref="blogListRef"
    >
      <p v-if="pending"
         class="blog__info blog__info_success"
      >Загрузка...</p>
      <p v-if="error"
         class="blog__info blog__info_error"
      >Ошибка...</p>
      <PostCard v-for="post in postList"
                :key="post.id"
                :post="post"
      />
      <p v-if="isLoadingMore"
         class="blog__info blog__info_success"
      >Загрузка ещё постов...</p>
      <p v-if="loadMoreError"
         class="blog__info blog__info_error"
      >{{ loadMoreError }}</p>
      <p v-if="!pending && !error && !hasMore && postList.length > 0"
         class="blog__info blog__info_muted"
      >
        Больше постов нет.
      </p>
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

const blogListRef = ref<HTMLElement | null>(null)
const postList = ref<BlogPost[]>([])
const isLoadingMore = ref(false)
const hasMore = ref(true)
const showScrollTopButton = ref(false)
const loadMoreError = ref('')

const {data, pending, error} = await useFetch<BlogPost[]>('/api/posts', {
  query: {
    limit: PAGE_SIZE,
    offset: 0,
  },
})

postList.value = data.value || []
hasMore.value = postList.value.length === PAGE_SIZE

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
  if (isLoadingMore.value || !hasMore.value) {
    return
  }

  isLoadingMore.value = true
  loadMoreError.value = ''

  try {
    const nextChunk = await $fetch<BlogPost[]>('/api/posts', {
      query: {
        limit: PAGE_SIZE,
        offset: postList.value.length,
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

function scrollToTop() {
  blogListRef.value?.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onMounted(async () => {
  await nextTick()
  syncBottomState()
  blogListRef.value?.addEventListener('scroll', syncBottomState)
})

onBeforeUnmount(() => {
  blogListRef.value?.removeEventListener('scroll', syncBottomState)
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
  margin: 10px 0;
}

.blog__info_error {
  color: var(--color-danger);
}

.blog__info_success {
  color: var(--color-success);
}

.blog__info_muted {
  color: var(--color-muted);
}

.up__btn {
  position: fixed;
  right: clamp(16px, 4vw, 40px);
  bottom: clamp(16px, 6vh, 40px);
  z-index: 20;
}
</style>
