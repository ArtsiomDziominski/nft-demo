<template>
  <span class="loader" :style="{'font-size': `${size}px`}">Loading...</span>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

const props = defineProps({
  size: {type: String, default: '28'}
})
</script>


<style scoped lang="scss">
.loader {
  align-self: center;
  justify-self: center;
}
</style>