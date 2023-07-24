<template>
  <section>
    <h2>Crypto-trading is hard, but Anturium makes it simple</h2>
    <div class="advantages">
      <div class="item">
        <img src="~/assets/images/main-features/simple.svg" alt="">
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
section {
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px;

  .advantages {
    width: 100%;
    max-width: 1200px;

    .item {
      width: 25%;

      img {
        width: 30px;
      }

    }
  }
}
</style>
