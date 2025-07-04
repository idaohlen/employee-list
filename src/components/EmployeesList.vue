<template>
  <div class="employees-list">
    <div v-for="employee in employees" :key="employee.id" class="employee-card">
      <div class="employee-image">
        <img :src="employee.image" />
      </div>
      <div class="employee-info">
        <div class="employee-name">{{ employee.firstName }} {{ employee.lastName }}</div>
        <div class="employee-title">{{ employee.company.title }}</div>
        <div class="employee-department">{{ employee.company.department }}</div>
        <a :href="'mailto:' + employee.email" class="btn btn-sm btn-secondary contact-btn">
          <Icon icon="lucide:mail" class="icon" />
          Kontakta {{ employee.firstName }}
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from "@iconify/vue";

defineProps(["employees"]);
</script>

<style lang="scss">
.employees-list {
  width: 100%;
  margin-inline: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1rem;
  margin-block: 2rem;
}

.employee-card {
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  border: 1px solid $border-color;
  border-radius: 4px;
  text-align: center;
  background: $card-bg;

  @include dark {
    background: $card-bg--dark;
    border-color: $border-color--dark;
  }
}

.employee-image {
  width: 100%;
  max-width: 40%;
  aspect-ratio: 1 / 1;
  overflow: hidden;
  border-radius: 50%;
  border: 4px solid transparent;
  outline: 2px solid rgb(200, 200, 200);
  background: white;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @include dark {
    outline-color: transparent;
  }
}

.employee-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.employee-name {
  font-weight: 600;
  font-size: 1.6rem;
  font-family: $heading-font;
}

.employee-title {
  color: $primary;
  font-weight: 500;

  @include dark {
    color: $primary--dark;
  }
}

.employee-department {
  font-size: .8em;
}

.contact-btn {
  margin-top: 1rem;
}
</style>