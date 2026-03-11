<template>
  <form class="kit-form"
        submit-label=""
        @submit.prevent="$emit('submit')"
  >
    <slot/>
    <div v-if="submitLabel" class="kit-form__actions">
      <KitButton
          type="submit"
          variant="primary"
          :disabled="loading || submitDisabled"
      >
        {{ loading ? loadingText : submitLabel }}
      </KitButton>
    </div>
  </form>
</template>

<script setup lang="ts">
defineProps({
  submitLabel: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  loadingText: {
    type: String,
    default: 'Сохранение...'
  },
  submitDisabled: {
    type: Boolean,
    default: false
  }
})

defineEmits<{
  (e: 'submit'): void
}>()
</script>

<style scoped>
.kit-form {
  display: grid;
  gap: 14px;
}

.kit-form__actions {
  display: flex;
  justify-content: flex-start;
}
</style>
