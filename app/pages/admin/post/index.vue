<script setup lang="ts">
import type {BlogPost} from '~/types/blog'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Админка',
})

const {data: posts, pending, error: fetchError, refresh} = await useFetch<BlogPost[]>('/api/posts/get-all')

const removePost = async (id: number) => {
  if (!confirm('Удалить пост?')) {
    return
  }

  await $fetch(`/api/posts/${id}`, {
    method: 'DELETE',
  } as Record<string, unknown>)

  await refresh()
}
</script>

<template>
  <LayoutDefaultSection :title="'Управление постами'">
    <template #section-controls>
      <nuxt-link class="link-btn link-btn--outline"
                 :to="`/admin/post/create`"
      >Создать новый пост
      </nuxt-link>
    </template>
    <template #section-content>
      <KitAlert v-if="pending"
                :type="'success'"
                :title="`Загрузка данных...`"
                :text="`...`"
      />
      <KitAlert v-if="fetchError"
                :type="'error'"
                :title="`Ошибка!`"
                :text="String(fetchError)"
      />
      <div class="admin-page__list scroll">
        <post-admin-card v-for="post in posts"
                         :key="post.id"
                         :post="post"
                         @remove="removePost"
        />
      </div>
    </template>
  </LayoutDefaultSection>
</template>
