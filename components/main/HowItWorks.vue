<template>
  <div class="how-it-works">
    <h2 data-aos="fade-up" data-aos-delay="50">How It Works</h2>
    <section class="wrapper-article" v-for="(item, index) in 3">
      <iframe data-aos="fade-up" data-aos-delay="150" src="https://www.youtube.com/embed/sWxL3c9rvc4"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen>
      </iframe>

      <div class="wrapper-number">
        <div class="number-blocks">
          <p>0{{ index + 1 }}</p>
        </div>
      </div>


      <article data-aos="fade-up" data-aos-delay="100">
        <p class="step">First step</p>
        <h3>Buy NFT worker</h3>
        <p class="article-text">
          Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
          literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney
          College in Virginia,
        </p>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.how-it-works {
  width: 100%;
  min-width: 100vw;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 100px 50px;

  h2 {
    color: #89c51a;
    margin-bottom: 70px;
    font-size: 70px;
  }

  .wrapper-article {
    position: relative;
    max-width: 1440px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 150px;


    &:nth-child(3) {
      .wrapper-number {
        .number-blocks {
          &:before {
            content: '';
            position: absolute;
            top: -280px;
            width: 2px;
            height: 420px;
            border: none;
            background-image: repeating-linear-gradient(181deg, #89c51a, #89c51a 30px, transparent 30px, transparent 51px, #89c51a 51px), repeating-linear-gradient(271deg, #89c51a, #89c51a 30px, transparent 30px, transparent 51px, #121212 51px), repeating-linear-gradient(1deg, #121212, #121212 30px, transparent 30px, transparent 51px, #121212 51px), repeating-linear-gradient(91deg, #121212, #121212 30px, transparent 30px, transparent 51px, #121212 51px);
            background-size: 3px calc(100% + 51.01px), calc(100% + 51.01px) 3px, 3px calc(100% + 51.01px), calc(100% + 51.01px) 3px;
            background-position: 0 0, 0 0, 100% 0, 0 100%;
            background-repeat: no-repeat;
            animation: borderAnimation 2s infinite linear reverse;

            @keyframes borderAnimation {
              from {
                background-position: 0 0, -51.01px 0, 100% -51.01px, 0 100%;
              }
              to {
                background-position: 0 -51.01px, 0 0, 100% 0, -51.01px 100%;
              }
            }
          }

          &:after {
            content: '';
            position: absolute;
            bottom: -280px;
            width: 2px;
            height: 420px;
            border: none;
            background-image: repeating-linear-gradient(181deg, #89c51a, #89c51a 30px, transparent 30px, transparent 51px, #89c51a 51px), repeating-linear-gradient(271deg, #89c51a, #89c51a 30px, transparent 30px, transparent 51px, #121212 51px), repeating-linear-gradient(1deg, #121212, #121212 30px, transparent 30px, transparent 51px, #121212 51px), repeating-linear-gradient(91deg, #121212, #121212 30px, transparent 30px, transparent 51px, #121212 51px);
            background-size: 3px calc(100% + 51.01px), calc(100% + 51.01px) 3px, 3px calc(100% + 51.01px), calc(100% + 51.01px) 3px;
            background-position: 0 0, 0 0, 100% 0, 0 100%;
            background-repeat: no-repeat;
            animation: borderAnimation 2s infinite linear reverse;

            @keyframes borderAnimation {
              from {
                background-position: 0 0, -51.01px 0, 100% -51.01px, 0 100%;
              }
              to {
                background-position: 0 -51.01px, 0 0, 100% 0, -51.01px 100%;
              }
            }
          }
        }
      }
    }

    iframe {
      width: 100%;
      height: 350px;
      max-width: 45%;
    }

    .wrapper-number {
      width: 60px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: rgba(137, 197, 26, 0.2);

      .number-blocks {
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: var(--text-color);
        background: linear-gradient(300deg, rgba(20, 38, 1, 0.9976365546218487) 0%, rgba(133, 207, 4, 1) 100%);
      }
    }

    article {
      display: flex;
      flex-direction: column;
      justify-content: center;
      max-width: 45%;
      color: var(--hover-card-history);

      .step {
        color: var(--main-green);
        font-weight: 700;
      }

      h3 {
        color: var(--text-color);
        font-size: 35px;
        margin-bottom: 20px;
      }


      .article-text {
        line-height: 160%;
      }
    }

    &:nth-child(2n) {
      flex-direction: row-reverse;
    }
  }
}
</style>
