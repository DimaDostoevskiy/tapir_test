<script setup lang="ts">
const emit = defineEmits<{ (e: 'bottom-scroll'): void }>()

const AUTO_LOAD_THRESHOLD = 300
const SHOW_SCROLL_TOP_THRESHOLD = 5000

let listMutationObserver: MutationObserver | null = null
const blogListRef = ref<HTMLElement | null>(null)
const showScrollTopButton = ref<boolean>(false)

const scrollToTop = () => {
  blogListRef.value?.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const syncBottomState = () => {
  const container = blogListRef.value
  if (!container) {
    return
  }

  const distanceToBottom = container.scrollHeight - (container.scrollTop + container.clientHeight)
  showScrollTopButton.value = container.scrollTop >= SHOW_SCROLL_TOP_THRESHOLD

  if (distanceToBottom <= AUTO_LOAD_THRESHOLD) {
    emit('bottom-scroll')
  }
}

onMounted(() => {
  const el = blogListRef.value
  if (el) {
    el.addEventListener('scroll', syncBottomState)
    listMutationObserver = new MutationObserver(syncBottomState)
    listMutationObserver.observe(el, {childList: true, subtree: true})
    syncBottomState()
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
    } catch {
      // ignore cleanup errors
    }
    listMutationObserver = null
  }
})
</script>

<template>
  <div class="blog-list scroll"
       ref="blogListRef"
  >
    <KitButton v-if="showScrollTopButton"
               class="blog-list__up-btn"
               aria-label="Прокрутить наверх"
               text="UP"
               @click="scrollToTop"
    />
    <slot/>
  </div>
</template>

<style scoped>
.blog-list {
  padding: 24px 24px 100px 24px;
  flex: 1;
  min-height: 0;
  width: 100%;
  max-width: 100%;
  overflow-y: auto;
}

.blog-list__up-btn {
  position: fixed;
  right: clamp(16px, 4vw, 40px);
  bottom: clamp(16px, 6vh, 40px);
  z-index: 20;
}
</style>

