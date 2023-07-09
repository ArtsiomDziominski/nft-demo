<template>
  <h1>Profit</h1>
  <v-divider></v-divider>
  <div class="wrapper" v-if="!isLoader">
    <div class="connect" v-if="!walletAddress">
      <v-btn @click="connectWallet">Connect wallet</v-btn>
    </div>
    <div class="register-nft" v-else-if="!registered">
      <h2 class="register-nft__title">Registration for rewards USDT</h2>
      <v-btn @click="registrationRewards()">
        Register
      </v-btn>
    </div>
    <div class="profit" v-else>
      <div class="profit__waiting" v-if="!rewardsApply">
        <h2 v-if="dayToRewards" class="profit__title">You will automatically receive USDT rewards to your wallet</h2>
        <h2 v-else class="profit__title">
          The day of distribution of rewards
        </h2>
        <v-progress-linear
            :model-value="progressLinear"
            color="light-blue"
            height="40"
            striped
            class="mt-10 rounded-lg"
        >
          {{ dayToRewards }} day
        </v-progress-linear>
      </div>
      <div class="profit__apply" v-else>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g id="Large/Apply Icon">
            <path id="Ellipse 16 (Stroke)" fill-rule="evenodd" clip-rule="evenodd"
                  d="M24 45C12.402 45 3 35.598 3 24C3 12.402 12.402 3 24 3C35.598 3 45 12.402 45 24C45 35.598 35.598 45 24 45ZM24 48C10.7452 48 0 37.2548 0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48Z"
                  fill="#C2E84E"/>
            <path id="Union"
                  d="M23.5546 29.6866C23.504 29.7572 23.447 29.8246 23.3835 29.888C22.759 30.5114 21.7465 30.5114 21.122 29.888L15.4684 24.2442C14.8439 23.6207 14.8439 22.61 15.4684 21.9866C16.0928 21.3632 17.1053 21.3632 17.7298 21.9866L22.2374 26.4864L30.2702 18.4676C30.8947 17.8441 31.9071 17.8441 32.5316 18.4676C33.1561 19.091 33.1561 20.1017 32.5316 20.7251L23.5546 29.6866Z"
                  fill="#C2E84E"/>
          </g>
        </svg>
        <h2 class="profit__title">Your reward has been credited to your wallet</h2>
      </div>
    </div>
  </div>
  <MLoader class="loading" v-else/>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref, UnwrapRef, computed} from "vue";
import MLoader from "../components/MLoader.vue";
import requestServer from "../mixins/requestServer";
import wallet from "../mixins/wallet";
import axios from "axios";
import {REQUEST_BASE} from "../const/const";

const {requestDateRewards, requestUser} = requestServer();
const {connectMetamask, checkConnect} = wallet();

const dateGetProfit: Date = new Date(1687459282998 + 9999999999);
let dayToRewards: Ref<UnwrapRef<number>> = ref(7);
let progressLinear: Ref<UnwrapRef<number>> = ref(100);
let isLoader: Ref<boolean> = ref(true);
let registered: Ref<UnwrapRef<boolean>> = ref(false);
let walletAddress = ref('');
let rewardsApply = ref(false);

onMounted(async () => {
  // const wallet = await connectMetamask();
  walletAddress.value = sessionStorage.getItem('address');
  if (walletAddress.value) {
    await getDayProgressLinear();
    await getUserFromServer();
  }
  isLoader.value = false;
})

async function getUserFromServer(): Promise<void> {
  await requestUser(walletAddress.value)
      .then((userBase) => {
        registered.value = userBase.data?.registered;
        if (userBase.data?.histories.length) rewardApply(userBase.data?.histories);
      }).finally(() => {
        isLoader.value = false;

      })
}

function rewardApply(histories) {
  const dateLastHistory = histories.at(-1).date;
  const dayLastHistory = new Date(dateLastHistory).getUTCDate();
  const monthLastHistory = new Date(dateLastHistory).getUTCMonth();
  const yearLastHistory = new Date(dateLastHistory).getUTCFullYear();
  const dateToday = new Date;
  const dayToday = dateToday.getUTCDate();
  const monthToday = dateToday.getUTCMonth();
  const yearToday = dateToday.getUTCFullYear();
  rewardsApply.value = dayLastHistory === dayToday && monthLastHistory === monthToday && yearLastHistory === yearToday;
}

async function getDayProgressLinear(): Promise<void> {
  // await requestDateRewards().then((day) => {
  const dayToday = new Date().getUTCDay();
  dayToRewards.value = 7 - dayToday;
  progressLinear.value = 100 - dayToRewards.value * 10;
  // });
}

const dayTakeProfit = computed(() => {
  return `${dateGetProfit.getUTCMonth()}/${dateGetProfit.getUTCDate()}/${dateGetProfit.getFullYear()}`;
});

async function registrationRewards() {
  const wallet = await connectMetamask();
  await axios.post(REQUEST_BASE.usersPost,
      {
        id: wallet,
        address: wallet,
        registered: true,
        profits: {profitWeek: 0, profitMonth: 0, profitAll: 0},
        histories: [],
        dateRegistration: new Date()
      }).then((userBase) => {
    registered.value
        = userBase.data?.registered;
  })
}

async function connectWallet() {
  walletAddress.value = await connectMetamask();
  isLoader.value = true;
  await getUserFromServer();
  await getDayProgressLinear();
  isLoader.value = false;
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh;

  .profit {
    &__apply {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        margin-right: 10px;
      }
    }
  }

  .register-nft {
    display: flex;
    align-items: center;
    flex-direction: column;

    &__title {
      margin-bottom: 30px;
    }

    .profit {
      display: flex;
      align-items: center;
      flex-direction: column;
    }
  }
}

.loading {
  position: fixed;
  top: 50%;
  right: 50%;
}
</style>