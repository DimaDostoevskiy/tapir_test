<template>
  <section class="blog">
    <p v-if="pending || error"
       class="blog__info"
    >Загрузка...</p>
    <div ref="blogListRef" class="blog-list" @wheel="handleWheelFlip">
      <PostCard v-for="post in postList"
                :key="post.id"
                :post="post"
      />
    </div>
    <button class="blog__to-top button" type="button" @click="scrollListToTop">
      <span class="blog__to-top-chevrons" aria-hidden="true">
        <span class="blog__to-top-chevron" />
        <span class="blog__to-top-chevron" />
      </span>
      <span>Наверх</span>
    </button>
  </section>
</template>

<script setup lang="ts">
import type {BlogPost} from '~/types/blog'

const {data, pending, error} = await useFetch<BlogPost[]>('/api/posts')
const postList = computed(() => data.value || [])
const blogListRef = ref<HTMLElement | null>(null)
let flipLock = false
let flipUnlockTimer: ReturnType<typeof setTimeout> | null = null

function getCardOffsets(container: HTMLElement) {
  const cards = Array.from(container.querySelectorAll<HTMLElement>('.post__card'))
  const maxScrollTop = Math.max(0, container.scrollHeight - container.clientHeight)
  const snappedOffsets = cards.map(card => Math.min(card.offsetTop, maxScrollTop))

  return [...new Set(snappedOffsets)].sort((a, b) => a - b)
}

function handleWheelFlip(event: WheelEvent) {
  const container = blogListRef.value

  if (!container || Math.abs(event.deltaY) < 8) {
    return
  }

  const offsets = getCardOffsets(container)

  if (!offsets.length) {
    return
  }

  event.preventDefault()

  if (flipLock) {
    return
  }

  flipLock = true

  const direction = event.deltaY > 0 ? 1 : -1
  const currentTop = container.scrollTop

  let nextTop = currentTop

  if (direction > 0) {
    nextTop = offsets.find(top => top > currentTop + 2) ?? offsets[offsets.length - 1]
  } else {
    for (let idx = offsets.length - 1; idx >= 0; idx -= 1) {
      if (offsets[idx] < currentTop - 2) {
        nextTop = offsets[idx]
        break
      }
    }
    if (nextTop === currentTop) {
      nextTop = offsets[0]
    }
  }

  container.scrollTo({
    top: nextTop,
    behavior: 'smooth',
  })

  if (flipUnlockTimer) {
    clearTimeout(flipUnlockTimer)
  }

  flipUnlockTimer = setTimeout(() => {
    flipLock = false
  }, 260)
}

function scrollListToTop() {
  const container = blogListRef.value
  if (!container) {
    return
  }

  container.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

onBeforeUnmount(() => {
  if (flipUnlockTimer) {
    clearTimeout(flipUnlockTimer)
  }
})

useSeoMeta({
  title: 'Блог — Pro Moto Blog',
})
</script>

<style scoped>
.blog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  min-height: 0;
  max-width: 1440px;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
}

.blog-list{
  width: min(100% - 32px, 1200px);
  margin-inline: auto;
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: rgba(157, 66, 245, 0.75) rgba(255, 255, 255, 0.04);
}

.blog-list::-webkit-scrollbar {
  width: 10px;
}

.blog-list::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 999px;
}

.blog-list::-webkit-scrollbar-thumb {
  background: linear-gradient(135deg, rgba(157, 66, 245, 0.95), rgba(157, 66, 245, 0.65));
  border: 1px solid rgba(157, 66, 245, 0.55);
  border-radius: 999px;
}

.blog-list::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(135deg, rgba(139, 53, 232, 0.98), rgba(157, 66, 245, 0.7));
}

.blog__to-top {
  position: absolute;
  right: 24px;
  bottom: 110px;
  z-index: 12;
  padding: 10px 14px;
  border-color: rgba(250, 250, 250, 0.22);
  background: rgba(0, 0, 0, 0.42);
  color: rgba(250, 250, 250, 0.88);
  gap: 8px;
  touch-action: manipulation;
}

.blog__to-top-chevrons {
  display: inline-grid;
  gap: 1px;
}

.blog__to-top-chevron {
  width: 8px;
  height: 8px;
  border-top: 2px solid currentColor;
  border-left: 2px solid currentColor;
  transform: rotate(45deg);
}

.blog__to-top:hover {
  border-color: rgba($color-primary, 0.68);
  background: linear-gradient(135deg, rgba($color-primary, 0.96), rgba($color-primary, 0.72));
  color: $color-text;
}

.blog__to-top:focus-visible {
  border-color: rgba($color-primary, 0.68);
  background: linear-gradient(135deg, rgba($color-primary, 0.96), rgba($color-primary, 0.72));
  color: $color-text;
}

@media (max-width: 900px) {
  .blog__to-top {
    display: none;
  }
}

@media (max-width: 640px) {
  .blog-list {
    width: calc(100% - 20px);
  }
}
</style>
