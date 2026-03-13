<script setup lang="ts">
import type {BlogPost} from '~/types/blog'

definePageMeta({
  middleware: ['auth'],
})

useSeoMeta({
  title: 'Админка',
})

// Первую порцию постов получаем перед сборкой на сервере (SSR)
const {data: initialPosts, pending, refresh} = await useAsyncData('posts-initial', () => postService.getPostList())

const searchQuery = useState<string>('postsSearchQuery', () => '')
const router = useRouter()
const postService = usePostService()

const QUERY_LIMIT = 5
const isLoading = ref<boolean>(false)
const postList = ref<BlogPost[]>(initialPosts.value ?? [])

const removePostClickHandler = async (id: number) => {
  if (!confirm('Удалить пост?')) return

  isLoading.value = true

  $fetch(`/api/post/${id}`, {
    method: 'DELETE',
  } as Record<string, unknown>)
      .then(() => {
        refresh()
      })
      .catch(err => {
        alert(err);
      })
      .finally(() => {
        isLoading.value = false
      })
}

const editPostClickHandler = (id: number) => {
  router.push(`/admin/post/edit/${String(id)}`)
}

const scrollListHandler = async () => {
  const chunk = await postService.getPostList(searchQuery.value, QUERY_LIMIT, postList.value.length)
  postList.value = [...postList.value, ...chunk]
}

watch(searchQuery, async (newValue) => {
  postList.value = await postService.getPostList(newValue, QUERY_LIMIT, 0)
})
</script>

<template>
  <LayoutDefaultSection :title="'Управление постами'">
    <template #section-controls>
      <KitButton to="/admin/post/create"
                 variant="primary"
                 text="Создать"
      />
    </template>
    <template #section-content>
      <PostList @bottom-scroll="scrollListHandler">
        <PostCard v-for="post in postList"
                  class="mb-4"
                  :key="post.id"
                  :post="post"
        >
          <template #controls>
            <div class="control__wrapper">
              <KitButton :text="'Редактировать'"
                         class="m-1"
                         :size="'sm'"
                         :variant="'success'"
                         :icon-right="`🔧`"
                         @click="editPostClickHandler(post.id)"
              />
              <KitButton :text="'Удалить пост'"
                         class="m-1"
                         :size="'sm'"
                         :variant="'danger'"
                         :icon-right="`🗑️`"
                         @click="removePostClickHandler(post.id)"
              />
            </div>
          </template>
        </PostCard>
        <KitAlert v-if="pending"
                  :type="'success'"
                  :title="`Загрузка данных...`"
                  :text="`...`"
        />
        <KitAlert v-if="!pending && postList.length > 0"
                  class="pl-8"
                  title="элементов больше нет"
        />
      </PostList>
    </template>
  </LayoutDefaultSection>
</template>

<style scoped>
.control__wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: right;
  min-width: 100%;
}

@media (max-width: 768px) {
  .control__wrapper {
    flex-direction: column;
  }
}
</style>
