<template>
  <div class="wrapper-employment">
    <MLoader v-if="isMainLoader"/>
    <div v-else class="employment">
      <HeaderConnectWallet v-if="!user.wallet"/>
      <MLoader v-else-if="loaderGetNft"/>
      <template v-else>
        <EmploymentCardNft
            v-for="nft in usersNFT.slice(0, countCard)"
            :nft="nft"
            :rewardSecond="user.rewardSecond"
        />
      </template>
    </div>
    <v-btn v-if="countCard < usersNFT.length" @click="showMore">Show more</v-btn>
  </div>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import {userStore} from "~/store/userStore";
import {storeToRefs} from 'pinia'
import requestsNFT from "~/mixins/requestsNFT";
import EmploymentCardNft from "../components/employment/EmploymentCardNft.vue";

const {getUserNFT} = requestsNFT();
const store = userStore();
const {user, usersNFT, isMainLoader, loaderGetNft} = storeToRefs(store)

let ethereum = null;
let web3 = null;
let contract = null;

let timer = ref(0);
let countCard = ref(5);

onMounted(async () => {
  isMainLoader.value = true;
  await getUserNFT();
  isMainLoader.value = false;
})

const showMore = () => {
  countCard.value += 5;
}
</script>

<style scoped lang="scss">
.wrapper-employment {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 56px);
  padding: 120px 50px;

  .employment {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media screen and (max-width: 715px) {
  .wrapper-employment {
    padding: 80px 10px;

    .employment-card {
      margin: 10px;

      .count {
      }
    }
  }
}
</style>
