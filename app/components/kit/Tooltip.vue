<template>
  <div
      class="tooltip__wrapper"
      ref="wrapperRef"
      @mouseenter="isShow = true"
  >

    <slot name="trigger"></slot>

    <ClientOnly>
      <Teleport to="body">
        <div
            v-if="isShow"
            ref="contentRef"
            class="tooltip"
            :class="'tooltip--' + position"
            :style="{
            top: top + 'px',
            left: left + 'px'
          }"
        >
          <p v-if="text">{{ text }}</p>
          <slot name="content"></slot>
        </div>
      </Teleport>
    </ClientOnly>
  </div>
</template>


<script setup>
import {ref, watch, nextTick} from 'vue'

const props = defineProps({
  text: String,
  position: {
    type: String,
    default: 'top',
    validator: v => ['top', 'bottom', 'left', 'right'].includes(v)
  }
})
const isShow = ref(false)
const wrapperRef = ref(null)
const contentRef = ref(null)
const top = ref(0)
const left = ref(0)

const hasContent = () => {
  if (props.text?.trim()) return true
  const text = contentRef.value?.textContent?.trim()
  return Boolean(text)
}

const updatePosition = () => {
  if (!wrapperRef?.value) return

  const rect = wrapperRef.value.getBoundingClientRect()
  const tooltipWidth = 120

  switch (props.position) {
    case 'top':
      top.value = rect.top + window.scrollY - 40
      left.value = rect.left + window.scrollX + (rect.width / 2)
      break
    case 'bottom':
      top.value = rect.bottom + window.scrollY + 5
      left.value = rect.left + window.scrollX + (rect.width / 2)
      break
    case 'left':
      top.value = rect.top + window.scrollY + (rect.height / 2) - 20
      left.value = rect.left + window.scrollX - tooltipWidth - 10
      break
    case 'right':
      top.value = rect.top + window.scrollY + (rect.height / 2) - 20
      left.value = rect.right + window.scrollX + 10
      break
  }
}

const stopShow = () => {
  isShow.value = false
}

watch(isShow, async (newVal) => {
  if (newVal) {
    await nextTick()
    if (!hasContent()) {
      isShow.value = false
      return
    }
    updatePosition()
    setTimeout(stopShow, 2000)
  }
})
</script>

<style scoped>
.tooltip__wrapper {
  display: inline-block;
}
</style>

<style>
.tooltip {
  position: absolute;
  background: var(--color-bg);
  color: var(--color-text);
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 99999;
  white-space: nowrap;
  box-shadow: 0 10px 25px -5px rgb(0 0 0 / 0.5);
  border: 1px solid rgb(148 163 184 / 0.2);
  transition: opacity 0.15s;
}
/* eslint-disable */
.tooltip--top {
  bottom: -4px;
  left: 50%;
}

.tooltip--bottom {
  top: -4px;
  left: 50%;
}

.tooltip--left {
  right: -4px;
  top: 50%;
}

.tooltip--right {
  left: -4px;
  top: 50%;
}
/* eslint-enable */
</style>
