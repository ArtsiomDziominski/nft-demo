<template>
  <CardNFT class="employment__card" :is-minting="false" :key="nft.id">
    <template #rewards v-if="nft.isStaked">
      <div class="card">
        <p :class="`card__count card__count_${num}`" v-for="num in 4">+ {{ rewardSecondUSDT }}</p>
        <p class="card__rewards">Rewards: ~ {{ rewardsUSDT.toFixed(6) }} USDT</p>
      </div>
    </template>
    <template #button>
      <v-btn v-if="!nft.isStaked" @click="stake(nft.id)" color="primary">
        stake {{ nft.id }}
      </v-btn>
      <v-btn v-if="nft.isStaked" @click="unStake(nft.id)" color="primary">
        UnStake {{ nft.id }}
      </v-btn>
      <v-btn v-if="nft.isStaked" @click="claimRewardsNFT(nft.id)" color="primary">
        Claim Rewards
      </v-btn>
    </template>
  </CardNFT>
</template>

<script setup lang="ts">
import {defineProps, onMounted, Ref, ref, UnwrapRef} from "vue";
import requestsNFT from "~/mixins/requestsNFT";
import CardNFT from "~/components/CardNFT";

const {getRewards, setContract, setWeb3, stake, unStake, claimRewards} = requestsNFT();
const props = defineProps({
  nft: Object,
  rewardSecond: Number
})


const rewardSecondUSDT = Number(props.rewardSecond);
const nft = props.nft;

let rewardsUSDT: Ref<UnwrapRef<number>> = ref(0);

onMounted(async () => {
  // @ts-ignore
  if (nft.isStaked) {
    await setWeb3();
    await setContract();
    await getRewards(nft.id)
        .then((response: any) => {
          rewardsUSDT.value = Number(response)
        })
        .catch((e) => console.log(e));
  }
  setInterval(() => rewardsUSDT.value = rewardsUSDT.value + rewardSecondUSDT, 1000)
})

const claimRewardsNFT = (id: number) => {
  claimRewards(nft.id)
      .then(() => rewardsUSDT.value = 0)
      .catch();
}
</script>

<style scoped lang="scss">
.employment {
  &__card {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: min-content min-content min-content;
    margin: 20px;

    .card {
      position: relative;

      .card__count {
        margin-left: 73px;
        position: absolute;
        color: var(--text-color);
        animation: rewards-anim 4s infinite linear;
        opacity: 0;
      }

      .card__count_4 {}

      .card__count_1 {
        animation-delay: 1s;
      }

      .card__count_2 {
        animation-delay: 2s;
      }

      .card__count_3 {
        animation-delay: 3s;
      }

      .card__rewards {
        color: var(--text-color);
      }
    }
  }
}

@keyframes rewards-anim {
  0% {
    transform: translate3d(0, 0, 0);
    opacity: 0;
  }
  20% {
    transform: translate3d(0, -100, 0);
    opacity: 1;
  }
  100% {
    transform: translate3d(0, -400%, 0);
    opacity: 0;
  }
}
</style>