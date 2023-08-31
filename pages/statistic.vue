<template>
  <div class="wrapper-other">
    <div class="stat" v-if="user.wallet">
      <div class="stat__title">
        <h1>Statistic</h1>
        <v-divider></v-divider>
      </div>
      <div class="stat__profit">
        <h4>Profit</h4>
        <div class="card-profit">
          <StatisticCard title="NFT" :profit="user.countNFTTotal" currency="pc."/>
          <StatisticCard title="Week" :profit="statisticList.profits?.profitWeek" currency="USDT"/>
          <StatisticCard title="Month" :profit="statisticList.profits?.profitMonth" currency="USDT"/>
          <StatisticCard title="All time" :profit="statisticList.profits?.profitAll" currency="USDT"/>
        </div>
      </div>
      <!--      <div class="stat__graph">-->
      <!--        <h4>Graph</h4>-->
      <!--        <StatisticGraph :histories="histories" :address="statisticList.address"/>-->
      <!--      </div>-->
      <div class="stat__history">
        <!--        <v-divider></v-divider>-->
        <h4 class="stat__history_title">History</h4>
        <div class="history">
          <StoriesCard :histories="histories" :address="statisticList.address"/>
        </div>
      </div>
    </div>
    <MLoader v-else-if="isLoader && user.countNFTTotal === null"/>
    <RegistrationStatistic v-else-if="!user.countNFTTotal"/>
    <WalletStatistic v-else-if="!user.wallet" @click="connectMetamask"/>
  </div>
</template>

<script setup lang="ts">
import {onMounted, Ref, ref, reactive} from "vue";
import {userStore} from "../store/userStore";
import wallet from "~/mixins/wallet";
import StatisticCard from "../components/statistic/StatisticCard.vue";
import StoriesCard from "../components/statistic/StoriesCard.vue";
import RegistrationStatistic from "../components/statistic/RegistrationStatistic.vue";
import WalletStatistic from "../components/statistic/WalletStatistic.vue";
import StatisticGraph from "~/components/statistic/StatisticGraph.vue";
import MLoader from "../components/MLoader.vue";
import requestServer from "../mixins/requestServer";

const store = userStore();
let {user} = store;
const {connectMetamask, checkConnect} = wallet();
const {requestUser} = requestServer();

let isLoader: Ref<boolean> = ref(true);
let statisticList = reactive({address: '', profits: {profitWeek: 0, profitMonth: 0, profitAll: 0}, histories: []});
let histories = ref(null);
let walletAddress = ref('');

onMounted(async () => {
  walletAddress.value = sessionStorage.getItem('address');
  if (walletAddress.value) {
    await connectWallet();
  }
  isLoader.value = false;
})

function connectWallet() {
  connectMetamask().then(async (wallet) => {
    const userBase = (await requestUser(wallet)).data;
    statisticList.address = userBase?.address;
    statisticList.profits = userBase?.profits;
    statisticList.histories = userBase?.histories;
    histories = userBase?.histories;
    isLoader.value = false;
  });
}

function setLoader(val: boolean) {
  isLoader.value = val;
}

</script>

<style scoped lang="scss">
.wrapper-other {
  width: 100%;
  min-height: 80vh;
  display: grid;
  gap: 40px;
}

.stat {
  display: grid;
  row-gap: 30px;
  column-gap: 80px;
  grid-template-columns: min-content auto;
  grid-template-rows: min-content min-content auto;

  &__title {
    grid-row: 1 / 2;
    grid-column: 1 / 3;
  }

  &__profit {
    grid-row: 2 / 4;
    grid-column: 1 / 2;

    .card-profit {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      margin: 20px 0 50px 0;
    }
  }

  &__graph {
    grid-row: 2 / 3;
    grid-column: 2 / 3;
  }

  &__history {
    grid-row: 2 / 3;
    grid-column: 2 / 3;

    &_title {
      margin: 0 0 20px 0;
    }
  }
}
</style>