<template>
  <header class="header">
    <div class="header__inner">
      <UserAvatar :image-url="userImageUrl" />
      <div class="search__container">
        <KitInput
          :placeholder="`Поиск...`"
          :model-value="searchString"
          @update:model-value="onSearchInput"
          @enter:value="searchPost"
        />
        <KitButton
            variant="primary"
            size="md"
            @click="searchPost"

        >
          Найти
        </KitButton>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import UserAvatar from '~/components/kit/UserAvatar.vue'
import {ref} from "vue";

const userImageUrl = ref<string | null>(null)
const searchString = ref<string>('')

const onSearchInput = (value: string) => {
  searchString.value = value
}

const searchPost = async () => {
  console.log(searchString.value)
}
</script>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: rgb(var(--color-bg-rgb) / 0.7);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
}

.header__inner {
  width: min(100% - 32px, var(--container-max));
  margin: 0 auto;
  min-height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 0;
}

.search__container {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 0 auto;
  width: fit-content;
  margin-left: auto;
}

.search__container :deep(.kit-input) {
  width: clamp(180px, 28vw, 320px);
  min-width: 0;
}

@media (max-width: 760px) {
  .header__inner {
    gap: 10px;
    min-height: 52px;
  }

  .search__container {
    gap: 8px;
  }

  .search__container :deep(.kit-input) {
    width: clamp(140px, 40vw, 220px);
  }
}
</style>

