<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__grid">
        <section class="footer__col" aria-label="Раздел: КАТАЛОГ">
          <h2 class="footer__title">Навигация</h2>
          <ul class="footer__list">
            <li class="footer__item"><NuxtLink class="footer__link" to="/">Главная</NuxtLink></li>
            <li class="footer__item"><NuxtLink class="footer__link" to="/blog">Блог</NuxtLink></li>
            <li class="footer__item"><NuxtLink class="footer__link" to="/catalog">Каталог</NuxtLink></li>
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

