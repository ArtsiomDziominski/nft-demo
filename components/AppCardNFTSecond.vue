<template>
  <div class="card-wrapper">
    <v-card class="card-nft">
      <img class="card-nft__nft" :src="img" alt="nft image">

      <div class="card-nft__content content">
        <div class="content__header">
          <div v-if="name" class="content__title">{{ name }}</div>
          <div class="content__minting" v-if="isStaked">
            <div></div>
            <span>Staking</span>
          </div>
        </div>
        <slot name="body" class="card-nft__rewards"/>
      </div>
    </v-card>

    <v-card class="card-second" v-if="isStaked">
      <v-btn
          color="var(--main-green)"
          :loading="loaderClaim"
          @click="$emit('claimRewards')"
      >
        Claim Rewards
      </v-btn>
      <v-btn
          :loading="loaderUnstake"
          @click="$emit('unstake')"
      >
        Unstake
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import {userStore} from "../store/userStore";
import {storeToRefs} from "pinia";
import {ImageNFT} from "../const/const";

export default {
  name: "AppCardNFTSecond",
  props: {
    isMinting: {type: Boolean, default: false},
    img: {
      type: String,
      default: 'nft.webp',
      required: false
    },
    isTooltip: {
      type: Boolean,
      default: false,
      required: false
    },
    isStaked: {
      type: Boolean,
      default: false,
      required: false
    },
    name: {
      type: String,
      default: '',
      required: false
    },
    loaderUnstake: {
      type: Boolean,
      default: false,
      required: false
    },
    loaderClaim: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  setup() {
    const store = userStore();
    const {snackbar} = storeToRefs(store);

    return {
      ImageNFT
    }
  }
}
</script>

<style scoped lang="scss">
.card-wrapper {
  position: relative;

  .card-nft {
    width: 368px;
    height: min-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 6px;
    background: var(--background-card);
    border-radius: 20px;
    z-index: 10;

    &:hover {
      box-shadow: 0 0 10px var(--border-color-card);

      .card-second {
        left: 100px;
      }
    }

    &__nft {
      width: 100%;
      height: 100%;
      box-shadow: 0 2px 1px -1px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)), 0px 1px 1px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)), 0px 1px 3px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12));
    }

    .content {
      padding: 10px 20px;
      min-height: 100px;

      &__header {
        display: flex;
        justify-content: space-between;
      }

      &__title {
        color: var(--text-color);
      }

      &__minting {
        color: var(--text-color);
        backdrop-filter: blur(20px);
        border-radius: 5px;
        font-size: 12px;
        font-weight: 700;
        display: flex;
        justify-content: center;
        align-items: center;

        div {
          width: 10px;
          height: 10px;
          flex-shrink: 0;
          border-radius: 50%;
          margin-right: 8px;
          background: rgb(52, 199, 123);
          animation: 3s ease 0s infinite normal none running pulse;
        }
      }
    }
  }

  .card-second {
    width: 368px;
    height: 476px;
    position: absolute;
    top: 0;
    left: 0;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;

    &:hover {
      z-index: 11;
    }
  }

  .card-nft:hover + .card-second {
    z-index: 11;
  }
}

@keyframes pulse {
  0% {
    box-shadow: rgb(52, 199, 123) 0 0 0 0;
  }
  70% {
    box-shadow: rgba(52, 199, 123, 0) 0 0 0 7px;
  }
  100% {
    box-shadow: rgba(52, 199, 123, 0) 0 0 0 0;
  }
}

@media only screen and (max-width: 1440px) {
  .card-wrapper .card-nft {
    width: 300px;

    &__nft {
      height: 50%;
    }
  }
}
</style>
