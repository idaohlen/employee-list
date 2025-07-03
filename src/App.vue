<template>
  <div class="page-wrapper">
    <h1>Våra medarbetare</h1>
    <p>Vi har för närvarande {{ totalEntries }} fantastiska anställda som arbetar hos oss!</p>

    <div class="employees-list">
      <div v-for="employee in employees" :key="employee.id" class="employee-card">
        <div class="employee-image">
          <img :src="employee.image" width="200" height="300" />
        </div>
        <div class="employee-info">
          <div class="employee-name">{{ employee.firstName }} {{ employee.lastName }}</div>
          <a :href="'mailto:' + employee.email" class="contact-btn">Kontakta {{ employee.firstName }}</a>
        </div>
      </div>
    </div>

    <div class="pagination">
      <button @click="goToPage(currentPage - 1)" :disabled="currentPage <= 1">Bakåt</button>
      <button v-for="page in totalPages" @click="goToPage(page)" :class="['pagination-btn', { active: page === currentPage }]">{{ page }}</button>
      <button @click="goToPage(currentPage + 1)" :disabled="currentPage >= totalPages">Framåt</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

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

.employees-list {
  width: 100%;
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
  background: #fff2f2;
  padding: 1rem;
}

.employee-card {
  border: 1px solid #dedede;
  border-radius: 4px;
  background: white;
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.employee-image {
  width: 100%;
  max-width: 30%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 50%;
  background: red;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.employee-info {
  display: grid;
  gap: .5rem;
}

.employee-name {
  font-weight: 600;
}

.contact-btn {
  background: blue;
  color: white;
  padding: .5rem 1rem;
  border-radius: 4px;
}


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
