<template>
  <div class="pagination">
    <button
      @click="$emit('goto', 1)"
      :disabled="currentPage === 1"
      aria-label="Första sidan"
      v-tooltip="'Första'"
    >
      <Icon icon="lucide:chevrons-left" class="icon" />
    </button>
    <button
      @click="$emit('goto', currentPage - 1)"
      :disabled="currentPage <= 1"
      aria-label="Föregående sida"
      v-tooltip="'Föregående'"
    >
      <Icon icon="lucide:chevron-left" class="icon" />
    </button>
    <button
      v-for="page in availablePages"
      :key="page"
      @click="$emit('goto', page)"
      :class="['pagination-btn', { active: page === currentPage }]"
    >
      {{ page }}
    </button>
    <button
      @click="$emit('goto', currentPage + 1)"
      :disabled="currentPage >= lastPage"
      aria-label="Nästa sida"
      v-tooltip="'Nästa'"
    >
      <Icon icon="lucide:chevron-right" class="icon" />
    </button>
    <button
      @click="$emit('goto', lastPage)"
      :disabled="currentPage === lastPage"
      aria-label="Sista sidan"
      v-tooltip="'Sista'"
    >
      <Icon icon="lucide:chevrons-right" class="icon" />
    </button>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps(["currentPage", "lastPage", "availablePages"]);
</script>

<style lang="scss">
.pagination {
  display: flex;
  flex-wrap: wrap;
  margin-inline: auto;
  padding: 2rem;
  gap: .2rem;
}

.pagination-btn {
  width: 2.5rem;
  padding: .5rem;
  font-size: .89rem;

  &.active {
    background: $primary;
    color: white;
  }
}
</style>
