<template>
  <div class="avatar__wrapper">
    <img
      class="avatar__img"
      :src="resolvedImageUrl"
      alt="Аватар пользователя"
      loading="lazy"
    >
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{ imageUrl?: string | null }>(), { imageUrl: null })

type AuthUserCookie = {
  role?: string
  name?: string
} | null

const authUser = useCookie<AuthUserCookie>('auth_user', {
  sameSite: 'lax',
})

const resolvedImageUrl = ref(props.imageUrl?.trim() || '/avatar/default.svg')

</script>

<style scoped>
.avatar__wrapper {
  display: flex;
  align-items: center;
  min-width: 0;
}

.avatar__img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgb(var(--color-text-rgb) / 0.24);
  background: rgb(var(--color-surface-2-rgb) / 0.7);
  flex-shrink: 0;
}

</style>
