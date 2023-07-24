<template>
  <div class="photo-grid">
    <div class="grid-column" >
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
    </div>
    <div class="grid-column" >
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft-2.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
      <img src="~/assets/images/nft.webp" alt="image example">
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.photo-grid {
  position: absolute;
  top: 0;
  left: 10%;
  display: flex;
  gap: 30px;
  height: 100vh;
  max-height: 100vh;
  z-index: -1;

  .grid-column {
    display: flex;
    flex-direction: column;
    gap: 25px;
    animation: autoscroll 100s linear 0s infinite forwards;
    opacity: 0.2;

    &:nth-child(even) {
      animation: autoscrollReverse 100s linear 0s infinite forwards;

    }

    img {
      width: 200px;
      border-radius: 20px;
      transition: all 0.3s;


      &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 25px rgba(54, 226, 255, 0.20);
      }
    }
  }

  @mixin transformY($value) {
    -moz-transform: translateY($value);
    -webkit-transform: translateY($value);
    transform: translateY($value);
  }

  @keyframes autoscroll {
    0%, 100% {
      @include transformY(-10%);
    }

    50% {
      @include transformY(-80%);
    }
  }

  @keyframes autoscrollReverse {
    0%, 100% {
      @include transformY(-80%);
    }

    50% {
      @include transformY(-10%);
    }
  }

  @keyframes autoscrollSmallScreen {
    0%, 100% {
      @include transformY(-10%);
    }

    50% {
      @include transformY(-60%);
    }
  }

  @keyframes autoscrollReverseSmallScreen {
    0%, 100% {
      @include transformY(-60%);
    }

    50% {
      @include transformY(-10%);
    }
  }
}
</style>
