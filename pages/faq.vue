<template>
  <div class="wrapper">
    <div class="faq">
      <h1>FAQ</h1>
      <template v-for="faq in faqList">
        <h4>{{ faq[0] }}</h4>
        <p>{{ faq[1] }}<a v-if="faq[2]" :href="faq[3]">{{ faq[2] }}</a></p>
        <v-divider></v-divider>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">

import {faqList} from "../config";
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  justify-content: center;

  .faq {
    max-width: 800px;

    h1 {
      margin: 20px 0;
      font-size: 75px;
      text-shadow: -1px -1px 0 #2196F3, 1px -1px 0 #2196F3, -1px 1px 0 #2196F3, 1px 1px 0 #ffffff;
    }

    h4 {
      font-size: 20px;
      font-weight: 700;
      margin: 30px 0 10px 0;
    }

    p {
      margin-bottom: 30px;
    }

    a {
      color: rgba(255, 255, 255, 0.81);
      text-decoration: underline;

      &:hover {
        color: #2196F3;
      }
    }
  }
}

</style>