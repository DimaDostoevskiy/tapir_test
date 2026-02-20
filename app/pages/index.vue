<template>
  <section id="posts" class="blog-page container">
    <div v-if="postList.length" class="blog-list">
      <PostCard v-for="post in postList"
                :key="post.id"
                :post="post"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'

const postList = ref<BlogPost[]>([])

await useFetch<BlogPost[]>('/api/posts').then((res) => {
  postList.value = res.data.value || []
})
</script>
