<template>
  <v-card
      class="mx-auto mt-4"
      width="100%"
      height="60"
  >
    <div class="card-content">
      <p>
        {{ history.date }}
      </p>
      <p class="address" @click="copy(address)">
        {{ getAddress() }}
        <v-tooltip
            activator="parent"
            location="top"
        >
          {{ address }}
        </v-tooltip>
      </p>
      <p>
        {{ history.profit }}
        USDT
      </p>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({
  item: Object,
  address: String
})
const history = props.item;
const address = props.address;

function getAddress() {
  return address.slice(0, 8) + '...' + address.slice(38);
}

function copy(val: string) {
  navigator.clipboard.writeText(val)
}
</script>

<style scoped lang="scss">
.card-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
  width: 100%;
  height: 100%;
  padding: 20px;
  background: var(--background-card);
  color: var(--text-color);

  &:hover {
    background-color: var(--hover-card-history);
  }

  .address {
    cursor: pointer;
  }
}
</style>