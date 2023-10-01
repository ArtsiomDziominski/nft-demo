<template>
  <div class="main-block">
    <img class="background" src="~/assets/images/hero-gradient.svg" alt="">
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
    <div class="wrap">
      <div class="c" v-for="count in 500"></div>
    </div>

<!--    </div>-->
    <!--    <MainGridImage/>-->
  </div>
</template>

<script setup lang="ts">

</script>


<style scoped lang="scss">
.main-block {
  display: flex;
  position: relative;
  height: 100%;
  min-height: calc(100vh - 56px);
  width: 100vw;
  overflow: hidden;

  .background {
    position: absolute;
    width: 120%;
    right: 0;
    top: -25%;
    opacity: 0.2;
  }

  // best in chrome
  $total: 500; // total particles
  $orb-size: 250px;
  $particle-size: 2px;
  $time: 20s;
  $base-hue: 84; // change for diff colors (180 is nice)

  .wrap {
    position: absolute;
    top: 47%;
    right: 30%;
    width: 0;
    height: 0;
    transform-style: preserve-3d;
    perspective: 1000px;
    animation: rotate $time infinite linear; // rotate orb
    z-index: 10;
  }

  @keyframes rotate {
    100% {
      transform: rotateY(360deg) rotateX(360deg);
    }
  }

  .c {
    position: absolute;
    width: $particle-size;
    height: $particle-size;
    border-radius: 50%;
    opacity: 0;
  }

  @for $i from 1 through $total {
    $z: (random(360) * 1deg); // random angle to rotateZ
    $y: (random(360) * 1deg); // random to rotateX
    $hue: ((40/$total * $i) + $base-hue); // set hue

    .c:nth-child(#{$i}){ // grab the nth particle
      animation: orbit#{$i} $time infinite;
      animation-delay: ($i * .01s);
      background-color: hsla($hue, 100%, 50%, 1);
    }

    @keyframes orbit#{$i}{
      20% {
        opacity: 1; // fade in
      }
      30% {
        transform: rotateZ(-$z) rotateY($y) translateX($orb-size) rotateZ($z); // form orb
      }
      80% {
        transform: rotateZ(-$z) rotateY($y) translateX($orb-size) rotateZ($z); // hold orb state 30-80
        opacity: 1; // hold opacity 20-80
      }
      100% {
        transform: rotateZ(-$z) rotateY($y) translateX( ($orb-size * 3) ) rotateZ($z); // translateX * 3
      }
    }
  }

  &__body {
    height: 100%;
    min-height: 100vh;
    width: 100%;
    min-width: 100vw;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 50px 0 50px 50px;
    //backdrop-filter: blur(5px);
    //-webkit-backdrop-filter: blur(5px);
    //background-color: rgba(0, 0, 255, 0);
    //z-index: 10;

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
