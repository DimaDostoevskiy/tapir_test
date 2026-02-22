<template>
  <header class="header">
    <KitAvatar
        v-if="user"
        :userName="user?.name ?? ''"
        :userRole="user?.role ?? ''"
        :size="'md'"
    />
    <div class="search__container">
      <KitInput
          :placeholder="`Поиск...`"
          :model-value="searchString"
          @change="fetchPosts"
          @enter:value="fetchPosts"
      />
      <KitButton
          class=""
          variant="primary"
          size="md"
          @click="fetchPosts"
      >
        Найти
      </KitButton>
    </div>
  </header>
</template>

<script setup lang="ts">
import type { BlogPost } from '~/types/blog'
import type { IUserCookie } from '../types/user'

const searchString = ref<string>('')
const cookieUser = useCookie('auth_user')

// Вариант 1: С проверкой на существование (рекомендуется)
const user = ref<IUserCookie | null>(null)

// Функция для получения постов
const fetchPosts = async () => {
  try {
    const { data } = await useFetch<BlogPost[]>('/api/admin/posts')
    console.log('Посты:', data.value)
  } catch (error) {
    console.error('Ошибка загрузки постов:', error)
  }
}

onMounted(() => {
  // Правильное присваивание с проверкой
  if (cookieUser.value) {
    try {
      // Если кука хранит JSON строку
      if (typeof cookieUser.value === 'string') {
        user.value = JSON.parse(cookieUser.value) as IUserCookie
      } else {
        // Если кука уже объект
        user.value = cookieUser.value as IUserCookie
      }
    } catch (error) {
      console.error('Ошибка парсинга пользователя:', error)
      user.value = null
    }
  }
})

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
  padding: 0 16px;
  background: rgb(var(--color-bg-rgb) / 0.0);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.search__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}

@media (min-width: 768px) {
}
</style>

