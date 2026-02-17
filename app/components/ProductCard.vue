<template>
  <article class="product-card">
    <!-- Вся карточка — ссылка-заглушка -->
    <a class="product-card__link" href="#" :aria-label="product.name" />

    <button class="product-card__fav" type="button" aria-label="Добавить в избранное">
      <svg class="product-card__fav-icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 21s-7-4.6-9.4-8.7C.9 9.2 2.2 5.8 5.3 4.8c1.8-.6 3.9 0 5.1 1.5 1.2-1.5 3.3-2.1 5.1-1.5 3.1 1 4.4 4.4 2.7 7.5C19 16.4 12 21 12 21Z"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div class="product-card__media">
      <img class="product-card__img" :src="product.image" :alt="product.name" loading="lazy" />
    </div>

    <div class="product-card__body">
      <h3 class="product-card__name">{{ product.name }}</h3>

      <div class="product-card__prices">
        <div class="product-card__price-main">{{ formatRubles(product.price) }}</div>
        <div class="product-card__price-half">x2: {{ formatRubles(calcX2Price(product.price)) }}</div>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { Product } from '~/types/products'
import { calcX2Price, formatRubles } from '~/utils/money'

defineProps<{
  product: Product
}>()
</script>

