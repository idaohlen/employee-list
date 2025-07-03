<template>
  <div class="pagination">
    <button
      @click="$emit('goto', 1)"
      :disabled="currentPage === 1"
    >
      Första
    </button>
    <button
      @click="$emit('goto', currentPage - 1)"
      :disabled="currentPage <= 1"
    >
      Bakåt
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
      :disabled="currentPage >= availablePages"
    >
      Framåt
    </button>
    <button
      @click="$emit('goto', lastPage)"
      :disabled="currentPage === lastPage"
    >
      Sista
    </button>
  </div>
</template>

<script setup>
defineProps(["currentPage", "lastPage", "availablePages"]);
</script>

<style>
.pagination {
  display: flex;
  flex-wrap: wrap;
  margin-inline: auto;
  padding: 2rem;
}

.pagination-btn {
  background: red;

  &.active {
    background: blue;
  }
}
</style>
