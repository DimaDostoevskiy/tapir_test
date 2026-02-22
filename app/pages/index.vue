<template>
  <section>
    <div class="blog__list scroll"
         ref="blogListRef"
    >
      <KitButton class="up__btn">
        <slot>
          <p>UP</p>
        </slot>
      </KitButton>
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
    </div>
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
.blog__list {
  padding: 16px;
  height: 100vh;
  width: fit-content;
}

.up__btn {
  display: none;
  position: fixed;
  bottom: 100px;
  right: 100px;
  z-index: 10;
}

@media (min-width: 768px) {
  .up__btn {
    display: block;
  }
}
</style>
