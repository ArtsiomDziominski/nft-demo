<template>
  <div class="wrapper-employment">
    <div class="employment">
      <HeaderConnectWallet v-if="!user.wallet"/>
      <template v-else>
<!--        <MLoader v-if="usersNFT.length < 5"/>-->
<!--        <template v-else>-->
          <EmploymentCardNft v-for="nft in usersNFT.slice(0, countCard)" :nft="nft" :rewardSecond="rewardSecondUSDT"/>
<!--        </template>-->
      </template>
    </div>
    <v-btn v-if="countCard < usersNFT.length" @click="showMore">Show more</v-btn>
  </div>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";
import {userStore} from "~/store/userStore";
import {storeToRefs} from 'pinia'
import wallet from "~/mixins/wallet";
import requestsNFT from "~/mixins/requestsNFT";
import EmploymentCardNft from "../components/employment/EmploymentCardNft.vue";

const {connectMetamask} = wallet();
const {getUserNFT, rewardSecond} = requestsNFT();
const store = userStore();
const {user, usersNFT} = storeToRefs(store)

let ethereum = null;
let web3 = null;
let contract = null;
let balance: Ref<number> = ref(0);
let balanceStake: Ref<number> = ref(0);
let rewardSecondUSDT: Ref<number> = ref(0);

let timer = ref(0);
let countCard = ref(4);

onMounted(async () => {
  rewardSecond().then((res) => rewardSecondUSDT.value = res);
})

const showMore = () => {
  countCard.value += 4;
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
