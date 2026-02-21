<template>
  <div class="layout" :class="{ 'layout--home': isHome }">
    <AppHeader class="layout__header" />
    <main class="layout__main" :class="{ 'layout__main--home': isHome }">
      <slot />
    </main>
    <AppFooter class="layout__footer" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'

const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<style scoped lang="scss">
.layout {
  min-height: 100dvh;
  display: grid;
  grid-template-rows: auto 1fr auto;
}

.layout__main {
  padding: 0 0 48px;
}

@media (min-width: 1024px) {
  .layout__main--home {
    min-height: 0;
    height: 100%;
  }
}

.layout--home {
  height: 100dvh;
  overflow: hidden;
  grid-template-rows: auto 1fr;
  position: relative;
}

.layout--home .layout__main {
  min-height: 0;
  height: 100%;
  overflow: hidden;
  padding: 0 0 16px;
}

.layout--home .layout__footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  transform: translateY(calc(100% - 18px));
  transition: transform 220ms ease;
  z-index: 20;
}

.layout--home .layout__footer:hover,
.layout--home .layout__footer:focus-within {
  transform: translateY(0);
}
</style>

