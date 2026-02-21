<template>
  <form class="post-form" @submit.prevent="emitSubmit">
    <label class="post-form__field">
      <span class="post-form__label">Заголовок</span>
      <input v-model="localValue.title" class="post-form__input" type="text" maxlength="255" required />
    </label>

    <label class="post-form__field">
      <span class="post-form__label">Краткое описание</span>
      <textarea v-model="localValue.excerpt" class="post-form__textarea" rows="3" />
    </label>

    <label class="post-form__field">
      <span class="post-form__label">Контент</span>
      <textarea v-model="localValue.content" class="post-form__textarea" rows="12" required />
    </label>

    <label class="post-form__checkbox">
      <input v-model="localValue.published" type="checkbox" />
      <span>Опубликовано</span>
    </label>

    <div class="post-form__actions">
      <KitButton type="submit" variant="primary" :disabled="loading">
        {{ loading ? 'Сохранение...' : submitLabel }}
      </KitButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { PostFormPayload } from '~/types/blog'

const props = defineProps<{
  modelValue: PostFormPayload
  loading?: boolean
  submitLabel?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: PostFormPayload): void
  (e: 'submit'): void
}>()

const localValue = computed({
  get: () => props.modelValue,
  set: (value: PostFormPayload) => emit('update:modelValue', value),
})

function emitSubmit() {
  emit('submit')
}
</script>

<style scoped lang="scss">
.post-form {
  display: grid;
  gap: 14px;
}

.post-form__field {
  display: grid;
  gap: 8px;
}

.post-form__label {
  color: $color-muted;
  font-size: 14px;
}

.post-form__input,
.post-form__textarea {
  width: 100%;
  border: 1px solid $color-border;
  border-radius: $radius-sm;
  background: rgb(var(--color-bg-rgb) / 0.25);
  color: $color-text;
  padding: 10px 12px;
}

.post-form__textarea {
  resize: vertical;
}

.post-form__checkbox {
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.post-form__actions {
  display: flex;
  justify-content: flex-start;
}
</style>
