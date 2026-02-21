<template>
  <div class="avatar-wrapper">
    <div class="avatar__text">
      {{ avatarText }}
    </div>
    <div>
      <img class="avatar__img"
           :src="resolvedImageUrl"
           alt="Аватар пользователя"
           loading="lazy"
      >
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

.avatar-wrapper {

  display: flex;
  flex-direction: row;
  align-items: center;
  width: 800px;
  background-color: #d70101;
}

.avatar__img {
  align-items: center;
  justify-content: center;
  height: 42px;
  border: 1px solid $color-primary;
  border-radius: 999px;
  color: #111111;
  font-weight: 700;
  cursor: pointer;
  transition: all 4s ease;
}

.avatar__img:hover {
  border-radius: 444px;
  background: linear-gradient(135deg, rgba($color-primary, 0.1), rgba($color-primary-hover, 0.1));
  color: #111111;
  font-weight: 700;
  cursor: pointer;
}

.avatar__text {
  position: absolute;
  left: 64px;
  font-weight: 700;
  color: rgba(250, 250, 250, 0.86);
  font-size: 14px;
}
</style>
