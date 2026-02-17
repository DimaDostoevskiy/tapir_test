<template>
  <section class="catalog">
    <header class="catalog__header">
      <h1 class="catalog__title">Каталог</h1>
      <p class="catalog__hint">Первая страница товаров загружается на сервере (SSR). «Показать ещё» подгружает данные.</p>
    </header>

    <div class="catalog__grid">
      <ProductCard v-for="p in products" :key="p.id" :product="p" />
    </div>

    <div class="catalog__controls">
      <div v-if="isLoadingMore" class="catalog__loading">Загрузка...</div>

      <div v-else-if="loadError" class="catalog__error" role="alert">
        <p class="catalog__error-text">Произошла ошибка, попробуйте позже</p>
        <button class="button button--primary" type="button" @click="retry">Повторить</button>
      </div>

      <button v-else-if="hasNextPage" class="button" type="button" @click="loadMore">Показать ещё</button>
    </div>
  </section>
</template>

<script setup lang="ts">
import ProductCard from '~/components/ProductCard.vue'
import type { Product, ProductsResponse } from '~/types/products'

useSeoMeta({
  title: 'Каталог — Tapir'
})

const API_BASE = 'https://test-task-api.tapir.ws'
const LIMIT = 12

const products = ref<Product[]>([])
const currentPage = ref(1)
const totalPages = ref(1)

const isLoadingMore = ref(false)
const loadError = ref(false)

const hasNextPage = computed(() => currentPage.value < totalPages.value)

function applyResponse(res: ProductsResponse) {
  currentPage.value = res.currentPage
  totalPages.value = res.totalPages
  products.value = res.products
}

function appendResponse(res: ProductsResponse) {
  currentPage.value = res.currentPage
  totalPages.value = res.totalPages
  products.value = [...products.value, ...res.products]
}

async function fetchPage(page: number): Promise<ProductsResponse> {
  return await $fetch<ProductsResponse>(`${API_BASE}/products`, {
    query: { page, limit: LIMIT }
  })
}

// SSR: первая страница обязана рендериться на сервере
const { data, error } = await useFetch<ProductsResponse>(`${API_BASE}/products`, {
  query: { page: 1, limit: LIMIT }
})

if (data.value) {
  applyResponse(data.value)
}

if (error.value) {
  loadError.value = true
}

async function loadMore() {
  if (!hasNextPage.value || isLoadingMore.value) return

  loadError.value = false
  isLoadingMore.value = true

  const nextPage = currentPage.value + 1

  try {
    const res = await fetchPage(nextPage)
    appendResponse(res)
  } catch {
    loadError.value = true
  } finally {
    isLoadingMore.value = false
  }
}

async function retry() {
  loadError.value = false

  // если товаров нет (упала первая SSR-загрузка) — пробуем снова страницу 1
  if (products.value.length === 0) {
    isLoadingMore.value = true
    try {
      const res = await fetchPage(1)
      applyResponse(res)
    } catch {
      loadError.value = true
    } finally {
      isLoadingMore.value = false
    }
    return
  }

  // иначе повторяем попытку подгрузить следующую страницу
  await loadMore()
}
</script>

