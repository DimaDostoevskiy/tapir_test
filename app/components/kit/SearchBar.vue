<template>
  <div class="search" aria-label="Поиск по постам">
    <input
      :value="modelValue"
      class="search__input"
      type="text"
      :placeholder="placeholder"
      aria-label="Поиск постов"
      @input="onInput"
      @keyup.enter="emitSubmit"
    />
    <button class="search__btn" type="button" aria-label="Искать пост" @click="emitSubmit">
      <svg class="search__icon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2" />
        <path d="M20 20L16.65 16.65" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
      </svg>
    </button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue: string
    placeholder?: string
  }>(),
  {
    placeholder: 'Поиск постов...',
  }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'submit'): void
}>()

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  emit('update:modelValue', target.value)
}

function emitSubmit() {
  emit('submit')
}
</script>

<style scoped lang="scss">
.search {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: min(100%, 320px);
  min-width: fit-content;
}

.search__input {
  flex: 1;
  height: 40px;
  padding: 0 14px;
  border-radius: 999px;
  border: 1px solid rgba(250, 250, 250, 0.18);
  background: rgba(255, 255, 255, 0.04);
  color: #fafafa;
  outline: none;
  transition: border-color 120ms ease, box-shadow 120ms ease, background-color 120ms ease;
  margin-right: 12px;
}

.search__input::placeholder {
  color: rgba(250, 250, 250, 0.55);
}

.search__input:focus {
  border-color: rgba(246, 114, 63, 0.65);
  box-shadow: 0 0 0 3px rgba(246, 114, 63, 0.2);
  background: rgba(255, 255, 255, 0.06);
}

.search__btn {
  top: 3px;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 0 16px;
  border: 1px solid rgba(246, 114, 63, 0.55);
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(246, 114, 63, 0.96), rgba(170, 145, 135, 0.92));
  color: #111111;
  font-weight: 700;
  cursor: pointer;
  transition: transform 120ms ease, filter 120ms ease;
}

.search__icon {
  width: 18px;
  height: 18px;
}

.search__btn:hover {
  filter: brightness(1.06);
}

.search__btn:active {
  transform: translateY(1px);
}

@media (max-width: 760px) {
  .search {
    width: 100%;
  }

  .search__btn {
    padding: 0 12px;
  }
}
</style>
