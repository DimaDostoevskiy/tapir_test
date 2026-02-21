<template>
  <section class="admin-page container">
    <header class="admin-page__header">
      <h1 class="admin-page__title">Admin Panel</h1>
      <div class="admin-page__actions">
        <NuxtLink class="button button--primary" to="/admin/blog">Управление постами</NuxtLink>
      </div>
    </header>

    <p class="blog-page__subtitle">Управление контентом.</p>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Admin — Pro Moto Blog',
})
</script>
