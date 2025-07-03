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
      :disabled="currentPage >= lastPage"
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
