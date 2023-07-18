<template>
  <div class="wrapper-mobile-header">
    <div class="logo">
      <NuxtLink to="/">Logo</NuxtLink>
      <v-chip class="chip" size="x-small" color="warning">
        <v-icon class="mr-1" size="x-small" icon="mdi-alert-circle"></v-icon>
        Testnet
      </v-chip>
    </div>

    <v-menu>
      <template v-slot:activator="{ props }">
        <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
      </template>

      <v-list>
        <v-list-item
            v-for="(button, index) in headerButtons"
            :key="index"
            :value="index"
        >
          <v-list-item-title>
            <NuxtLink :to="button.to" class="buttons"> {{ button.name }}</NuxtLink>
          </v-list-item-title>
        </v-list-item>
        <HeaderConnectWallet/>
      </v-list>
    </v-menu>
  </div>
</template>

<script setup lang="ts">
import {headerButtons} from "~/const/buttons";
import HeaderConnectWallet from "~/components/header/HeaderConnectWallet.vue";

</script>

<style lang="scss">

.wrapper-mobile-header {
  display: flex;
  justify-content: space-between;

  .logo {
    display: flex;
    align-items: center;

    .chip {
      margin-left: 10px;
      transform: translateY(-10px);
      font-size: 10px;
    }
  }
}

.buttons:link {
  text-decoration: none;
}
</style>
