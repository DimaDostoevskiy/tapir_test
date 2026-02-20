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
import {PostModel} from "../../server/models/Post";

const postList = ref<PostModel[]>([])

await useFetch(`/api/posts/`).then((res) => {
  postList.value = res.data.value?.map(post => post as PostModel) || []
})

</script>
