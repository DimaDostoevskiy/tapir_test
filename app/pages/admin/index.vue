<template>
  <section class="admin-page container">
    <header class="admin-page__header">
      <h1 class="admin-page__title">Admin Panel</h1>
      <div class="admin-page__actions">
        <NuxtLink class="button button--primary" to="/admin/blog">Управление постами</NuxtLink>
      </div>
    </header>

    <p class="blog-page__subtitle">Доступ только для пользователей с ролью ADMIN.</p>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['admin'],
})

useSeoMeta({
  title: 'Admin — Pro Moto Blog',
})
</script>
