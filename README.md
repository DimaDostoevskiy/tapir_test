# Pro Moto Blog — Nuxt 4 + Sequelize + MySQL

## Что реализовано

- Публичный блог:
  - `GET /api/posts` — список опубликованных постов.
  - `GET /api/posts/:slug` — просмотр одного поста.
  - Страницы: `/blog`, `/blog/:slug`.
- Админка постов (только ADMIN):
  - `GET /api/admin/posts`
  - `POST /api/admin/posts`
  - `GET /api/admin/posts/:id`
  - `PUT /api/admin/posts/:id`
  - `DELETE /api/admin/posts/:id`
  - Страницы: `/admin/blog`, `/admin/blog/create`, `/admin/blog/:id/edit`.
- Auth flow через внешний ресурс:
  - Вход по redirect на `/auth/callback?token=...`.
  - Nuxt сервер validate токен через внешний `whoami`.
  - При `Role=ADMIN` создаётся серверная сессия и ставится `HttpOnly` cookie.
  - `POST /api/auth/logout` очищает сессию, `GET /api/auth/me` возвращает текущего пользователя.
- База данных:
  - `Sequelize + MySQL` только для таблицы `posts`.
  - Пользователи приходят из внешней системы.

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

SESSION_COOKIE_NAME=pro_moto_blog
SESSION_SECRET=dev-change-me
SESSION_TTL_SECONDS=28800
```

## Запуск

```bash
npm install
npm run dev
```
