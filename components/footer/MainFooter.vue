<template>
  <footer class="container grid gap-6 py-12 lg:grid-cols-12">
    <div class="main-links-wrapper">
      <NuxtLink class="links" v-for="button in buttons" :key="button"  :to="button.to">
        {{ button.name }}
      </NuxtLink>
    </div>
    <div class="other-links-wrapper">
      <NuxtLink class="links" v-for="button in otherButtons" :key="button" :to="button.to">
        {{ button.name }}
      </NuxtLink>
    </div>
    <span class="logo">Logo</span>
  </footer>
</template>

<script setup lang="ts">

import {buttons, otherButtons} from "../../const/buttons";
</script>

<style scoped lang="scss">
a {
  margin: 10px 0;
  color: #dadada;

  &:hover {
    color: var(--link-hover);
  }
}
footer {
  display: grid;
  grid-template-columns: min-content min-content 1fr;
  column-gap: 150px;
  padding: 0 20px;

  .links {
    display: block;
    white-space: nowrap;
  }

  .main-links-wrapper {
    grid-column: 1/2;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    max-height: 250px;

    a {
      margin-bottom: 20px;
      margin-right: 80px;
    }
  }

  .other-links-wrapper {
    grid-column: 2/3;
  }

  .logo {
    grid-column: 3/4;
    justify-self: end;
  }
}
</style>