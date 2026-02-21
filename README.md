# Pro Moto Blog — Nuxt 4 + Sequelize + MySQL

## Что реализовано

- Публичный блог:
  - `GET /api/posts` — список опубликованных постов.
  - `GET /api/posts/:slug` — просмотр одного поста.
  - Страницы: `/blog`, `/blog/:slug`.
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

## Авторизация (Auth)

### Как работает

1. Пользователь заходит с параметром `?token=...` (например, `https://site/blog/?token=JWT`).
2. `app/middleware/auth.ts` читает `token` из query.
3. Middleware вызывает `GET /api/auth/me?token=...`.
4. `server/api/auth/me.get.ts` отправляет токен во внешний auth-сервис через заголовок `Authorization`.
5. Если auth-сервис вернул пользователя, в cookie `auth_user` сохраняются:
   - `role`
   - `name`
6. Для маршрутов `/admin*` доступ разрешен только если `auth_user.role === 'ADMIN'`.

### Используемые точки

- Внутренний endpoint проекта:
  - `GET /api/auth/me?token=<jwt>`
- Внешний auth-сервис (вызывается на сервере проекта):
  - сейчас зашит в `server/api/auth/me.get.ts` как `http://127.0.0.1:7000/api/auth`

### Cookies

- `auth_user` — объект пользователя `{ role, name }`
- `sameSite: 'lax'`

### Проверка на сервере (VPS)

Проверить внешний auth-сервис:

```bash
curl -i -H "Authorization: <JWT_TOKEN>" http://127.0.0.1:7000/api/auth
```

Проверить endpoint проекта:

```bash
curl -i "https://your-domain/blog/api/auth/me?token=<JWT_TOKEN>"
```

Ожидаемый ответ:

```json
{"role":"ADMIN","name":"..."}
```

### Частые проблемы

- **Нет query `token`**: middleware не вызывает `/api/auth/me`.
- **Роль не `ADMIN`**: для `/admin*` будет редирект на `/`.
- **Неверный/просроченный токен**: auth-сервис возвращает ошибку, пользователь не авторизуется.
- **Сломанный деплой `.output`**: `ERR_MODULE_NOT_FOUND` при старте Node (нужно пересобрать и перезапустить процесс).
- **Неправильный путь под baseURL `/blog`**: проверяйте URL с префиксом `/blog`.

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
