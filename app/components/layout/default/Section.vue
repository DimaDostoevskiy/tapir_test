<script setup lang="ts">
const props = defineProps({
  title: String,
})
</script>

<template>
  <section class="section">
    <div class="section__header">
      <h1 class="header__title">{{ props.title }}</h1>
      <slot name="section-controls"/>
    </div>
    <div class="section__content scroll">
      <slot name="section-content"/>
    </div>
  </section>
</template>

<style scoped>
.section {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1em;
}

.section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
}

.header__title {
  margin: 0;
  font-weight: 700;
  font-size: clamp(1.5rem, 4vw, 1.875rem);
}

.section__content {
  flex: 1 1 auto;
  min-height: 0;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  display: grid;
  padding-bottom: 108px;
}

@media (max-width: 768px) {
  .section__header {
    align-items: flex-start;
  }
}
</style>
