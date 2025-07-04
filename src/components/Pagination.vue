<template>
  <div class="pagination-wrapper">
    <div class="pagination">
      <button
        @click="$emit('goto', 1)"
        :disabled="currentPage === 1"
        aria-label="Första sidan"
        v-tooltip="'Första'"
        class="pagination-btn"
      >
        <Icon icon="lucide:chevrons-left" class="icon" />
      </button>
      <button
        @click="$emit('goto', currentPage - 1)"
        :disabled="currentPage <= 1"
        aria-label="Föregående sida"
        v-tooltip="'Föregående'"
        class="pagination-btn"
      >
        <Icon icon="lucide:chevron-left" class="icon" />
      </button>
      <!-- Dynamic page buttons -->
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
        class="pagination-btn"
      >
        <Icon icon="lucide:chevron-right" class="icon" />
      </button>
      <button
        @click="$emit('goto', lastPage)"
        :disabled="currentPage === lastPage"
        aria-label="Sista sidan"
        v-tooltip="'Sista'"
        class="pagination-btn"
      >
        <Icon icon="lucide:chevrons-right" class="icon" />
      </button>
    </div>
    <p class="text-center">Sida {{ currentPage }} av {{ lastPage }}</p>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps(["currentPage", "lastPage", "availablePages"]);
</script>

<style lang="scss">
.pagination-wrapper {
  padding: 2rem;

}
.pagination {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-inline: auto;
  gap: .2rem;
}

.pagination-btn {
  width: 2.5rem;
  padding: .5rem;
  font-size: .89rem;

  &.active {
    @include btn-variant($primary, white);
    background: $primary;
    color: white;
  }
}
</style>
