<template>
  <header class="header">
    <div class="header__inner">
      <UserAvatar :image-url="userImageUrl" />
      <div class="search__container">
        <KitInput
          :placeholder="`Поиск...`"
          :model-value="searchString"
          @update:model-value="onSearchInput"
          @enter="searchPost"
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
.header__inner {
  width: min(100% - 32px, 1200px);
  margin: 0 auto;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
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
  min-width: 0;
}

@media (max-width: 760px) {
  .header__inner {
    gap: 10px;
  }

  .search__container {
    gap: 8px;
  }
}
</style>

