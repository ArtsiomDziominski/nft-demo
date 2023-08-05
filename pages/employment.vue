<template>
  <div style="display: flex; justify-content: center; align-items: center; min-height: calc(100vh - 56px)">
  <CardNFT :is-minting="true" v-for="nftid in nftIdList" :key="nftid">
    <template #button>
      <div class="count">
<!--        <p>Earn: {{ timer }}</p>-->
        <!--        <MLoader v-else size="28"/>-->
      </div>
      <v-btn @click="setStake(nftid)" color="primary">
        stake {{ nftid }}
      </v-btn>
    </template>
  </CardNFT>

    <CardNFT :is-minting="true" v-for="nftStakeId in nftIdListStake" :key="nftStakeId">
      <template #button>
        <div class="count">
          <p>+0.0000000004 MATIC</p>
          <!--        <MLoader v-else size="28"/>-->
        </div>
        <v-btn @click="setUnStake(nftStakeId)" color="primary">
          UnStake {{ nftStakeId }}
        </v-btn>
        <v-btn @click="claimRewards(nftStakeId)" color="primary">
          Claim Rewards
        </v-btn>
      </template>
    </CardNFT>
  </div>
</template>

<script setup lang="ts">
import CardNFT from "~/components/CardNFT";
import MLoader from "~/components/MLoader";
import {onMounted, Ref, ref} from "vue";
import {Web3} from "web3";
import {ABI, ADDRESS} from "../const/mint";
import {userStore} from "../store/userStore";

const store = userStore();
const {user} = store;

let ethereum = null;
let web3 = null;
let contract = null;
let totalSupply: Ref<number> = ref(0);
let balance: Ref<number> = ref(0);
let balanceStake: Ref<number> = ref(0);

let timer = ref(0);
let isStake = ref(false);
let titleStakeButton = ref('stake');
const nftIdList = ref([]);
const nftIdListStake = ref([]);

onMounted(async () => {
  if (process.client) {
    ethereum = (window as any).ethereum;
    web3 = (window as any).web3;
  }
  if (web3) {
    contract = await getContract();
  }
  await getNftList();
  await getNftListStake();
})

function getContract() {
  web3 = new Web3(ethereum);
  return new web3.eth.Contract(ABI, ADDRESS);
}

const getTotalSupply = async () => {
  await contract.methods.totalNFT().call()
      .then((total) => {
        totalSupply.value = Number(total);
      });
}

const getBalance = async () => {
  await contract.methods.balanceOf(user.wallet).call()
      .then((totalBalance) => {
        balance.value = Number(totalBalance);
      });
}

const getBalanceStake = async () => {
  await contract.methods.nftOwnerStakeAddress(user.wallet).call()
      .then((totalBalanceStake) => {
        balanceStake.value = Number(totalBalanceStake);
      });
}

const getNftList = async () => {
  await getTotalSupply();
  await getBalance()
  nftIdList.value.length = 0;

  for (let i = 1; i <= totalSupply.value; i++) {
    await contract.methods.ownerOf(String(i)).call()
        .then((ownerAddress: string) => {
          if (ownerAddress.toLowerCase() === user.wallet.toLowerCase()) nftIdList.value.push(i)
        });
  }

}

const getNftListStake = async () => {
  await getBalanceStake();
  nftIdListStake.value.length = 0;

  for (let i = 1; i <= totalSupply.value; i++) {
    await contract.methods.nftOwnerStake(String(i)).call()
        .then((ownerAddressStake: string) => {
          if (ownerAddressStake.toLowerCase() === user.wallet.toLowerCase()) nftIdListStake.value.push(i)
        });
  }

}

const setStake = async (idNft: number) => {
  if (!contract) {
    contract = getContract();
  }
  await contract.methods.stake(idNft).send({from: user.wallet})
      .then(async (total) => {
        // totalSupply.value = total;
        await getNftList();
        await getNftListStake();
        setTimeout(async () => {
          await getNftList();
          await getNftListStake();
        }, 5000)
      });
}
const setUnStake = async (idNft: number) => {
  if (!contract) {
    contract = getContract();
  }
  await contract.methods.unstake(idNft).send({from: user.wallet})
      .then(async (total) => {
        // totalSupply.value = total;
        await getNftList();
        await getNftListStake();
        setTimeout(async () => {
          await getNftList();
          await getNftListStake();
        }, 5000)
      });
}

async function handleClick(idNft: number) {
  isStake.value = !isStake.value;

  if (isStake.value) {
    // startTimer();
    await setStake(idNft);
  } else {
    stopTimer();
    titleStakeButton.value = 'stake';
  }
}

async function claimRewards(id) {
  // stopTimer();
  // timer.value = 0;
  await contract.methods.claimRewards(id).send({from: user.wallet})
}

let cancel

function startTimer() {
  cancel = setInterval(incrementSeconds, 1000);

  function incrementSeconds() {
    timer.value += 1;
  }
}

function stopTimer() {
  clearInterval(cancel);
}
</script>

<style scoped lang="scss">
.count {
  color: var(--text-color);
}
</style>
