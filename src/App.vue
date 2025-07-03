<template>
  <div class="page-wrapper">
    <h1>Våra medarbetare</h1>
    <p>
      Vi har för närvarande {{ totalEntries }} fantastiska anställda som arbetar
      hos oss!
    </p>

    <EmployeesList :employees="employees" />
    <Pagination
      :current-page="currentPage"
      :last-page="totalPages"
      :available-pages="availablePages"
      @goto="page => goToPage(page)"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Pagination from "./components/Pagination.vue";
import EmployeesList from "./components/EmployeesList.vue";

const employees = ref([]);
const totalEntries = ref(0);
const totalPages = ref(0);
const currentPage = ref(0);
const windowWidth = ref(window.innerWidth);

const ENTRIES_PER_PAGE = 6;
const MOBILE_BREAKPOINT = 768;

const maxVisiblePages = computed(() => {
  return windowWidth.value <= MOBILE_BREAKPOINT ? 5 : 7;
});

const availablePages = computed(() => {
  const page = currentPage.value;
  const maxPages = maxVisiblePages.value;
  let startPage, endPage;

  if (totalPages.value <= maxPages) {
    startPage = 1;
    endPage = totalPages.value;
  } else {
    const halfRange = Math.floor(maxPages / 2);

    if (page <= halfRange + 1) {
      startPage = 1;
      endPage = maxPages;
    } else if (page >= totalPages.value - halfRange) {
      startPage = totalPages.value - maxPages + 1;
      endPage = totalPages.value;
    } else {
      startPage = page - halfRange;
      endPage = page + halfRange;
    }
  }

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }
  return pages;
});

function goToPage(page) {
  currentPage.value = page;
  fetchEmployeeData({ page });
}

function handleResize() {
  windowWidth.value = window.innerWidth;
}

async function fetchEmployeeData({ limit = ENTRIES_PER_PAGE, page = 1 } = {}) {
  const response = await fetch(
    `https://dummyjson.com/users?limit=${limit}&skip=${
      (page - 1) * ENTRIES_PER_PAGE
    }`
  );
  const data = await response.json();

  employees.value = data.users;
  totalEntries.value = data.total;
  totalPages.value = Math.ceil(totalEntries.value / ENTRIES_PER_PAGE);
}

onMounted(async () => {
  window.addEventListener("resize", handleResize);
  currentPage.value = 1;
  fetchEmployeeData();
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
});
</script>

<style scoped>
.page-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
