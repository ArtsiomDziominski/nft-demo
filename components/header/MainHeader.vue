<template>
  <header class="sticky top-0">
    <div class="wrapper-main-header" v-if="isShowMainHeader">
      <div class="logo">
        <NuxtLink to="/">Logo</NuxtLink>
        <v-chip class="chip" size="x-small" color="warning">
          <v-icon class="mr-1" size="x-small" icon="mdi-alert-circle"></v-icon>
          Testnet
        </v-chip>
      </div>
      <div class="buttons">
        <v-btn v-for="button in headerButtons" :key="button"
               :variant="variantTypeButtons(button.to)"
               :color="button.color"
               @click="routeTo(button.to)"
        >
          {{ button.name }}
        </v-btn>
      </div>
      <HeaderConnectWallet/>
    </div>

    <MobileHeader v-else></MobileHeader>
  </header>
</template>

<script setup lang="ts">
import {headerButtons} from "~/const/buttons";
import {useRouter, useRoute} from "nuxt/app";
import HeaderConnectWallet from "~/components/header/HeaderConnectWallet.vue";
import MobileHeader from "~/components/header/MobileHeader.vue";
import wallet from "~/mixins/wallet";
import {onMounted, ref} from "vue";

const {getUserNFT} = wallet();

const router = useRouter();
const route = useRoute();

let isShowMainHeader = ref<boolean>(true);

onMounted(() => {
  // if (process.client) getUserNFT();
  window.addEventListener('resize', checkResize);
  isShowMainHeader.value = window.innerWidth >= 1000;
})

function routeTo(route: string) {
  router.push({path: route});
}

function getRoutePatch(): string {
  return route.fullPath;
}

function variantTypeButtons(to: string) {
  const routePatch = getRoutePatch();
  return routePatch === to ? 'outlined' : 'text';
}

function checkResize() {
  event.target.innerWidth <= 1000 ? isShowMainHeader.value = false : isShowMainHeader.value = true;
}
</script>

<style scoped lang="scss">
header {
  position: sticky;
  top: 0;
  padding: 10px 20px;

  .wrapper-main-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      .chip {
        margin-left: 10px;
        transform: translateY(-10px);
        font-size: 10px;
      }
    }
  }
}
</style>
