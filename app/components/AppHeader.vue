<template>
  <header class="header">
    <div class="header__inner">
      <NuxtLink class="header__brand" to="/">
        <span class="header__dot" aria-hidden="true" />
        <span class="Logo__text" >Pro Moto Blog</span>
      </NuxtLink>

      <nav class="header__nav" aria-label="Навигация">
        <NuxtLink class="header__link" to="/">Главная</NuxtLink>
        <a class="header__link" href="#catalog">Карточки</a>
        <a class="header__link" href="#posts">Посты</a>
      </nav>

      <div class="header__actions">
        <span class="header__hint">Одна страница для разработки UI</span>
        <button v-if="isAdmin" class="button" type="button" @click="logout">Выйти</button>
        <button v-else class="header__burger" type="button" aria-label="Меню">
          <span class="header__burger-lines" aria-hidden="true"><span /></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const { refresh, isAdmin, logout } = useAuth()

onMounted(() => {
  refresh()
})
</script>

<style scoped>
.Logo__text{

}
</style>

