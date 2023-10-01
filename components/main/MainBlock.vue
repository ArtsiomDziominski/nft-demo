<template>
  <div class="main-block">
    <div class="main-block__body">
      <div class="description-block">
        <h1 class="main-block__title">
          Buy NFT and start making passive income
        </h1>
        <p>Anthurium it is a company which integrated of innovative technologies that simplify and enhance the process
          of earning while ensuring safety.</p>
        <button class="main-button">MINT NFT <img src="~/assets/images/ready-to-get/arrow.svg" alt="arrow up"></button>
      </div>
    </div>
<!--    <MainGridImage/>-->
  </div>
</template>

<script setup lang="ts">

</script>


<style scoped lang="scss">
.main-block {
  position: relative;
  height: 100%;
  min-height: calc(100vh - 56px);
  width: 100vw;
  overflow: hidden;

  &__body {
    height: 100%;
    min-height: 100vh;
    width: 100%;
    min-width: 100vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 50px 0 50px 50px;
    backdrop-filter: blur(5px);
    -webkit-backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 255, 0);
    z-index: 10;

    .description-block {
      max-width: 40%;
      display: flex;
      flex-direction: column;
      gap: 50px;

      .main-block__title {
        font-size: 52px;
        margin: 0 0 30px 0;
        background: -webkit-linear-gradient(var(--main-green), #04E8FFFF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }

      p {
        font-size: 25px;
        font-weight: 600;
      }

      .main-button {
        width: 250px;
      }
    }

    .wrapper-canvas {
      width: 60%;
      height: 100%;
      min-height: 100vh;
    }

    .card {
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10;

      &__button {
        margin-top: 20px;
        color: var(--text-color);
      }
    }
  }
}

@media screen and (max-width: 700px) {
  .main-block {

    &__body {
      flex-direction: column;
      justify-content: center;
      gap: 50px;
      padding: 80px 10px 50px 10px;

      .main-block__title {
        width: 90%;
        margin: 0;
        font-size: 30px;
        text-align: center;
      }

      .card {

        &__button {

        }
      }
    }
  }
}

</style>
