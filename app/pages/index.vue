<template>
  <div class="home">
    <section class="home__hero">
      <div class="home__content">
        <h1 class="home__title">Кроссовки, которые хочется носить каждый день</h1>
        <p class="home__subtitle">
          Тестовое приложение на Nuxt 4 с SSR: переход в каталог, карточки товаров, пагинация «Показать ещё» и обработка
          сетевых ошибок.
        </p>

        <NuxtLink class="button button--primary" to="/catalog">В каталог</NuxtLink>
      </div>

      <aside class="home__panel">
        <p class="home__panel-title">Что внутри</p>
        <ul class="home__panel-list">
          <li>SSR загрузка первой страницы</li>
          <li>Постраничная подгрузка товаров</li>
          <li>SCSS + BEM, grid и flex</li>
          <li>Адаптивная сетка карточек</li>
        </ul>
      </aside>
    </section>
  </div>
</template>

