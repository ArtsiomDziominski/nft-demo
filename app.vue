<template>
  <NuxtLayout>
    <section class="pages">
      <MainHeader/>
      <main>
        <NuxtPage></NuxtPage>
      </main>
      <MainFooter/>
    </section>
  </NuxtLayout>
</template>
<script setup lang="ts">
import MainHeader from "~/components/header/MainHeader.vue";
import MainFooter from "~/components/footer/MainFooter.vue";
</script>

<style lang="scss">

.pages {
  max-width: 1920px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  padding: 0 20px;

  a {
    text-decoration: none; /* Отменяем подчеркивание у ссылки */
  }
}

main {
  min-height: 100vh;
}
</style>