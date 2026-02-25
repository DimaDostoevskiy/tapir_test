<template>
  <div class="kit-image-upload">
    <label v-if="label" class="kit-image-upload__label">
      {{ label }}
      <span v-if="required" class="kit-image-upload__required">*</span>
    </label>
    <label class="kit-image-upload__trigger">
      <input
          type="file"
          accept="image/*"
          class="kit-image-upload__input"
          @change="onChange"
      />
      <span class="kit-image-upload__trigger-text">Выбрать файл</span>
    </label>
    <p v-if="error" class="kit-image-upload__error">{{ error }}</p>
    <div v-if="(modelValue ?? '').trim()" class="kit-image-upload__preview">
      <img :src="modelValue ?? ''" alt="Превью" class="kit-image-upload__preview-img"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
    defineProps<{
      modelValue?: string | null
      label?: string
      required?: boolean
    }>(),
    {required: false}
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const error = ref('')

const onChange = async (event: Event) => {
  error.value = ''
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  const formData = new FormData()
  formData.append('file', file)
  await $fetch<{ path: string }>('/api/upload', {
    method: 'POST',
    body: formData,
  }).then(res => {
    emit('update:modelValue', res.path)
  }).catch(() => {
    error.value = 'Не удалось загрузить изображение'
  })
  input.value = ''
}
</script>

<style scoped>
.kit-image-upload {
  display: grid;
  gap: 8px;
  width: 100%;
}

.kit-image-upload__label {
  display: block;
  margin-bottom: 2px;
  font-size: 0.9rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.015em;
  color: rgb(var(--color-text-rgb));
  opacity: 0.9;
}

.kit-image-upload__required {
  color: rgb(var(--color-danger-rgb));
}

.kit-image-upload__trigger {
  position: relative;
  display: flex;
  align-items: center;
  padding: 12px 16px;
  background: rgb(var(--color-surface-2-rgb) / 0.4);
  border: 1px solid rgb(var(--color-border-rgb) / 0.15);
  border-radius: var(--radius-sm);
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.kit-image-upload__trigger:hover {
  background: rgb(var(--color-surface-2-rgb) / 0.6);
  border-color: rgb(var(--color-border-rgb) / 0.3);
}

.kit-image-upload__input {
  position: absolute;
  inset: 0;
  inline-size: 100%;
  block-size: 100%;
  opacity: 0;
  cursor: pointer;
}

.kit-image-upload__trigger-text {
  font-size: clamp(0.95rem, 0.92rem + 0.14vw, 1.05rem);
  font-weight: 500;
  color: rgb(var(--color-text-rgb));
  letter-spacing: 0.01em;
}

.kit-image-upload__error {
  margin: 0;
  margin-top: 2px;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.4;
  color: rgb(var(--color-danger-rgb));
}

.kit-image-upload__preview {
  max-width: min(400px, 100%);
  overflow: hidden;
  border: 1px solid rgb(var(--color-border-rgb) / 0.15);
  border-radius: var(--radius-sm);
  background: rgb(var(--color-surface-2-rgb) / 0.2);
}

.kit-image-upload__preview-img {
  display: block;
  max-width: 100%;
  height: auto;
  vertical-align: top;
}
</style>
