<template>
  <div class="layout">
    <LayoutDefaultHeader/>
    <main class="layout__main">
      <slot/>
    </main>
    <LayoutDefaultFooter/>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.layout {
  background: radial-gradient(
      circle at 0% 0%,
      rgb(var(--color-bg)) 0%,
      rgb(var(--color-bg)) 50%,
      rgb(var(--color-primary) / 0.3) 100%
  );
  max-width: 100vw;
  min-width: 100vw;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}

.layout__main {
  margin: 0 auto;
  width: 1190px;
  max-width: 100vw;
  min-width: 320px;
  height: fit-content;
  min-height: 100vh;
  max-height: 100vh;
}
</style>
