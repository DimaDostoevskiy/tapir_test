<template>
  <header class="header">
    <div class="container">
      <KitAvatar
          :src="userImageUrl"
          :size="'sm'"
      />
      <div class="user__info">
        <p class="user__info__text">{{ user.name }}</p>
        <p class="user__info__text">{{ user.role }}</p>
      </div>
    </div>
    <div class="container">
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
import { type BlogPost } from '~/types/blog'
import { type IUserCookie } from '~/types/user'

const searchString = ref<string>('')
const postList = ref<BlogPost[]>([])
const userImageUrl = ref<string>('')
const user = reactive<IUserCookie>({
  name: undefined,
  role: undefined,
})

const userCookie = useCookie('auth_user')

// Функция для получения постов
const fetchPosts = async () => {
  await useFetch<BlogPost[]>('/api/admin/posts')
      .then((res) => {
        console.log('Посты:', res)
      })
}

onMounted(() => {
  if (userCookie && userCookie.value) {
    // user.name = userCookie.value?.name.toString() || 'Инкогнито'
    // user.role = userCookie.value?.role.toString() || 'USER'
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

.container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
}

.user__info {
  display: none;
  flex-direction: column;
  align-items: start;
  justify-content: center;
  margin-left: 8px;
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

