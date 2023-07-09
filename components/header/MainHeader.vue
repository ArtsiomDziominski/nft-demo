<template>
  <header class="sticky top-0">
    <div class="wrapper">
      <div class="logo-wrapper">
        <a href="/">Logo</a>
        <v-chip class="chip" size="x-small" color="warning">
          <v-icon class="mr-1" size="x-small" icon="mdi-alert-circle"></v-icon>
          Testnet
        </v-chip>
      </div>
      <div class="buttons">
        <template v-for="button in buttons" :key="button">
          <v-btn
              :variant="variantTypeButtons(button.to)"
              :color="button.color"
              @click="routeTo(button.to)"
          >
            {{ button.name }}
          </v-btn>
        </template>
      </div>
      <HeaderConnectWallet/>
    </div>
  </header>
</template>

<script setup lang="ts">
import {buttons} from "../../const/buttons";
import {useRouter, useRoute} from "nuxt/app";
import HeaderConnectWallet from "./HeaderConnectWallet.vue";
import wallet from "../../mixins/wallet";
import {onMounted} from "vue";

const {getUserNFT} = wallet();

const router = useRouter();
const route = useRoute();

onMounted(() => {
  if (process.client) getUserNFT();
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
</script>

<style scoped lang="scss">
header {
  position: sticky;
  top: 0;
  padding: 10px 20px;

  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
      width: 100px;
    }

    .chip {
      margin-left: 10px;
      transform: translateY(-10px);
      font-size: 10px;
    }
  }
}
</style>