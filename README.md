# Блог с автоматической генерацией постов (Nuxt 4 + Sequelize + MySQL)

## Описание

Блог с возможностью генерировать посты.

## Задачи

- SEO
- Работает с отдельной базой и не имеет доступ к основной.
- Работает как ещё один процесс в PM2
- Proxy только на /blog
- Посты можно генерировать

## Страницы

- Главная <https://motodart.pro/blog/>
- Страница поста <https://motodart.pro/blog/:slug>
- Панель администратора <https://motodart.pro/admin/>
- Управление постами <https://motodart.pro/admin/blog>
- Создать пост <https://motodart.pro/admin/blog/create>
- Изменить пост <https://motodart.pro/blog/:id/edit>

## Базы данных (Sequelize + MySQL):

- База данных

## Авторизация

1. Пользователь заходит с параметром `?token=...` (например, `https://mysyte.pro.blog/?token=JWT`).
2. `app/middleware/auth.ts` читает `token` из query.
3. Middleware вызывает (тут надо переделать, наверное) `GET /api/auth/me?token=...`.
4. `server/api/auth/me.get.ts` отправляет токен во внешний auth-сервис через заголовок `Authorization`.
5. Если auth-сервис вернул пользователя, в cookie `auth_user` сохраняются:
    - `role`
    - `name`
6. Для маршрутов `/admin*` доступ разрешен только если `auth_user.role === 'ADMIN'`.

### Используемые точки

- `GET /api/auth/me?token=<jwt>` — прокси к внешнему auth‑сервису
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



## Загрузка и раздача изображений


## Генерация постов (DeepSeek)

## Переменные окружения

```env
NODE_ENV= -окружение
HOST= -хост
PORT= -порт

DB_NAME= -имя базы данных
DB_USER= -пользователь базы данных
DB_PASSWORD= -пароль пользователя базы данных
DB_HOST= -хост базы данных
DB_PORT= -порт базы данных

MAIL_KEY= -ключ для отправки e-mail
FILES_BASE_URL= -путь к папки со статикой
UPLOAD_DIR= -папка, в которую будет загружается статика

GITHUB_MODELS_API_KEY= -ключ github для генерации постов

```

## Развёртывание
Nuxt 4 требует Node **`^20.19.0`** или **`>=22.12.0`**

GitHub Actions. Файл конфигурации: `.github/workflows/deploy.yml`:

- Секреты для GitHub Actions:
    - `VPS_HOST`,
    - `VPS_USER`,
    - `VPS_SSH_KEY`,
    - `VPS_PORT`;
    - `TELEGRAM_BOT_TOKEN`;
    - `TELEGRAM_CHAT_ID`;


- Триггер: `push` в ветку `master`.


- Шаги:
    - Подключаемся по SSH
    - Переходим в папку проекта `cd /project/folder`;
    - Копируем папку с собранным проектом для восстановления, в случае неудачи. 
    - Получаем последние изменения `git pull origin master`;
    - Устанавливаем зависимости `npm install`;
    - Собираем проект `npm run build`;
    - Перезапускаем PM2.
    - Дёргаем ручку для проверки работоспособности;
    - Если что-то пошло не так - возвращаем папку с собранным проектом
    - Отправляем уведомление в Telegram

## Локальный запуск
- `npm install` - установить пакеты
- `npm run build` - собрать проект
- `npm run dev` - запустить в режиме dev
- `npm run preview` - запускает сервер, который отдаёт то, что лежит в `.output/`
