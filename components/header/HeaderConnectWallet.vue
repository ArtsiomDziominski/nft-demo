<template>
  <div class="text-center">
    <v-btn
        v-if="nameConnectButton() === CONNECT_WALLET"
        variant="text"
        :loading="loaderConnectBtn"
        @click="connectWallet"
    >
      {{ nameConnectButton() }}
    </v-btn>
    <v-menu
        v-else
        open-on-hover=""
        color="primary"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            variant="text"
            v-bind="props"
            @click="connectWallet"
        >
          {{ nameConnectButton() }}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
            v-for="(item, index) in connectWalletHeaderButtons"
            :key="index"
        >
          <v-list-item-title align="center">
            <v-btn
                variant="text"
                size="small"
                @click="disconnectWallet"
            >
              {{ item.name }}
            </v-btn>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {CONNECT_WALLET} from "~/const/const";
import wallet from "~/mixins/wallet";
import {userStore} from "~/store/userStore";
import {connectWalletHeaderButtons} from "~/const/buttons";

const {connectMetamask} = wallet();
const store = userStore();
const {user} = store;

let loaderConnectBtn = ref<boolean>(false)

async function connectWallet() {
  if (user.wallet) {
    await navigator.clipboard.writeText(user.wallet)
  } else {
    loaderConnectBtn.value = true;
    await connectMetamask();
  }
  loaderConnectBtn.value = false;
}

function nameConnectButton() {
  if (user.wallet) {
    return user.wallet.slice(0, 8) + '...' + user.wallet.slice(38);
  } else if (process.client && sessionStorage.getItem("address")) {
    user.wallet = sessionStorage.getItem("address");
    return user.wallet.slice(0, 8) + '...' + user.wallet.slice(38);
  }
  return CONNECT_WALLET;
}

function disconnectWallet() {
  sessionStorage.removeItem('address');
  user.wallet = '';
}
</script>

<style scoped lang="scss">
.text-center {

}
</style>
