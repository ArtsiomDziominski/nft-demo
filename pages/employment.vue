<template>
  <CardNFT :is-minting="true">
    <template #button>
      <div class="count">
        <p>Earn: {{ timer }}</p>
        <!--        <MLoader v-else size="28"/>-->
      </div>
      <v-btn @click="handleClick" color="primary">
        {{ titleStakeButton }}
      </v-btn>
      <v-btn v-if="timer" @click="claimRewards" color="primary">
       Claim Rewards
      </v-btn>
    </template>
  </CardNFT>
</template>

<script setup lang="ts">
import CardNFT from "~/components/CardNFT";
import MLoader from "~/components/MLoader";
import {ref} from "vue";

let timer = ref(0);
let stake = ref(false);
let titleStakeButton = ref('stake');

function handleClick() {
  stake.value = !stake.value;

  if (stake.value) {
    startTimer();
    titleStakeButton.value = 'unstake';
  } else {
    stopTimer();
    titleStakeButton.value = 'stake';
  }
}

function claimRewards(){
  stopTimer();
  timer.value = 0;
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
