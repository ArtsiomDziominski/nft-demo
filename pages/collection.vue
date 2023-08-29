<template>
  <div class="wrapper">
    <h1>Your Collection</h1>
    <v-divider></v-divider>
    <div class="card-collection">
      <div class="card-collection__nft" v-if="user.countNFT && user.wallet">
        <template v-for="count in usersNFT">
          <CardNFT />
        </template>
      </div>
      <v-btn v-else-if="!user.wallet" variant="text" @click="connectWallet">
        Connect Wallet
      </v-btn>
      <div v-else-if="!user.countNFT" class="card-collection__no-nft">
        <p>You don't have nft</p>
        <a :href="BUY_NFT" target="_blank" @click="connectWallet">
          Buy NFT
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from "vue";
import {userStore} from "~/store/userStore";
import wallet from "~/mixins/wallet";
import {BUY_NFT} from "~/const/href";

const store = userStore();
const {user, usersNFT} = store;
const {getUserNFT, connectMetamask} = wallet();

onMounted(async () => {
  // await getUserNFT()
});

function connectWallet() {
  connectMetamask();
}
</script>

<style scoped lang="scss">
.wrapper {
  padding: 60px;
  display: flex;
  flex-direction: column;

  .card-collection {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    min-height: 500px;
    margin-top: 30px;
    padding: 15px;
    border: 2px solid var(--border-color-card);
    border-radius: var(--border-radius-card);
    background-color: var(--background-card-collection);

    &__nft {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-around;
      gap: 30px;
    }

    &__button {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__no-nft {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
