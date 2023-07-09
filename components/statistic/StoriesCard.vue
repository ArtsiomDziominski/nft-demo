<template>
  <!--  <div class="card-header">-->
  <!--    <p>Date</p>-->
  <!--    <p>Address</p>-->
  <!--    <p>Profit</p>-->
  <!--  </div>-->
  <!--  <template v-for="history in histories">-->
  <!--    <HistoryCard :item="history" :address="address"/>-->
  <!--  </template>-->
  <v-table theme="dark" class="table">
    <thead>
    <tr>
      <th class="text-left">
        Date
      </th>
      <th class="text-left">
        Address
      </th>
      <th class="text-left">
        Profit
      </th>
    </tr>
    </thead>
    <tbody>
    <tr
        v-for="item in histories"
        :key="item.date"
    >
      <td>{{ dateAndTime(item.date) }}</td>
      <td>{{ getAddress(address) }}</td>
      <td>{{ item.profit }} {{ item.currency }}</td>
    </tr>
    </tbody>
  </v-table>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import {PropType} from "vue/dist/vue";
import {IHistory} from "../../types/types";
import {dateAndTime} from "../../utils";

const props = defineProps({
  histories: Array as PropType<Array<IHistory>>,
  address: String,
})

function getAddress(address: string) {
  return address.slice(0, 8) + '...' + address.slice(38);
}
</script>

<style scoped lang="scss">
.table {
}
</style>