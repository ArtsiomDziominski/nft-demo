<template>
  <div class="main-block">
    <div class="main-block__body">
      <h1 class="main-block__title">
        Buy NFT and start making passive income
      </h1>
      <CardNFT class="card" :is-minting="true">
        <template #button>
          <NuxtLink to="/mint">
            <v-btn class="card__button" :color="mainGreen">
              Mint
            </v-btn>
          </NuxtLink>
        </template>
      </CardNFT>
    </div>
    <MainGridImage/>
  </div>
</template>

<script setup lang="ts">
import MainGridImage from "~/components/main/MainGridImage";
import CardNFT from "~/components/CardNFT";

const mainGreen = '#658d1b';
</script>

<style scoped lang="scss">
.main-block {
  position: relative;
  height: 100%;
  min-height: calc(100vh - 56px);
  width: 100vw;
  overflow: hidden;

  &__body {
    height: 100%;
    min-height: 100vh;
    width: 100%;
    min-width: 100vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 50px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 255, 0);
    z-index: 10;

    .main-block__title {
      width: 50%;
      font-size: 52px;
      margin-right: 10%;

    }

    .card {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;

      &__button {
        margin-top: 20px;
        color: var(--text-color);
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .main-block {

    &__body {
      flex-direction: column;
      justify-content: center;
      gap: 50px;
      padding: 80px 10px 50px 10px;

      .main-block__title {
        width: 90%;
        margin: 0;
        font-size: 30px;
        text-align: center;
      }

      .card {

        &__button {

        }
      }
    }
  }
}

</style>
