<template>
  <div class="wrapper-ready">
    <div class="ready">
      <h2>Ready To Start ?</h2>
      <p>Commence monetizing the potential of novel technologies.</p>
      <button class="main-button">MINT NFT <img src="~/assets/images/ready-to-get/arrow.svg" alt=""></button>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.wrapper-ready {
  display: flex;
  justify-content: center;
  width: 100vw;
  padding: 20px 50px 100px 50px;

  .ready {
    position: relative;
    width: 100%;
    max-width: 1440px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    padding: 50px 0 0 0;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      width: 80%;
      height: 1px;
      background: var(--background-main-button);
    }

    h2 {
      font-size: 45px;
      color: var(--main-green);
    }

    p {
      color: #dadada;
      font-size: 17px;
      margin: 0 0 25px 0;
    }
  }
}

</style>
