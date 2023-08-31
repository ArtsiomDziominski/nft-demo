<template>
  <div class="wrapper">
    <h1>Your Collection</h1>
    <v-divider></v-divider>
    <div class="card-collection">
      <MLoader v-if="isMainLoader && !user.wallet"/>
      <div v-else>
        <div class="card-collection__nft" v-if="user.countNFTTotal && user.wallet">
          <template v-for="nft in usersNFT" :key="nft.id" >
            <CardNFT
                :is-minting="false"
                :img="nft.image"
                :name="nft.name"
                :id="nft.id"
                :isStaked="nft.isStaked"
                to="/employment"
            />
          </template>
        </div>
        <v-btn v-else-if="!user.wallet" variant="text" @click="connectWallet">
          Connect Wallet
        </v-btn>
        <div v-else-if="!usersNFT.length" class="card-collection__no-nft">
        <p>You don't have nft</p>
        <a :href="BUY_NFT" target="_blank" @click="connectWallet">
          Buy NFT
        </a>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {userStore} from "~/store/userStore";
import wallet from "~/mixins/wallet";
import {BUY_NFT} from "~/const/href";
import {storeToRefs} from "pinia";

const store = userStore();
const {user, usersNFT, isMainLoader} = storeToRefs(store);
const {getUserNFT, connectMetamask} = wallet();


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
