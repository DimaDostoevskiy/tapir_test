<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__grid">
        <section class="footer__col" aria-label="Раздел: КАТАЛОГ">
          <h2 class="footer__title">Навигация</h2>
          <ul class="footer__list">
            <li class="footer__item"><NuxtLink class="footer__link" to="/">Главная</NuxtLink></li>
            <li class="footer__item"><NuxtLink class="footer__link" to="/blog">Блог</NuxtLink></li>
            <li class="footer__item"><NuxtLink class="footer__link" to="/admin/blog">Админка</NuxtLink></li>
          </ul>
        </section>

        <section class="footer__col" aria-label="Раздел: ПОКУПКА">
          <h2 class="footer__title">Для автора</h2>
          <ul class="footer__list">
            <li class="footer__item"><span class="footer__link">Вход — через внешний ресурс</span></li>
            <li class="footer__item"><span class="footer__link">Создание постов — только ADMIN</span></li>
            <li class="footer__item"><span class="footer__link">Сессия хранится в HttpOnly cookie</span></li>
            <li class="footer__item"><span class="footer__link">CRUD постов через админку</span></li>
          </ul>
        </section>

        <section class="footer__col" aria-label="Раздел: ИНФОРМАЦИЯ">
          <h2 class="footer__title">Информация</h2>
          <ul class="footer__list">
            <li class="footer__item"><a class="footer__link" href="#">О компании</a></li>
            <li class="footer__item"><a class="footer__link" href="#">Политика конфиденциальности</a></li>
            <li class="footer__item"><a class="footer__link" href="#">Пользовательское соглашение</a></li>
            <li class="footer__item"><a class="footer__link" href="#">Публичная оферта</a></li>
          </ul>
        </section>

        <section class="footer__col" aria-label="Раздел: КОНТАКТЫ">
          <h2 class="footer__title">Контакты</h2>
          <ul class="footer__list">
            <li class="footer__item"><a class="footer__link" href="#">+7 (000) 000‑00‑00</a></li>
            <li class="footer__item"><a class="footer__link" href="#">hello@example.com</a></li>
            <li class="footer__item"><a class="footer__link" href="#">Москва</a></li>
            <li class="footer__item"><a class="footer__link" href="#">Реквизиты</a></li>
          </ul>
        </section>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid rgb(var(--color-text-rgb) / 0.08);
  background: var(--color-bg);
}

.footer__inner {
  width: min(100% - 32px, var(--container-max));
  margin-inline: auto;
  padding: 44px 0;
}

.footer__grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 34px;
}

.footer__title {
  margin: 0 0 14px;
  font-size: 14px;
  letter-spacing: 0.35px;
  text-transform: uppercase;
  color: rgb(var(--color-text-rgb) / 0.55);
  font-weight: 700;
}

.footer__list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.footer__item {
  margin: 0;
}

.footer__link {
  color: rgb(var(--color-text-rgb) / 0.78);
  font-weight: 500;
  font-size: 14px;
  line-height: 1.35;
  transition: color 120ms ease;
}

.footer__link:hover {
  color: var(--color-text);
}

@media (max-width: 900px) {
  .footer__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 26px;
  }
}

@media (max-width: 520px) {
  .footer__grid {
    grid-template-columns: 1fr;
    gap: 22px;
  }
}
</style>

