<template>
  <footer class="layout-footer">
    <div class="layout-footer__inner">
      <div class="layout-footer__grid">
        <section class="layout-footer__col" aria-label="Раздел: КАТАЛОГ">
          <h2 class="layout-footer__title">Навигация</h2>
          <ul class="layout-footer__list">
            <li class="layout-footer__item">
              <a class="layout-footer__link" :href="baseUrl + '/'">Главная</a>
            </li>
            <li class="layout-footer__item">
              <a class="layout-footer__link" :href="baseUrl">Блог</a>
            </li>
            <li class="layout-footer__item">
              <a class="layout-footer__link" :href="baseUrl +'admin/'">Админка</a>
            </li>
          </ul>
        </section>

        <section class="layout-footer__col" aria-label="Раздел: ПОКУПКА">
          <h2 class="layout-footer__title">Для автора</h2>
          <ul class="layout-footer__list">
            <li class="layout-footer__item"><span class="layout-footer__link">Вход — через внешний ресурс</span></li>
            <li class="layout-footer__item"><span class="layout-footer__link">Создание постов — только ADMIN</span></li>
            <li class="layout-footer__item"><span class="layout-footer__link">Сессия хранится в HttpOnly cookie</span>
            </li>
            <li class="layout-footer__item"><span class="layout-footer__link">CRUD постов через админку</span></li>
          </ul>
        </section>

        <section class="layout-footer__col" aria-label="Раздел: ИНФОРМАЦИЯ">
          <h2 class="layout-footer__title">Информация</h2>
          <ul class="layout-footer__list">
            <li class="layout-footer__item"><a class="layout-footer__link" href="#">О компании</a></li>
            <li class="layout-footer__item"><a class="layout-footer__link" href="#">Политика конфиденциальности</a></li>
            <li class="layout-footer__item"><a class="layout-footer__link" href="#">Пользовательское соглашение</a></li>
            <li class="layout-footer__item"><a class="layout-footer__link" href="#">Публичная оферта</a></li>
          </ul>
        </section>

        <section class="layout-footer__col" aria-label="Раздел: КОНТАКТЫ">
          <h2 class="layout-footer__title">Контакты</h2>
          <ul class="layout-footer__list">
            <li class="layout-footer__item"><a class="layout-footer__link" href="#">+7 (000) 000‑00‑00</a></li>
            <li class="layout-footer__item"><a class="layout-footer__link" href="#">hello@example.com</a></li>
            <li class="layout-footer__item"><a class="layout-footer__link" href="#">Москва</a></li>
            <li class="layout-footer__item"><a class="layout-footer__link" href="#">Реквизиты</a></li>
          </ul>
        </section>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const {app: appConfig} = useRuntimeConfig()
const baseUrl = appConfig.baseURL || '/blog/'
</script>

<style scoped>
.layout-footer {
  top: -100px;
  position: relative;
  background-color: rgba(0, 0, 0, 0.1);
  transition: all 1s ease-in-out;
}

.layout-footer:hover {
  top: -300px;
  background-color: var(--color-bg);
  transition: all 1s ease-in-out;
  z-index: 999;
}

.layout-footer__inner {
  width: 100vw;
  min-width: 320px;
  max-width: 1190px;
  margin-inline: auto;
  padding: 44px 0;
}

.layout-footer__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 34px;
}

.layout-footer__title {
  margin: 0 0 14px;
  font-size: 14px;
  letter-spacing: 0.35px;
  text-transform: uppercase;
  color: rgb(var(--color-text-rgb) / 0.55);
  font-weight: 700;
}

.layout-footer__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.layout-footer__item {
  margin: 0;
}

.layout-footer__link {
  color: rgb(var(--color-text-rgb) / 0.78);
  font-weight: 500;
  font-size: 14px;
  line-height: 1.35;
  transition: color 120ms ease;
}

.layout-footer__link:hover {
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .layout-footer__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 26px;
  }
}

@media (max-width: 560px) {
  .layout-footer__grid {
    grid-template-columns: 1fr;
    gap: 22px;
  }
}
</style>

