<template>
  <div class="layout">
    <AppHeader class="layout__header" />
    <main class="layout__main">
      <slot />
    </main>
    <AppFooter class="layout__footer" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

