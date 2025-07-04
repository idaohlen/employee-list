<template>
  <footer class="footer text-dark">
    Made with Vue.js by
    <a href="https://github.com/idaohlen/" target="_blank" class="btn btn-icon">
      <Icon icon="mdi:github" class="icon" width="24" />
      Ida Öhlén
    </a>
  </footer>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<style lang="scss" scoped>

.footer {
  background: $footer-bg;
  padding: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: .5rem;

  @include dark {
    background: $footer-bg--dark;
  }
}

.btn-icon {
  font-size: 1rem;
  padding-inline: .6em;
  display: inline-flex;
  align-items: center;
  gap: .5rem;
}
</style>
