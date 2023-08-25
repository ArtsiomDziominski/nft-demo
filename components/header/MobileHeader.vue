<template>
  <div class="mobile-header">
    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn class="button" icon="mdi-dots-vertical" v-bind="props"></v-btn>
      </template>

      <v-list bg-color="#658d1b" >
        <v-list-item
            v-for="button in headerButtons" @click="routeTo(button.to)"
        >
          <NuxtLink :to="button.to" class="buttons"> {{ button.name }}</NuxtLink>
        </v-list-item>
        <HeaderConnectWallet/>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import {headerButtons} from "~/const/buttons";
import HeaderConnectWallet from "~/components/header/HeaderConnectWallet.vue";
import {useRouter} from "nuxt/app";

const router = useRouter();

function routeTo(route: string) {
  router.push({path: route});
}
</script>

<style lang="scss">

.mobile-header {
  display: flex;
  justify-content: space-between;
  color: var(--text-color);

  .button {
    background-color: var(--main-green);
    color: var(--text-color);
  }
}

.buttons {
  color: var(--text-color);

  &:link {
    text-decoration: none;
  }
}


</style>
