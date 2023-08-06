<template>
  <div style="display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 56px)">
    <CardNFT :is-minting="true" v-for="nft in usersNFT" :key="nft">
      <template #button>
        <div class="count">
          <!--        <p>Earn: {{ timer }}</p>-->
          <!--        <MLoader v-else size="28"/>-->
          <p>+0.0000000004 MATIC</p>
        </div>
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
const {getUserNFT, stake, unStake, claimRewards} = requestsNFT();
const store = userStore();
const {user} = store;
const {usersNFT} = storeToRefs(store)

let ethereum = null;
let web3 = null;
let contract = null;
let balance: Ref<number> = ref(0);
let balanceStake: Ref<number> = ref(0);

let timer = ref(0);

onMounted(async () => {
  getUserNFT()
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

</script>

<style scoped lang="scss">
.count {
  color: var(--text-color);
}
</style>
