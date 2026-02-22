<template>
  <form class="kit-form" @submit.prevent="$emit('submit')">
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
withDefaults(
    defineProps<{
      submitLabel?: string
      loading?: boolean
      loadingText?: string
      submitDisabled?: boolean
    }>(),
    {
      loading: false,
      loadingText: 'Сохранение...',
      submitDisabled: false,
    }
)

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

:deep(.kit-form__checkbox) {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}
</style>
