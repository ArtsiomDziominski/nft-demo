<template>
  <div class="no-reg">
    <p class="no-nft__title">
      You are not registered
    </p>
    <p class="no-nft__description">
      If you want to receive rewards, please register
      <v-btn>
        Registration for distribution of rewards
      </v-btn>
    </p>
  </div>

  <div class="no-nft" v-if="!user.countNFTTotal">
    <p class="no-nft__title">
      There is no NFT in your wallet
    </p>
    <p class="no-nft__description">
      You need to buy NFT so you can see profits
      <v-btn :href="BUY_NFT" target="_blank">
        Buy NFT
      </v-btn>
    </p>
  </div>
</template>

<script setup lang="ts">
import {BUY_NFT} from "../../const/href";
import {userStore} from "../../store/userStore";
const store = userStore();
const {user} = store;
</script>

<style scoped lang="scss">
.no-nft {
  justify-self: center;
  align-self: center;

  &__title {
    justify-self: center;
    align-self: end;
  }

  &__description {
    justify-self: center;
    align-self: start;
  }
}
</style>