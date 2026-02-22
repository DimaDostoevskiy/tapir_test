<template>
  <header class="header">
    <div class="container">
      <KitAvatar
          :src="String(userImageUrl)"
          :size="'sm'"
      />
      <div class="user__info">
        <p class="user__info__text">{{ userName }}</p>
        <p class="user__info__text">{{ userRole }}</p>
      </div>
    </div>
    <div class="container">
      <KitInput
          :placeholder="`Поиск...`"
          :model-value="searchString"
          @update:model-value="onSearchInput"
          @enter:value="searchPost"
      />
      <KitButton
          class=""
          variant="primary"
          size="md"
          @click="searchPost"
      >
        Найти
      </KitButton>
    </div>
  </header>
</template>

<script setup lang="ts">
const userImageUrl = ref<string | null>(null)
const searchString = ref<string>('')
const userName = ref<string>('')
const userRole = ref<string>('')

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
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  max-width: 100vw;
  width: 1190px;
  height: 64px;
  margin: 0 auto;
  background: rgb(var(--color-bg-rgb) / 0.0);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.container {
  display: flex;
  position: sticky;
  top: 0;
  flex-direction: row;
  align-items: center;
  justify-content: left;

}

.user__info {
  display: none;
  align-items: center;
  flex-direction: column;
}

.user__info__text {
  align-items: center;
  flex-direction: column;
  padding: 0 0 0 8px;
  margin: 0;

}


@media (min-width: 768px) {
  .user__info {
    display: flex;
  }

}
</style>

