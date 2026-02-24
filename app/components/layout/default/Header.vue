<template>
  <header class="header">
    <KitTooltip position="bottom">
      <template #trigger>
        <KitAvatar
            :size="'md'"
        />
      </template>
      <template #content>
        <div class="avatar-tooltip">
          <div class="avatar-tooltip__text">{{ user?.name || "" }}</div>
          <div class="avatar-tooltip__text">{{ user?.role || "" }}</div>
          <KitButton
              variant="outline"
              size="md"
              title="Перейти"
              @click.stop="goToUserPage"
          >
            Перейти на страницу
          </KitButton>
        </div>
      </template>
    </KitTooltip>
    <div v-if="isHomePage" class="search__container">
      <KitInput
          :placeholder="`Поиск...`"
          v-model="searchQuery"
      />
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

const goToUserPage = () => {
  console.log(22)
}

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
  height: 64px;
  margin: 0 auto;
  padding: 0;
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

.avatar-tooltip {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: fit-content;
  z-index: 999;
}

.avatar-tooltip__text {
  margin: 0 0 12px 12px;
  width: 100%;
  text-align: left;
}

@media (min-width: 768px) {
}
</style>

