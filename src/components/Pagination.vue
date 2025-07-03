<template>
  <div class="pagination">
    <button
      @click="$emit('goto', currentPage - 1)"
      :disabled="currentPage <= 1"
    >
      Bakåt
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('goto', page)"
      :class="['pagination-btn', { active: page === currentPage }]"
    >
      {{ page }}
    </button>
    <button
      @click="$emit('goto', currentPage + 1)"
      :disabled="currentPage >= totalPages"
    >
      Framåt
    </button>
  </div>
</template>

<script setup>
defineProps(["currentPage", "totalPages"]);
</script>

<style>
.pagination {
  display: flex;
  flex-wrap: wrap;
}

.pagination-btn {
  background: red;

  &.active {
    background: blue;
  }
}
</style>
