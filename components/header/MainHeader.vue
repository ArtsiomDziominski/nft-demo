<template>
  <header class="sticky top-0">
    <NuxtLink to="/" class="logo">
      <svg viewBox="0 0 147 140" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_1_19)">
          <path fill-rule="evenodd" clip-rule="evenodd"
                d="M53.191 6.15C59.293 2.05 66.049 0 73.458 0C77.55 0 81.394 0.620001 84.989 1.859C88.818 3.066 92.348 4.929 95.579 7.45C99.839 10.637 103.231 14.625 105.754 19.415L141.963 84.259C145.265 89.791 146.916 95.86 146.916 102.467C146.916 112.551 143.308 121.201 136.09 128.418C129.034 135.475 120.463 139.004 110.379 139.004H36.537C26.453 139.004 17.803 135.395 10.586 128.178C10.3621 127.954 10.1421 127.727 9.92599 127.496C3.30899 120.406 0 112.063 0 102.466C0 96.226 1.48899 90.376 4.46599 84.918L41.326 19.012C44.096 13.805 48.051 9.518 53.191 6.15ZM58.243 13.819C54.406 16.329 51.469 19.497 49.432 23.325L12.48 89.4C10.282 93.431 9.18199 97.787 9.18199 102.467C9.18199 109.65 11.668 115.905 16.639 121.231C16.783 121.385 16.929 121.536 17.079 121.686C22.503 127.11 28.989 129.822 36.537 129.822H110.379C117.927 129.822 124.334 127.19 129.597 121.926C135.021 116.502 137.734 110.016 137.734 102.466C137.734 97.53 136.506 93.013 134.05 88.918C134.026 88.8773 134.003 88.8363 133.98 88.795L97.71 23.841C97.6902 23.8063 97.6709 23.7712 97.652 23.736C95.764 20.136 93.229 17.152 90.048 14.78C90.0194 14.7586 89.9911 14.737 89.963 14.715C87.58 12.851 84.986 11.479 82.179 10.601C82.1342 10.5868 82.0895 10.5722 82.045 10.557C79.405 9.641 76.543 9.182 73.458 9.182C67.908 9.182 62.852 10.717 58.293 13.785L58.243 13.819ZM68.423 29.105C69.982 28.026 71.66 27.547 73.458 27.547C74.537 27.547 75.496 27.667 76.335 28.027C77.294 28.266 78.133 28.745 78.852 29.345C80.051 30.184 80.89 31.263 81.489 32.461L118.17 98.151C119.01 99.47 119.37 100.908 119.37 102.467C119.37 104.864 118.53 107.022 116.612 108.94C114.934 110.618 112.776 111.457 110.379 111.457C108.7 111.457 107.142 110.977 105.704 110.139C104.265 109.179 103.186 108.101 102.347 106.662L71.78 52.12C71.2776 51.1174 70.5855 50.2219 69.742 49.483C69.022 48.764 68.303 48.165 67.344 47.685C67.344 47.565 67.224 47.445 67.104 47.445C65.666 46.726 64.228 46.247 62.669 46.127H61.471C60.032 46.127 58.714 46.367 57.395 46.847L65.307 32.581C66.0114 31.1613 67.0885 29.9598 68.423 29.105ZM53.919 53.079C55.597 50.203 57.994 48.764 61.231 48.764H61.471C63.149 48.764 64.587 49.124 65.906 49.963C68.064 51.161 69.502 52.84 70.221 55.237C70.461 56.077 70.581 56.915 70.581 57.874C70.581 59.074 70.341 60.392 69.742 61.59L44.569 106.662C43.849 108.101 42.651 109.18 41.212 110.139C39.774 110.978 38.216 111.457 36.537 111.457C34.02 111.457 31.862 110.498 30.064 108.7C28.386 106.902 27.547 104.864 27.547 102.467C27.547 100.908 27.907 99.47 28.626 98.151L53.919 53.079Z"
                fill="#a6ff00"/>
        </g>
      </svg>
      <p>Anturium</p>
      <v-chip class="chip" size="x-small" color="warning">
        <v-icon class="mr-1" size="x-small" icon="mdi-alert-circle"></v-icon>
        Testnet
      </v-chip>
    </NuxtLink>

    <div class="main-header" v-if="isShowMainHeader">
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
const sizeMobileScreen: number = 750;

let isShowMainHeader = ref<boolean>(true);

onMounted(() => {
  // if (process.client) getUserNFT();
  window.addEventListener('resize', checkResize);
  isShowMainHeader.value = window.innerWidth >= sizeMobileScreen;
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
  isShowMainHeader.value = event.target.innerWidth >= sizeMobileScreen;
}
</script>

<style scoped lang="scss">
header {
  width: 100vw;
  position: fixed;
  top: 0;
  padding: 10px 30px 10px 20px;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);

  .logo {
    display: flex;
    align-items: flex-end;
    gap: 5px;

    svg {
      width: 30px;
      height: 30px;
    }

    p {
      line-height: 1;
      color: var(--main-green);
      font-weight: 700;
    }

    .chip {
      transform: translateY(-10px);
      font-size: 12px;
    }
  }

  .main-header {
    width: 90%;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .buttons {
      margin-right: 50px;
    }
  }
}

@media screen and (max-width: 900px) {
  header {
    .logo {
      svg {
        width: 40px;
        height: 40px;
      }

      p {
        display: none;
      }
    }

    .main-header {
      .buttons {
        margin-right: unset;
      }
    }
  }
}

@media screen and (max-width: 750px) {
  header {
    .main-header {
      display: none;
    }
  }
}

</style>
