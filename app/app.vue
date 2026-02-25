<template>
  <div class="app">
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage :key="pageKey" />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const pageKey = computed(() => route.fullPath || route.path || '')
</script>
