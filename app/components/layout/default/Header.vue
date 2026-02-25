<template>
  <header class="header">
    <NuxtLink
        class="logo"
        to="/"
    >Logo
    </NuxtLink>
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
      <KitTooltip position="bottom">
        <template #trigger>
          <KitAvatar
              :size="'md'"
          />
        </template>
        <template v-if="isHomePage" #content>
          <kit-button
              :full-width="true"
              :to="'/admin'"
              variant="outline"
              text="Панель администратора"
          />
        </template>
      </KitTooltip>
    </div>

  </header>
</template>

<script setup lang="ts">
import type {IUserCookie} from '../../../types/user'

const route = useRoute()
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

@media (max-width: 768px)  {
  .logo {
    display: none;
  }


}
</style>

