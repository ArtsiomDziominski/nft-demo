<template>
  <v-card class=" card-nft">
    <slot name="title"></slot>
    <img class="card-nft__nft" src="../assets/images/nft.webp" alt="nft image">
    <div class="card-nft__minting" v-if="isMinting">
      <div></div>
      <span>Minting now</span>
    </div>
    <slot name="rewards" class="card-nft__rewards" />
    <slot name="button" class="card-nft__button" />
  </v-card>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({
  isMinting: {type: Boolean, default: false}
})
</script>

<style scoped lang="scss">
.card-nft {
  width: 268px;
  height: min-content;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  padding: 20px;
  background: var(--background-card);

  &__nft {
    width: 100%;
    height: 100%;
    border-radius: 5px;
    box-shadow: 0 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
  }

  &__minting {
    position: absolute;
    top: 25px;
    right: 25px;
    padding: 10px;
    color: var(--text-color);
    background-color: var(--background-minting);
    backdrop-filter: blur(20px);
    border-radius: 5px;
    font-size: 12px;
    font-weight: 900;
    display: flex;
    justify-content: center;
    align-items: center;

    div {
      width: 10px;
      height: 10px;
      flex-shrink: 0;
      border-radius: 50%;
      margin-right: 4px;
      background: rgb(52, 199, 123);
      animation: 3s ease 0s infinite normal none running pulse;
    }
  }

  &__rewards {
    margin: 10px;
  }

  &__button {
    margin: 10px;
  }
}

@keyframes pulse {
  0% {
    box-shadow: rgb(52, 199, 123) 0 0 0 0;
  }
  70% {
    box-shadow: rgba(52, 199, 123, 0) 0 0 0 7px;
  }
  100% {
    box-shadow: rgba(52, 199, 123, 0) 0 0 0 0;
  }
}
</style>
