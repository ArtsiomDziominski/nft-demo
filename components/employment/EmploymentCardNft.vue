<template>
  <CardNFT
      class="employment__card"
      :is-minting="false"
      :key="nft.id"
      :img="nft.image"
      :isTooltip="true"
      :name="nft.name"
  >
    <template #rewards v-if="nft.isStaked">
      <div class="card">
        <p v-if="rewardSecondUSDT" :class="`card__count card__count_${num}`" v-for="num in 4">+ {{ rewardSecondUSDT }}</p>
        <p class="card__rewards">Rewards: ~ {{ rewardsUSDT.toFixed(6) }} USDT</p>
      </div>
    </template>
    <template #button>
      <v-btn v-if="!nft.isStaked" :loading="loaderStake" @click="stake(nft.id)" color="var(--main-green)">
        stake #{{nft.id }}
      </v-btn>
      <v-btn v-if="nft.isStaked" :loading="loaderUnstake" @click="unStake(nft.id)" color="var(--main-green)">
        UnStake #{{nft.id }}
      </v-btn>
      <v-btn v-if="nft.isStaked" :loading="loaderClaim" @click="claimRewardsNFT(nft.id)" color="var(--main-green)">
        Claim Rewards
      </v-btn>
    </template>
    <template #tooltip>
      <p>{{nft.name}}</p>
      <p>{{nft.description}}</p>
      <p v-for="attributes in nft.attributes">{{attributes.trait_type}}: {{attributes.value}}</p>
      <p v-if="nft.isStaked">Rewards: ~ {{ rewardsUSDT.toFixed(6) }} USDT</p>
    </template>
  </CardNFT>
</template>

<script setup lang="ts">
import {defineProps, onMounted, reactive, Ref, ref, UnwrapRef} from "vue";
import requestsNFT from "~/mixins/requestsNFT";
import CardNFT from "~/components/CardNFT";
import {ImageNFT, ImageNFTStorage, NAME} from "../../const/const";
import {PropType} from "vue/dist/vue";
import {IUserNFT} from "../../types/types";

const {
  getRewards,
  setContract,
  setWeb3,
  stake,
  unStake,
  claimRewards,
  loaderStake,
  loaderUnstake
} = requestsNFT();

const props = defineProps({
  nft: Object as PropType<IUserNFT>,
  rewardSecond: String
})

const rewardSecondUSDT = Number(props.rewardSecond);
const nft = props.nft;

let rewardsUSDT: Ref<UnwrapRef<number>> = ref(0);
// let imgNFT: Ref<UnwrapRef<string>> = ref(ImageNFT.nft);
// let NFTParams: INFTParams = reactive({name: '', description: '', image: '', attributes: []});
let loaderClaim: Ref<UnwrapRef<boolean>> = ref(false);

onMounted(async () => {
  if (nft.isStaked) {
    await setWeb3();
    await setContract();
    await getRewards(nft.id)
        .then((response: any) => {
          rewardsUSDT.value = Number(response)
        })
        .catch((e) => console.log(e));
  }
  setInterval(() => {
    if (nft.isStaked) rewardsUSDT.value += rewardSecondUSDT;
  }, 1000)
})

const claimRewardsNFT = async (id: number) => {
  loaderClaim.value = true;
  await claimRewards(nft.id)
      .then(() => {
        rewardsUSDT.value = 0;
        loaderClaim.value = false;
      })
      .catch(() => loaderClaim.value = false);
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

      .card__count_4 {
      }

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