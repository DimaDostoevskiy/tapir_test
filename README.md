# Pro Moto Blog — Nuxt 4 + Sequelize + MySQL

## Что реализовано

- Публичный блог:
  - `GET /api/posts` — список опубликованных постов.
  - `GET /api/posts/:slug` — просмотр одного поста.
  - Страницы: `/blog`, `/blog/:slug`.
- Админка постов (только ADMIN):
- Админка постов:
  - `GET /api/admin/posts`
  - `POST /api/admin/posts`
  - `GET /api/admin/posts/:id`
  - `PUT /api/admin/posts/:id`
  - `DELETE /api/admin/posts/:id`
  - Страницы: `/admin/blog`, `/admin/blog/create`, `/admin/blog/:id/edit`.
- База данных:
  - `Sequelize + MySQL` только для таблицы `posts`.
  - Пользователи в проекте не используются.

## Переменные окружения

Nuxt 4 требует Node **`^20.19.0`** или **`>=22.12.0`** (см. `package.json#engines`).

```env
NODE_ENV=development
HOST=127.0.0.1
PORT=3000
DB_NAME=db_blog_name
DB_USER=root
DB_PASSWORD=
DB_HOST=127.0.0.1
DB_PORT=3306
MAIL_KEY=
```

## Запуск

```bash
npm install
npm run dev
```
