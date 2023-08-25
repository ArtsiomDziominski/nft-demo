<template>
  <div class="wrapper-employment">
    <div class="employment"></div>
    <CardNFT class="employment__card card" :is-minting="true" v-for="nft in usersNFT.slice(0, countCard)" :key="nft">
      <template #rewards v-if="nft.isStaked">
        <!--        <p>Earn: {{ timer }}</p>-->
        <!--        <MLoader v-else size="28"/>-->
        <p class="card__count">+{{ rewardSecondUSDT }} USDT</p>
      </template>
      <template #button>
        <v-btn v-if="!nft.isStaked" @click="stake(nft.id)" color="primary">
          stake {{ nft.id }}
        </v-btn>
        <v-btn v-if="nft.isStaked" @click="unStake(nft.id)" color="primary">
          UnStake {{ nft.id }}
        </v-btn>
        <v-btn v-if="nft.isStaked" @click="claimRewards(nft.id)" color="primary">
          Claim Rewards
        </v-btn>
      </template>
    </CardNFT>
    <v-btn v-if="countCard < usersNFT.length" @click="showMore">Show more</v-btn>
  </div>
</template>

<script setup lang="ts">
import CardNFT from "~/components/CardNFT";
import MLoader from "~/components/MLoader";
import {onMounted, Ref, ref} from "vue";
import {userStore} from "~/store/userStore";
import {storeToRefs} from 'pinia'
import wallet from "~/mixins/wallet";
import requestsNFT from "~/mixins/requestsNFT";

const {connectMetamask} = wallet();
const {getUserNFT, stake, unStake, claimRewards, rewardSecond} = requestsNFT();
const store = userStore();
const {user} = store;
const {usersNFT} = storeToRefs(store)

let ethereum = null;
let web3 = null;
let contract = null;
let balance: Ref<number> = ref(0);
let balanceStake: Ref<number> = ref(0);
let rewardSecondUSDT: Ref<number> = ref(0);

let timer = ref(0);
let countCard = ref(4);

onMounted(async () => {
  getUserNFT();
  rewardSecond().then((res) => rewardSecondUSDT.value = res);
})

// const getBalance = async () => {
//   await contract.methods.balanceOf(user.wallet).call()
//       .then((totalBalance) => {
//         balance.value = Number(totalBalance);
//       });
// }
//
// const getBalanceStake = async () => {
//   await contract.methods.nftOwnerStakeAddress(user.wallet).call()
//       .then((totalBalanceStake) => {
//         balanceStake.value = Number(totalBalanceStake);
//       });
// }

function showMore() {
  countCard.value += 4;
}
</script>

<style scoped lang="scss">
.wrapper-employment {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 56px);
  padding: 120px 50px;

  .employment {
    display: flex;
    flex-direction: column;

    &__card {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: min-content min-content min-content;
      margin: 20px;

      .card__count {
        color: var(--text-color);
        animation: rewards-anim 4s infinite linear;
      }
    }
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

@keyframes rewards-anim {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -300%, 0);
    opacity: 0;
  }
}
</style>
