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
      <button class="button button--primary" type="submit" :disabled="loading">
        {{ loading ? 'Сохранение...' : submitLabel }}
      </button>
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
