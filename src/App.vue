<template>
  <div class="page-wrapper">
    <h1>Våra medarbetare</h1>
    <p>Vi har för närvarande {{ totalEntries }} fantastiska anställda som arbetar hos oss!</p>

    <EmployeesList :employees="employees" />
    <Pagination :current-page="currentPage" :total-pages="totalPages" @goto="(v) => goToPage(v)" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Pagination from "./components/Pagination.vue";
import EmployeesList from "./components/EmployeesList.vue";

const employees = ref([]);
const totalPages = ref(0);
const totalEntries = ref(0);
const currentPage = ref(0);

const ENTRIES_PER_PAGE = 6;

function goToPage(page) {
  currentPage.value = page;
  fetchEmployeeData({skip: (page - 1) * ENTRIES_PER_PAGE });
}

async function fetchEmployeeData({ limit = ENTRIES_PER_PAGE, skip = 0 } = {}) {
  const response = await fetch(`https://dummyjson.com/users?limit=${limit}&skip=${skip}`);
  const data = await response.json();

  employees.value = data.users;
  totalEntries.value = data.total;
  totalPages.value = Math.ceil(totalEntries.value / ENTRIES_PER_PAGE);
}

onMounted(async () => {
  currentPage.value = 1;
  fetchEmployeeData();
});
</script>

<style scoped>
.page-wrapper {
  max-width: 800px;
  display: grid;
  gap: 2rem;
}
</style>
