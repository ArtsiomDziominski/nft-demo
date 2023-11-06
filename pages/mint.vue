<template>
  <div class="card-wrapper">
    <AppCardNFTSecond :img="img">
      <template #body>
        <div class="body">
          <div class="count">
            <p v-if="totalNFT !== null">
              {{ totalNFT }} out of {{ totalSupply }}
            </p>
            <MLoader v-else size="28"/>
            <p v-if="costNFT" style="font-size: 14px; margin-top: 10px;">Price: {{ costNFT }} MATIC</p>
          </div>
          <v-btn class="body__mint" :disabled="totalNFT === null" @click="mint" color="var(--main-green)"
                 :loading="loaderBtn">
            Mint
          </v-btn>
        </div>
      </template>
    </AppCardNFTSecond>

    <div class="faucet">
      <a href="https://mumbaifaucet.com/" target="_blank">
        <v-btn variant="text" color="var(--main-green)">
          Faucet
        </v-btn>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import MLoader from "~/components/MLoader"
import {ABI, ADDRESS} from "~/const/mint";
import {Web3} from "web3";
import {userStore} from "~/store/userStore";
import {onMounted, Ref, ref, UnwrapRef} from "vue";
import wallet from "~/mixins/wallet";
import commonMixin from "~/mixins/common";
import {SnackbarColor} from "../const/const";
import AppCardNFTSecond from "../components/AppCardNFTSecond.vue";
import {onUnmounted} from "../.nuxt/imports";

const store = userStore();
const {user} = store;
const {connectMetamask} = wallet();
const {setSnackbar} = commonMixin();

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
let img = ref(`https://bafybeicvld6ubfwyzzpxg6ellg2ezutyb5kvmxdfp5qlc2vxwruc2miv74.ipfs.nftstorage.link/robot-${1}.png`);
let imgCount = ref(1);
let imgInterval = ref(null);

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
  imgInterval.value = setInterval(() => setImg(), 2000);
})

onUnmounted(() => {
  if (imgInterval.value) clearInterval(imgInterval.value);
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

async function mintNft() {
  const walletCurrent = await getAddressWallet();
  await contract.methods.mint(mintAmount.value)
      .send({from: walletCurrent, value: "100000000000000000"})
      .then(() => {
        totalNFT.value += mintAmount.value;
        setSnackbar('Minted');
      })
      .catch(() => {
        loaderBtn.value = false;
        setSnackbar('Error', true, SnackbarColor.Error);
      })
}

async function mint() {
  loaderBtn.value = true;
  try {
    const walletCurrent = await getAddressWallet();
    if (walletCurrent && process.client) {
      await mintNft();
    } else {
      await connectMetamask();
      await mintNft();
    }
  } catch (_) {
  }
  setTimeout(() => getTotal(), 5000);
  loaderBtn.value = false;
}

const setImg = (): void => {
  imgCount.value = imgCount.value > 3 ? 1 : imgCount.value + 1;
  img.value = `https://bafybeicvld6ubfwyzzpxg6ellg2ezutyb5kvmxdfp5qlc2vxwruc2miv74.ipfs.nftstorage.link/robot-${imgCount.value}.png`
}
</script>

<style scoped lang="scss">
.card-wrapper {
  display: grid;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 30px;

  .body {
    .count {
      display: grid;
      justify-items: center;
      font-size: 22px;
      margin: 0 0 10px 0;
      color: var(--text-color);
    }

    .faucet {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      align-self: flex-start;
    }

    &__mint {
      width: 100%;
    }
  }
}

</style>
