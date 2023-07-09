<template>
  <v-card
      class="mb-5 card"
      width="200"
      height="150"
  >
    <template v-slot:title>
      {{ props.title }}
    </template>

    <div class="card-text">
      <v-card-text class="card-text">
        <span class="card-text__profit">
          {{ props.profit }}
        </span>
        <span class="card-text__currency">
          {{ props.currency }}
        </span>
      </v-card-text>
    </div>
  </v-card>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({
  title: String,
  profit: Number,
  currency: String,
})
</script>

<style scoped lang="scss">
.card {
  background: var(--background-card);
  color: var(--text-color);
  .card-text {
    display: flex;
    align-items: center;
    justify-content: center;

    v-card-text {
      margin: 0 auto;
    }

    &__profit {
      font-size: 38px;
    }

    &__currency {
      margin-top: 20px;
      font-size: 14px;
    }
  }
}
</style>