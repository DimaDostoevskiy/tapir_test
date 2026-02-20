<template>
  <div class="container">
    <section class="blog-page" id="posts">
      <header class="blog-page__header">

      </header>

      <div class="blog-list">
        <article v-for="post in postsMock"
                 :key="post.id"
                 class="blog-list__item"
        >
          <h3 class="blog-list__title">{{ post.title }}</h3>
          <p class="blog-list__excerpt">{{ post.excerpt }}</p>
          <p>{{ post.content }}</p>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue'
import type {ProductsResponse} from '~/types/products'
import {mockPosts as postsMock} from '~/utils/mockPosts'

const API_BASE = 'https://test-task-api.tapir.ws'
const LIMIT = 8

const {data} = await useFetch<ProductsResponse>(`${API_BASE}/products`, {
  query: {page: 1, limit: LIMIT},
})

const products = computed(() => data.value?.products || [])
</script>

