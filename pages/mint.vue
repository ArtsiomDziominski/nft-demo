<template>
  <div class="card-wrapper">
    <CardNFT :is-minting="true">
      <template #button>
        <div class="count">
          <p v-if="totalNFT !== null">
            {{ totalNFT }} / {{ totalSupply }}
          </p>
          <MLoader v-else size="28"/>
          <p v-if="costNFT" style="font-size: 14px; margin-top: 10px;">Price: {{costNFT}} MATIC</p>
        </div>
        <v-btn :disabled="totalNFT === null" @click="mint" color="primary" :loading="loaderBtn">
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
let totalNFT: Ref<null | string | number> = ref(null);
let totalSupply: Ref<UnwrapRef<number | null>> = ref(null);
let costNFT: Ref<UnwrapRef<number>> = ref(0);
let mintAmount: Ref<UnwrapRef<number>> = ref(1);
let loader: Ref<UnwrapRef<boolean>> = ref(true);
let loaderBtn: Ref<UnwrapRef<boolean>> = ref(false);

onMounted(async () => {
  if (process.client) {
    ethereum = (window as any).ethereum;
    web3 = (window as any).web3;
  }
  if (web3) {
    contract = getContract();
    await getTotalSupply();
    await getCostNFT();
    // await getAddressWallet();
  }
  await getTotal();
})

function getContract() {
  web3 = new Web3(ethereum);
  return new web3.eth.Contract(ABI, ADDRESS);
}

async function getTotal() {
  if (!contract) {
    contract = getContract();
  }
  await contract.methods.totalNFT()
      .call()
      .then((total) => {
      totalNFT.value = Number(total);
  });
}

async function getTotalSupply() {
  if (!contract) {
    contract = getContract();
  }
  await contract.methods.maxSupplyNFT()
      .call()
      .then((total) => {
        totalSupply.value = total;
      });
}

async function getCostNFT() {
  if (!contract) {
    contract = getContract();
  }
  await contract.methods.costNFT()
      .call()
      .then((cost) => {
        costNFT.value = web3.utils.fromWei(cost, 'ether');
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
    await contract.methods.mint(mintAmount.value)
        .send({from: walletCurrent, value: "1000000000000000"})
        .then(() => totalNFT.value += mintAmount.value)
        .catch(() => loaderBtn.value = false)
  }
  setTimeout(() => getTotal(), 5000);
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
