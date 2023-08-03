<template>
  <div class="card-wrapper">
    <CardNFT :is-minting="true">
      <template #button>
        <div class="count">
          <p v-if="totalSupply">
            {{ totalSupply }}/10000
          </p>
          <MLoader v-else size="28"/>
          <p style="font-size: 14px; margin-top: 10px;">Price: 0.001 MATIC</p>
        </div>
        <v-btn :disabled="!totalSupply" @click="mint" color="primary" :loading="loaderBtn">
          Mint
        </v-btn>
      </template>
    </CardNFT>
    <div class="faucet">
      <a href="https://faucet.polygon.technology/" target="_blank">
        <v-btn variant="text">
          Faucet
        </v-btn>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import CardNFT from "~/components/CardNFT"
import MLoader from "~/components/MLoader"
import {ABI, ADDRESS} from "~/const/mint";
import {Web3} from "web3";
import {userStore} from "~/store/userStore";
import {onMounted, Ref, ref, UnwrapRef} from "vue";
import wallet from "~/mixins/wallet";

const store = userStore();
const {user} = store;
const {connectMetamask} = wallet();

let ethereum = null;
let web3 = null;
let account: Ref<null | string> = ref(null);
let contract = null;
let totalSupply: Ref<null | string | number> = ref(null);
let loader: Ref<UnwrapRef<boolean>> = ref(true);
let loaderBtn: Ref<UnwrapRef<boolean>> = ref(false);

onMounted(async () => {
  if (process.client) {
    ethereum = (window as any).ethereum;
    web3 = (window as any).web3;
  }
  if (web3) {
    contract = getContract();
    // await getAddressWallet();
  }
  await getTotalSupply();
})

function getContract() {
  web3 = new Web3(ethereum);
  return new web3.eth.Contract(ABI, ADDRESS);
}

async function getTotalSupply() {
  if (!contract) {
    contract = getContract();
  }
  await contract.methods.totalSupply().call()
      .then((total) => {
    totalSupply.value = total;
  });
}

async function getAddressWallet() {
  const accounts = await web3.eth.getAccounts();
  user.wallet = accounts.length ? accounts[0] : null;
  return user.wallet;
}

async function mint() {
  loaderBtn.value = true;
  if (await connectMetamask() && process.client) {
    const walletCurrent = await getAddressWallet();
    await contract.methods.mint(walletCurrent, 1).send({from: walletCurrent, value: "1000000000000000"})
        .catch(() => loaderBtn.value = false)
  }
  setTimeout(() => getTotalSupply(), 5000);
  loaderBtn.value = false;
}
</script>

<style scoped lang="scss">
.card-wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 80vh;
}

.count {
  display: grid;
  justify-items: center;
  font-size: 22px;
  margin: 20px 0 10px 0;
  color: var(--text-color);
}

.faucet {
  display: flex;
  justify-content: center;
}
</style>
