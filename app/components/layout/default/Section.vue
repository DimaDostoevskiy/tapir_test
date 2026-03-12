<script setup lang="ts">
const props = defineProps({
  title: {type: String, default: ''},
})
</script>

<template>
  <section class="layout-section">
    <div class="layout-section__header">
      <h1 class="layout-section__title">{{ props.title }}</h1>
      <div>
        <slot name="section-controls"/>
      </div>
    </div>
    <div class="layout-section__content scroll">
      <slot name="section-content"/>
    </div>
  </section>
</template>

<style scoped>
.layout-section {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding: 1em;
}

.layout-section__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 24px;
}

.layout-section__title {
  margin: 0;
  font-weight: 700;
  font-size: clamp(1.5rem, 4vw, 1.875rem);
}

.layout-section__content {
  flex: 1 1 auto;
  min-height: 0;
  max-height: calc(100vh - 120px);
  overflow-y: auto;
  display: grid;
  padding-bottom: 108px;
}

@media (max-width: 768px) {
  .layout-section__header {
    align-items: flex-start;
  }
}
</style>
