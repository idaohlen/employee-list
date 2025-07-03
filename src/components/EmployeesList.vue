<template>
  <div class="employees-list">
    <div v-for="employee in employees" :key="employee.id" class="employee-card">
      <div class="employee-image">
        <img :src="employee.image" width="200" height="300" />
      </div>
      <div class="employee-info">
        <div class="employee-name">{{ employee.firstName }} {{ employee.lastName }}</div>
        <div class="employee-department">{{ employee.company.title }} - {{ employee.company.department }}</div>
        <a :href="'mailto:' + employee.email" class="btn">Kontakta {{ employee.firstName }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["employees"]);
</script>

<style>
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: .5rem;
}

.employee-name {
  font-weight: 600;
}
</style>