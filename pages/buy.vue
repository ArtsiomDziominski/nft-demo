<template>
  <div class="wrapper">
    <h1 class="title">{{ title }}</h1>
    <h2 class="description">{{ description }}</h2>
    <AppCardNFTSecond class="card" :img="img">
      <template #body>
        <div class="body">
          <NuxtLink to="https://testnets.opensea.io/collection/anturiumtest" target="_blank">
            <v-btn class="body__mint" color="var(--main-green)">
              Buy
            </v-btn>
          </NuxtLink>
        </div>
      </template>
    </AppCardNFTSecond>
  </div>
</template>

<script setup lang="ts">
import {description, title} from "~/const/content/buy";
import AppCardNFTSecond from "../components/AppCardNFTSecond.vue";
import {onMounted, onUnmounted, ref} from "vue";

let img = ref(`https://bafybeicvld6ubfwyzzpxg6ellg2ezutyb5kvmxdfp5qlc2vxwruc2miv74.ipfs.nftstorage.link/robot-${1}.png`);
let imgCount = ref(1);
let imgInterval = ref(null);

onMounted(async () => {
  imgInterval.value = setInterval(() => setImg(), 3000);
})

onUnmounted(() => {
  if (imgInterval.value) clearInterval(imgInterval.value);
})

const setImg = (): void => {
  imgCount.value = imgCount.value > 3 ? 1 : imgCount.value + 1;
  img.value = `https://bafybeicvld6ubfwyzzpxg6ellg2ezutyb5kvmxdfp5qlc2vxwruc2miv74.ipfs.nftstorage.link/robot-${imgCount.value}.png`
}
</script>

<style scoped lang="scss">

.wrapper {
  height: calc(100vh - 60px);
  display: grid;
  grid-template-columns: 400px min-content;
  grid-template-rows: min-content min-content;
  column-gap: 30px;
  justify-content: center;
  align-content: center;

  .title {
    grid-column: 1/2;
    grid-row: 1/2;
    font-size: 28px;
    font-weight: 600;
    align-self: center;
  }

  .description {
    grid-column: 1/2;
    grid-row: 2/3;
    font-size: 14px;
    font-weight: 400;
  }

  .card {
    grid-column: 2/2;
    grid-row: 1/3;
    display: flex;
    justify-content: center;
    align-items: center;

    .body {
      &__mint {
        width: 320px;
        margin-top: 20px;
      }
    }
  }
}
</style>