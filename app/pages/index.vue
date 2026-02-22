<template>
  <section class="blog">
    <div class="blog__list scroll"
         ref="blogListRef"
    >
      <PostCard v-for="post in postList"
                :key="post.id"
                :post="post"
      />
      <p v-if="pending"
         class="blog__info blog__info_success"
      >Загрузка...</p>
      <p v-if="error"
         class="blog__info blog__info_error"
      >Ошибка...</p>
    </div>
    <KitButton
        class="blog__to-top"
        type="button"
    >
      <slot>
      <span class="blog__to-top-chevrons" aria-hidden="true">
        <span class="blog__to-top-chevron"/>
        <span class="blog__to-top-chevron"/>
      </span>
      </slot>
      <span>Наверх</span>
    </KitButton>
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

const postList = computed(() => data.value || [])

const blogListRef = ref<HTMLElement | null>(null)

const {data, pending, error} = await useFetch<BlogPost[]>('/api/posts')


</script>

<style scoped>
.blog {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  height: 100%;
  min-height: 0;
  overflow: hidden;
  margin: 0 auto;
  position: relative;
}

.blog__list {
  width: min(100% - 32px, 1200px);
  margin-inline: auto;
  flex: 1;
  min-height: 100vh;
  max-height: 100vh;
}

.blog__to-top {
  display: none;
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
  padding-right: 8px;
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
  border-color: rgb(var(--color-primary-rgb) / 0.68);
  background: linear-gradient(135deg, rgb(var(--color-primary-rgb) / 0.96), rgb(var(--color-primary-rgb) / 0.72));
  color: var(--color-text);
}

.blog__to-top:focus-visible {
  border-color: rgb(var(--color-primary-rgb) / 0.68);
  background: linear-gradient(135deg, rgb(var(--color-primary-rgb) / 0.96), rgb(var(--color-primary-rgb) / 0.72));
  color: var(--color-text);
}

@media (min-width: 768px) {
  .blog__to-top {
    display: flex;
  }

}
</style>
