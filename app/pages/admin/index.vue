<template>
  <LayoutDefaultSection :title="'Панель администратора'">
    <template #section-content>
      <div class="admin-page__card">
        <h2 class="admin-page__card-title">Посты</h2>
        <p class="admin-page__card-desc">Создание, редактирование и удаление записей блога.</p>
        <div class="admin-page__actions">
          <NuxtLink :to="'/admin/post/'"
                    class="link-btn link-btn_primary"
          >Управление постами
          </NuxtLink>
        </div>
      </div>
    </template>
  </LayoutDefaultSection>


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
