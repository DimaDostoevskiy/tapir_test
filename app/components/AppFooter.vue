<template>
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__links">
        <a class="footer__link" href="#">Политика конфиденциальности</a>
        <a class="footer__link" href="#">Пользовательское соглашение</a>
        <a class="footer__link" href="#">Помощь</a>
        <a class="footer__link" href="#">Контакты</a>
      </div>

      <p class="footer__meta">© {{ year }} Tapir. Тестовое задание (Nuxt 4 + TypeScript).</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
</script>

