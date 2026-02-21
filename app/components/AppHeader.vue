<template>
  <div class="header__wrapper">
    <header class="header">
      <UserAvatar :image-url="userImageUrl"/>
      <SearchBar v-model="searchString" @submit="onSearch"/>
    </header>
  </div>
</template>

<script setup lang="ts">
import SearchBar from '~/components/kit/SearchBar.vue'
import UserAvatar from '~/components/UserAvatar.vue'

const searchString = ref('')
const userImageUrl = ref<string | null>(null)

function onSearch() {
  // Placeholder for future integration with post filtering.
}
</script>

<style scoped>
.header__wrapper {
  min-width: 100vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
  border: 1px solid rgba(250, 250, 250, 0.18);
  padding: 14px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.015));
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.28);
  display: grid;
  gap: 10px;
  overflow: hidden;
  transition: transform 140ms ease, border-color 140ms ease, box-shadow 140ms ease, background-color 140ms ease;
}

.header {
  border: none;
  background: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 1190px;
  width: 1190px;
  min-width: 320px;
  height: 64px;
}
</style>

