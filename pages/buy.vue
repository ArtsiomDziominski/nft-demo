<template>
  <div class="wrapper">
    <h1 class="title">{{ title }}</h1>
    <h2 class="description">{{ description }}</h2>
    <CardNFT class="card" :is-minting="false">
      <template #button>
        <!--        <a :href="BUY_NFT" target="_blank">-->
        <!--          <v-btn class="card__button">-->
        <!--            Buy 1 ETH-->
        <!--          </v-btn>-->
        <!--        </a>-->
        <NuxtLink to="https://testnets.opensea.io/collection/testtrucknft-38" target="_blank">
          <v-btn class="card__button" color="var(--main-green)">
            BUY
          </v-btn>
        </NuxtLink>
      </template>
    </CardNFT>
  </div>
</template>

<script setup lang="ts">

import {description, title} from "~/const/content/buy";
import {BUY_NFT} from "../const/href";
</script>

<style scoped lang="scss">

.wrapper {
  height: calc(100vh - 60px);
  display: grid;
  grid-template-columns: 400px min-content;
  grid-template-rows: min-content min-content;
  column-gap: 30px;
  justify-content: center;
  align-content: center;

  .title {
    grid-column: 1/2;
    grid-row: 1/2;
    font-size: 28px;
    font-weight: 600;
    align-self: center;
  }

  .description {
    grid-column: 1/2;
    grid-row: 2/3;
    font-size: 14px;
    font-weight: 400;
  }

  .card {
    grid-column: 2/2;
    grid-row: 1/3;
    display: flex;
    justify-content: center;
    align-items: center;

    &__button {
      margin-top: 20px;
    }
  }
}
</style>