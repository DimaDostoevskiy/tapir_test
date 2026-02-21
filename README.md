# Pro Moto Blog — Nuxt 4 + Sequelize + MySQL

## Что реализовано

Фактически сейчас работает на https://motodart.pro/blog

- Публичный блог:
  - `GET /api/posts` — список опубликованных постов.
  - `GET /api/posts/:slug` — просмотр одного поста.
  - `/blog`, `/blog/:slug`.
- Админка постов:
  - `GET /api/admin/posts`
  - `POST /api/admin/posts`
  - `GET /api/admin/posts/:id`
  - `PUT /api/admin/posts/:id`
  - `DELETE /api/admin/posts/:id`
  - Страницы: 
  - `mysite.pro/blog/`
  - `mysite.pro/blog/admin/`, 
  - `mysite.pro/blog/admin/blog`, 
  - `mysite.pro/blog/admin/blog/create`, 
  - `mysite.pro/blog/admin/blog/:id/edit`.
- База данных:
  - `Sequelize + MySQL` только для таблицы `posts`. 
  - Подключается к работающей уже базе, но может управлять только таблицей "Post"
  - А к пользователям у неё нет доступа. 
  - Пользователя получаем из базы через GET на http://127.0.0.1:7000/auth/
  - With token in "Authorization" header 

## Авторизация

### Как работает

1. Пользователь заходит с параметром `?token=...` (например, `https://mysyte.pro.blog/?token=JWT`).
2. `app/middleware/auth.ts` читает `token` из query.
3. Middleware вызывает (тут надо переделать, наверное) `GET /api/auth/me?token=...`.
4. `server/api/auth/me.get.ts` отправляет токен во внешний auth-сервис через заголовок `Authorization`.
5. Если auth-сервис вернул пользователя, в cookie `auth_user` сохраняются:
   - `role`
   - `name`
6. Для маршрутов `/admin*` доступ разрешен только если `auth_user.role === 'ADMIN'`.

### Используемые точки
- `GET /api/auth/me?token=<jwt>` - Внешний auth-сервис)
- Ожидаемый ответ:
```json
{"role":"ADMIN","name":"..."}
```
### Cookies

- `auth_user` — объект пользователя `{ role, name }`
- `sameSite: 'lax'`

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
