<script setup lang="ts">
import type {IUserCookie} from '../../../types/user'

const route = useRoute()
const cookieUser = useCookie('auth_user')
const searchQuery = useState<string>('postsSearchQuery', () => '')
const user = ref<IUserCookie | null>(null)
const isShowSearchInput = computed(() => route.path === '/' || route.path === '/admin/post/')

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
    } catch {
      user.value = null
    }
  }
})

</script>

<template>
  <header class="layout-header">
    <NuxtLink class="layout-header__logo" :to="'/'">Logo</NuxtLink>
    <div v-if="isShowSearchInput" class="layout-header__search">
      <KitInput placeholder="Поиск..." v-model="searchQuery"/>
    </div>
    <div class="layout-header__user">
      <div class="layout-header__user-info">
        <div class="layout-header__user-text">{{ user?.name || '' }}</div>
        <div class="layout-header__user-text">{{ user?.role || '' }}</div>
      </div>
      <KitAvatar class="ml-4" size="md"/>
    </div>
  </header>
</template>

<style scoped>
.layout-header {
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
  background: rgb(var(--color-bg-rgb) / 0);
  backdrop-filter: blur(10px);
  z-index: 10;
}

.layout-header__logo {
  display: flex;
  color: var(--color-primary);
  font-size: 2em;
  font-weight: 800;
  text-shadow: var(--color-primary);
}

.layout-header__search {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  width: min(560px, 100%);
}

.layout-header__user {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  text-align: right;
}

.layout-header__user-info {
  margin: 0 12px 0 0;
  display: block;
}

.layout-header__user-text {
  margin: 0;
}

@media (max-width: 768px) {

  .layout-header__user-info {
    display: none;
  }

  .layout-header__logo {
    display: none;
  }
}
</style>

