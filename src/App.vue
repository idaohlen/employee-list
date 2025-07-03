<template>
  <div class="page-wrapper">
    <h1>Våra medarbetare</h1>
    <p>Vi har för närvarande {{ totalEntries }} fantastiska anställda som arbetar hos oss!</p>

    <EmployeesList :employees="employees" />
    <Pagination :current-page="currentPage" :available-pages="availablePages" @goto="(v) => goToPage(v)" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import Pagination from "./components/Pagination.vue";
import EmployeesList from "./components/EmployeesList.vue";

const employees = ref([]);
const availablePages = ref([]);
const totalPages = ref(0);
const totalEntries = ref(0);
const currentPage = ref(0);

const ENTRIES_PER_PAGE = 6;
const MAX_VISIBLE_PAGES_DESKTOP = 7;
const MAX_VISIBLE_PAGES_MOBILE = 5;
const MOBILE_BREAKPOINT = 768;

const isMobile = ref(false);

function checkIsMobile() {
  const wasMobile = isMobile.value;
  isMobile.value = window.innerWidth <= MOBILE_BREAKPOINT;
  
  // Recalculate pagination if mobile state changed
  if (wasMobile !== isMobile.value && currentPage.value > 0) {
    calculateAvailablePages();
  }
}

function goToPage(page) {
  currentPage.value = page;
  fetchEmployeeData({ page });
}

function calculateAvailablePages() {
  const MAX_VISIBLE_PAGES = isMobile.value ? MAX_VISIBLE_PAGES_MOBILE : MAX_VISIBLE_PAGES_DESKTOP;
  const page = currentPage.value;
  let startPage, endPage;

  if (totalPages.value <= MAX_VISIBLE_PAGES) {
    startPage = 1;
    endPage = totalPages.value;
  } else {
    const halfRange = Math.floor(MAX_VISIBLE_PAGES / 2);

    if (page <= halfRange + 1) {
      startPage = 1;
      endPage = MAX_VISIBLE_PAGES;
    } else if (page >= totalPages.value - halfRange) {
      startPage = totalPages.value - MAX_VISIBLE_PAGES + 1;
      endPage = totalPages.value;
    } else {
      startPage = page - halfRange;
      endPage = page + halfRange;
    }
  }

  availablePages.value = [];
  for (let i = startPage; i <= endPage; i++) {
    availablePages.value.push(i);
  }
}

async function fetchEmployeeData({ limit = ENTRIES_PER_PAGE, page = 1 } = {}) {
  const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${(page - 1) * ENTRIES_PER_PAGE}`);
  const data = await response.json();

  employees.value = data.users;
  totalEntries.value = data.total;
  totalPages.value = Math.ceil(totalEntries.value / ENTRIES_PER_PAGE);

  calculateAvailablePages();
}

onMounted(async () => {
  checkIsMobile();
  window.addEventListener("resize", checkIsMobile);
  currentPage.value = 1;
  fetchEmployeeData();
});

onUnmounted(() => {
  window.removeEventListener("resize", checkIsMobile);
});
</script>

<style scoped>
.page-wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>
