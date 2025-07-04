<template>
  <header class="header text-dark">
    <div class="branding">
      <Icon icon="lucide:message-circle" class="icon" />
      Vårat företag
    </div>
    <div class="spacer" />
    <button
      @click="$emit('toggle-theme')"
      style="padding-left: 1em"
      class="btn-icon"
      aria-label="Byt tema"
      v-tooltip="isDarkMode ? 'Ljust tema' : 'Mörkt tema'"
    >
    Byt tema
    <Icon 
      :icon="isDarkMode ? 'lucide:sun-medium' : 'lucide:moon'" 
      class="icon" 
    />
    </button>
  </header>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps({
  isDarkMode: {
    type: Boolean,
    default: false
  }
});

defineEmits(["toggle-theme"]);
</script>

<style lang="scss">
.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: $header-bg;

  @include dark {
    background: $header-bg--dark;
  }
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