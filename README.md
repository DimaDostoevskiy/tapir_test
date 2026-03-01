## Описание

Блог, с возможностью автоматически генерировать посты.

### Технический стек

- Nuxt 4 (публичная часть — SSR, админка — SPA)
- Sequelize + MySQL

### Основной функционал

- Авторизация/аутентификация:
- CRUD по постам для админа:
- Возможность автоматически сгенерировать пост.
- Поиск по постам
- Автоматическая загрузка постов (бесконечная лента)

## Страницы

- Главная..............................<https://motodart.pro/blog/>
- Страница поста.................<https://motodart.pro/blog/:slug>
- Панель администратора...<https://motodart.pro/blog/admin/>
- Управление постами.........<https://motodart.pro/blog/admin/blog>
- Создать пост......................<https://motodart.pro/blog/admin/blog/create>
- Изменить пост....................<https://motodart.pro/blog/admin/blog/:id/edit>

## Базы данных (Sequelize + MySQL)

#### Подключение MySQL

- DB_NAME= -имя базы данных
- DB_USER= -пользователь базы данных
- DB_PASSWORD= -пароль пользователя базы данных
- DB_HOST= -хост базы данных
- DB_PORT= -порт базы данных

#### Init Sequelize

- запускается plugin initDb там можно задать `{alter: true, force: false}`
- модели в `/server/models/`

### Таблицы

| Поле        | Тип                                          | NULL  | По умолчанию | Описание           |
|-------------|----------------------------------------------|-------|--------------|--------------------|
| **Posts**   |                                              |       |              |                    |
| `id`        | `INT`<br/> `UNSIGNED` <br/> `AUTO_INCREMENT` | `NO`  | —            | Первичный ключ     |
| `title`     | `VARCHAR(255)`                               | `NO`  | —            | Заголовок поста    |
| `slug`      | `VARCHAR(255)` <br/> `UNIQUE`                | `NO`  | —            | URL  slug          |
| `excerpt`   | `TEXT`                                       | `YES` | `NULL`       | Краткое описание   |
| `content`   | `LONGTEXT`                                   | `NO`  | —            | Полный текст поста |
| `published` | `BOOLEAN`                                    | `NO`  | `TRUE`       | Флаг публикации    |
| `image`     | `VARCHAR(512)`                               | `YES` | `NULL`       | URL картинки       |
| `createdAt` | `DATETIME`                                   | `NO`  | —            | Дата создания      |
| `updatedAt` | `DATETIME`                                   | `NO`  | —            | Дата обновления    |

## Авторизация

- При переходе из коневого `mysite.pro/` на `mysite.pro/blog/` в запрос добавляется query-параметр `token`, если
  пользователь авторизован.
- Делаем запрос на внешний ресурс, который меняет `token` на пользователя (env EXTERNAL_AUTH_URL).
- Если нет токена, или внешний сервис не ответил или ответил ошибкой, то устанавливаем
  пользователя `{role: USER, name: John Doe}`
- Зашиваем в cookies юзера.
- То есть авторизоваться можно, только при непосредственном переходе из корневого домена.

***Для тестирования реализована простая смена ролей***

- `/blog/?token=ADMIN`
- `/blog/?token=USER`
- `/blog/?token=CUSTOMER`

#### Роли

| Роль       | Разрешённые действия                                             | Доступные страницы                 |
|------------|------------------------------------------------------------------|------------------------------------|
| `ADMIN`    | - CRUD по постам                                                 | Все страницы                       |
| `USER`     | - Просматривать ленту постов                                     | `/blog/`                           |
| `CUSTOMER` | - Читать посты полностью. <br/> - Лайкать посты (не реализовано) | `/blog/`,`/blog/:slug`,`/blog/:id` |

#### Cookies

- `auth_user { role: string, name: string }`
- `sameSite: 'lax'`

## Endpoints

| Метод   | Endpoint                | Описание                                  | Параметры                                                                                                                                       |              |
|---------|-------------------------|-------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------|--------------|
| `Auth`  |                         |                                           |                                                                                                                                                 |              |
| GET     | `/api/auth/me`          | Обмен `token` на пользователя             | `token`                                                                                                                                         |              |
| GET     | `/api/auth/mok`         | Создание постов для теста                 | —                                                                                                                                               |              |
| `Post`  |                         |                                           |                                                                                                                                                 |              |
| GET     | `/api/posts/:[id]`      | Один пост                                 | `:id`  (number)                                                                                                                                 |              |
| GET     | `/api/posts/:[slug]`    | Один опубликованный пост                  | `:slug` - (string)                                                                                                                              |              |
| GET     | `/api/posts/get-all`    | Список опубликованных постов              | `limit` (number),<br/> `offset` (number), <br/> `q` (string) - search string)                                                                   |              |
| POST    | `/api/posts/create`     | Создание поста                            | Object <br> `title` (string) <br> `slug` (string) <br> `excerpt` (string) <br> `content` (string) <br> `published` (bool) <br> `image` (string) |              |
| POST    | `/api/posts/update`     | Обновление поста                          | Object <br> `title` (string) <br> `excerpt` (string) <br> `content` (string) <br> `published` (bool) <br> `image` (string)                      |              |
| DELETE  | `/api/posts/:id`        | Удаление поста                            | `:id`                                                                                                                                           |              |
| `Файлы` |                         |                                           |                                                                                                                                                 |              |
| POST    | `/api/files/upload`     | Загрузка изображения                      | Multipart form data <br> `file`/`image`                                                                                                         |              |
| `LLM`   |                         |                                           |                                                                                                                                                 |              |
| POST    | `/api/ai/generate-post` | Генерация черновика поста (GitHub Models) | Object <br> `promptTheme`(string)                                                                                                               |              |

## Автоматическая генерация постов

- Заходим на страницу создания поста (`/blog/admin/blog/create`)
- Нажимаем `Создать автоматически`,
- В появившемся поле вводим тему поста
- Отправляем **POST** запрос на `/api/ai/generate-post` с телом:

  ```json
  { "promptTheme": "Тема поста" }
  ```

- Читаем `githubModelsApiKey` из `runtimeConfig` (env `GITHUB_MODELS_API_KEY`);
- Формируем и отправляем **POST** запрос на `https://models.inference.ai.azure.com/chat/completions`
- Если сервис отвечает ошибкой: пробрасывает `502` с текстом ошибки.
- Если 200: парсим ответ и подставляет в форму.
- Дальше админ может отредактировать и сохранить пост `/api/posts/create`.

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
FILES_BASE_URL= -путь к папке со статикой
UPLOAD_DIR= -папка, в которую будет загружается статика
EXTERNAL_AUTH_URL= -путь для обмена token на user 
GITHUB_MODELS_API_KEY= -ключ github для генерации постов
MAIL_KEY= -ключ для отправки e-mail
```

## Развёртывание

! Nuxt 4 требует Node **`^20.19.0`** или **`>=22.12.0`**

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
- `npm run dev` - запустить в режиме dev
- `npm run build` - собрать проект
- `npm run preview` - запускает сервер, который отдаёт то, что лежит в `.output/`

## Частые проблемы

- Не изменились файлы в папке `.output`

    - Удалить папку `.output` и пересобрать

- Версия **Node.js** при развёртывании через actions не совпадает с той, которая в среде развёртывания.

    - Если **Node.js** установлен через nvm, то нужно установить необходимую версию глобально.
