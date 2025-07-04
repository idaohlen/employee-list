<template>
  <header class="header text-dark">
    <div class="branding">
      <Icon icon="lucide:message-circle" class="icon" />
      Vårat företag
    </div>
  </header>
</template>

<script setup>
import { Icon } from "@iconify/vue";
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: $primary;
  padding: 2rem;
}

.spacer {
  flex: 1;
}

.branding {
  font-family: $heading-font;
  display: flex;
  gap: .5em;
  align-items: center;
  font-size: 1.4rem;
}
</style>