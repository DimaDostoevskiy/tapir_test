<template>
  <section class="admin-page">
    <header class="admin-page__header">
      <h1 class="admin-page__title">Admin Panel</h1>
      <p class="admin-page__subtitle">Управление контентом.</p>
    </header>

    <div class="admin-page__content">
      <div class="admin-page__card">
        <h2 class="admin-page__card-title">Посты</h2>
        <p class="admin-page__card-desc">Создание, редактирование и удаление записей блога.</p>
        <div class="admin-page__actions">
          <KitButton to="/admin/blog" variant="primary">Управление постами</KitButton>
        </div>
      </div>
    </div>
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
  gap: 24px;
  padding: clamp(16px, 4vw, 32px);
  max-width: min(800px, 100%);
  margin: 0 auto;
}

.admin-page__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.admin-page__title {
  margin: 0;
  font-size: clamp(1.5rem, 4vw, 1.875rem);
  font-weight: 600;
}

.admin-page__subtitle {
  margin: 0;
  color: var(--color-muted);
  font-size: 1rem;
}

.admin-page__content {
  display: grid;
  gap: 16px;
}

.admin-page__card {
  padding: 20px 24px;
  background: rgb(var(--color-surface-rgb) / 0.6);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  display: grid;
  gap: 12px;
}

.admin-page__card-title {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 600;
}

.admin-page__card-desc {
  margin: 0;
  color: var(--color-muted);
  font-size: 0.9375rem;
  line-height: 1.45;
}

.admin-page__actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}
</style>
