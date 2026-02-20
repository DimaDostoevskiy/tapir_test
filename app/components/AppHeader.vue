<template>
  <header class="header">
    <div class="header__inner">
      <NuxtLink class="header__brand" to="/">
        <span class="header__dot" aria-hidden="true" />
        <span class="logo__text">Pro Moto Blog</span>
      </NuxtLink>
      <SearchBar v-model="searchString" @submit="onSearch" />
    </div>
  </header>
</template>

<script setup lang="ts">
const { refresh } = useAuth()
const searchString = ref('')

function onSearch() {
  // Placeholder for future integration with post filtering.
}

onMounted(() => {
  refresh()
})
</script>

<style scoped lang="scss">
.logo__text {
  letter-spacing: 0.2px;
}
</style>

