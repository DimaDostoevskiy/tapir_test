<template>
  <div class="avatar__wrapper">
    <img
      class="avatar__img"
      :src="resolvedImageUrl"
      alt="Аватар пользователя"
      loading="lazy"
    >
    <div class="avatar__text">
      {{ avatarText }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ imageUrl?: string | null }>(), {imageUrl: null,})

type AuthUserCookie = {
  role?: string
  name?: string
} | null

const authUser = useCookie<AuthUserCookie>('auth_user', {
  sameSite: 'lax',
})

const resolvedImageUrl = ref(props.imageUrl?.trim() || '/avatar/default.svg')

const avatarText = computed(() => {
  const name = authUser.value?.name?.trim()
  const role = authUser.value?.role?.trim()

  if (!name && !role) {
    return 'Гость'
  }

  if (name && role) {
    return `${role} ${name}`
  }

  return name || role || 'Гость'
})

</script>

<style scoped lang="scss">
.avatar__wrapper {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  min-width: 0;
  white-space: nowrap;
  max-width: min(100%, 360px);
}

.avatar__img {
  order: 1;
  width: 42px;
  height: 42px;
  object-fit: cover;
  border: 1px solid $color-primary;
  border-radius: 50%;
  background: #161616;
  flex-shrink: 0;
}

.avatar__text {
  order: 2;
  display: inline-block;
  font-weight: 700;
  color: rgba(250, 250, 250, 0.86);
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
