<template>
  <form class="post-form" @submit.prevent="emitSubmit">
    <label class="post-form__field">
      <span class="post-form__label">Заголовок</span>
      <KitFormControl v-model="titleValue" type="text" maxlength="255" required />
    </label>

    <label class="post-form__field">
      <span class="post-form__label">Краткое описание</span>
      <KitFormControl v-model="excerptValue" as="textarea" rows="3" />
    </label>

    <label class="post-form__field">
      <span class="post-form__label">Контент</span>
      <KitFormControl v-model="contentValue" as="textarea" rows="12" required />
    </label>

    <label class="post-form__checkbox">
      <input v-model="publishedValue" type="checkbox" />
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

function updateField<Key extends keyof PostFormPayload>(key: Key, value: PostFormPayload[Key]) {
  localValue.value = {
    ...localValue.value,
    [key]: value,
  }
}

const titleValue = computed({
  get: () => localValue.value.title,
  set: (value: string) => updateField('title', value),
})

const excerptValue = computed({
  get: () => localValue.value.excerpt,
  set: (value: string) => updateField('excerpt', value),
})

const contentValue = computed({
  get: () => localValue.value.content,
  set: (value: string) => updateField('content', value),
})

const publishedValue = computed({
  get: () => localValue.value.published,
  set: (value: boolean) => updateField('published', value),
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
