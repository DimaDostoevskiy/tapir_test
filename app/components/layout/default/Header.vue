<template>
  <header class="header">
    <a
        class="logo"
        :href="baseUrl"
    >Logo</a>
    <div v-if="isHomePage" class="search__container">
      <KitInput
          :placeholder="`Поиск...`"
          v-model="searchQuery"
      />
    </div>
    <div class="info__container">
      <div class="info">
        <div class="info__text">{{ user?.name || "" }}</div>
        <div class="info__text">{{ user?.role || "" }}</div>
      </div>
      <KitAvatar
          :size="'md'"
      />
    </div>

  </header>
</template>

<script setup lang="ts">
import type {IUserCookie} from '../../../types/user'

const route = useRoute()
const {app: appConfig} = useRuntimeConfig()
const baseUrl = appConfig.baseURL || '/blog/'
const cookieUser = useCookie('auth_user')
const searchQuery = useState<string>('postsSearchQuery', () => '')
const user = ref<IUserCookie | null>(null)
const isHomePage = computed(() => route.path === '/')

onMounted(() => {
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
  min-width: 320px;
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
  width: min(560px, 100%);
}

.info__container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: right;
}

.info {
  margin: 0 12px 0 0;
}

.logo {
  display: flex;
  color: var(--color-primary);
  font-size: 2em;
  font-weight: 800;
  text-shadow: var(--color-primary);
}

.header-tooltip__link {
  display: block;
  width: 100%;
  padding: 10px 16px;
  text-align: center;
  color: rgb(var(--color-text-rgb));
  background: transparent;
  border: 1px solid rgb(var(--color-border-rgb) / 0.5);
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.2s ease, border-color 0.2s ease;
}

.header-tooltip__link:hover {
  background: rgb(var(--color-surface-2-rgb) / 0.5);
  border-color: rgb(var(--color-primary-rgb));
}

@media (max-width: 768px) {
  .logo {
    display: none;
  }


}
</style>

