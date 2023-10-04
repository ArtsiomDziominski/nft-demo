<template>
  <v-snackbar
      v-model="snackbar.is"
      :timeout="2000"
      :color="snackbar.color"
      location="right bottom"
  >
    {{ snackbar.text }}
  </v-snackbar>
</template>

<script>
import {userStore} from "../store/userStore";
import {storeToRefs} from "pinia";

export default {
  name: "AppSnackbar",
  setup() {
    const store = userStore();
    const {snackbar} = storeToRefs(store);

    return {
      snackbar
    }
  }
}
</script>

<style scoped>

</style>