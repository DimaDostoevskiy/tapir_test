<template>
  <section class="blog">
    <p v-if="pending || error"
       class="blog__info"
    >Загрузка...</p>
    <div class="blog-list">
      <PostCard v-for="post in postList"
                :key="post.id"
                :post="post"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type {BlogPost} from '~/types/blog'

const {data, pending, error} = await useFetch<BlogPost[]>('/api/posts')
const postList = computed(() => data.value || [])

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
</style>
