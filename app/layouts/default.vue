<template>
  <div class="layout">
    <AppHeader/>
    <main class="layout__main">
      <slot/>
    </main>
    <AppFooter/>
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
</script>

<style scoped>
.layout {
  min-height: 100vh;
  width: 100%;
  background: radial-gradient(
      circle at 0% 0%,
      rgb(var(--color-surface-rgb)) 0%,
      rgb(var(--color-bg-rgb)) 50%,
      rgb(var(--color-surface-2-rgb) / 0.3) 100%
  );
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Анимированное свечение */
.layout::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 30% 50%,
      rgb(var(--color-primary-rgb) / 0.03) 0%,
      transparent 50%
  );
  pointer-events: none;
  z-index: 0;
}

.layout::after {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
      circle at 70% 80%,
      rgb(var(--color-accent-rgb) / 0.02) 0%,
      transparent 50%
  );
  pointer-events: none;
  z-index: 0;
}

.layout__main {
  position: relative;
  z-index: 1;
  flex: 1;
  width: 100%;
  max-width: var(--container-max);
  margin: 0 auto;
}

/* Тонкая линия внизу для глубины */
@media (min-width: 768px) {
  .layout::before {
    background: radial-gradient(
        circle at 20% 30%,
        rgb(var(--color-primary-rgb) / 0.05) 0%,
        transparent 60%
    );
  }

  .layout::after {
    background: radial-gradient(
        circle at 90% 70%,
        rgb(var(--color-accent-rgb) / 0.03) 0%,
        transparent 60%
    );
  }
}
</style>
