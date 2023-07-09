<template>
<div class="main-block">
  <div class="main-block__body">
    <h1 class="main-block__title">
      Buy NFT and start making passive income
    </h1>
    <CardNFT class="card" :is-minting="true">
      <template #button>
        <!--        <a :href="BUY_NFT" target="_blank">-->
        <!--          <v-btn class="card__button">-->
        <!--            Buy 1 ETH-->
        <!--          </v-btn>-->
        <!--        </a>-->
        <NuxtLink to="/mint">
          <v-btn class="card__button" color="primary">
            Mint
          </v-btn>
        </NuxtLink>
      </template>
    </CardNFT>
    <div class="main-block__blur"></div>
    <MainGridImage class="grid-image-first" />
  </div>
</div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.main-block {
  height: calc(100vh - 56px);

  &__body {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 255, 0);
    position: absolute;
    top: 0;
    z-index: 10;
    overflow: hidden;

    .main-block__title {
      max-width: 800px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-80%, -50%);
      font-size: 52px;
      z-index: 10;
    }

    .card {
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      right: 25%;
      top: 50%;
      z-index: 10;
      transform: translate(0, -50%);

      &__button {
        margin-top: 20px;
      }
    }

    .main-block__blur {
      width: 80vw;
      height: 100%;
      position: absolute;
      z-index: 5;
      backdrop-filter: blur(5px);
      -webkit-backdrop-filter: blur(5px);
      background-color: rgba(29, 29, 33, 0);
    }

    .grid-image-first {
      position: absolute;
      left: 10%;
      z-index: 1;
    }
  }
}
</style>