<template>
  <section class="admin-page container">
    <header class="admin-page__header">
      <h1 class="admin-page__title">Admin Panel</h1>
      <div class="admin-page__actions">
        <KitButton to="/admin/blog" variant="primary">Управление постами</KitButton>
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

<style scoped>
.admin-page {
  display: grid;
  gap: 16px;
}

.admin-page__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}

.admin-page__title {
  margin: 0;
  font-size: 30px;
}

.admin-page__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.blog-page__subtitle {
  margin: 0;
  color: var(--color-primary);
}
</style>
