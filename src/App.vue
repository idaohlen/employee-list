<template>
  <SiteHeader />
  <main class="page-wrapper">
    <h1>Våra medarbetare</h1>
    <p>
      Vi har för närvarande <b>{{ totalEntries }}</b> fantastiska anställda som arbetar
      hos oss!
    </p>

    <EmployeesList :employees="employees" />
    <Pagination
      :current-page="currentPage"
      :last-page="totalPages"
      :available-pages="availablePages"
      @goto="page => goToPage(page)"
    />
  </main>
  <SiteFooter />
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import Pagination from "./components/Pagination.vue";
import EmployeesList from "./components/EmployeesList.vue";
import SiteHeader from "./components/SiteHeader.vue";
import SiteFooter from "./components/SiteFooter.vue";

const employees = ref([]);
const totalEntries = ref(0);
const totalPages = ref(0);
const currentPage = ref(0);
const windowWidth = ref(window.innerWidth);

const ENTRIES_PER_PAGE = 6;

// Get breakpoints from CSS custom properties
const getBreakpoint = (name) => {
  const value = getComputedStyle(document.documentElement).getPropertyValue(`--breakpoint-${name}`);
  return parseInt(value);
};

const maxVisiblePages = computed(() => {
  const width = windowWidth.value;
  
  if (width <= getBreakpoint("2xs")) {
    return 1;
  } else if (width <= getBreakpoint("xs")) {
    return 3;
  } else if (width <= getBreakpoint("sm")) {
    return 5;
  } else {
    return 7;
  }
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
