<template>
  <div
    class="tooltip__wrapper"
    @mouseenter="show = true"
    @mouseleave="show = false"
  >
    <slot name="trigger" />
    <div v-show="show" class="tooltip" :class="'tooltip--' + position">
      <p v-if="text">{{ text }}</p>
      <slot name="content" />
    </div>
  </div>
</template>

<script setup>
defineProps({
  text: String,
  position: {
    type: String,
    default: 'bottom',
    validator: (v) => ['top', 'bottom', 'left', 'right'].includes(v),
  },
})

const show = ref(false)
</script>

<style scoped>
.tooltip__wrapper {
  position: relative;
  display: inline-block;
}

.tooltip {
  position: absolute;
  z-index: 9999;
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  white-space: nowrap;
  background: var(--color-bg);
  color: var(--color-text);
  border: 1px solid rgb(148 163 184 / 0.2);
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.5);
}

.tooltip--top {
  bottom: 100%;
  left: 50%;
  margin-bottom: 6px;
  transform: translateX(-50%);
}

.tooltip--bottom {
  top: 100%;
  left: 50%;
  margin-top: 6px;
  transform: translateX(-50%);
}

.tooltip--left {
  right: 100%;
  top: 50%;
  margin-right: 6px;
  transform: translateY(-50%);
}

.tooltip--right {
  left: 100%;
  top: 50%;
  margin-left: 6px;
  transform: translateY(-50%);
}
</style>
