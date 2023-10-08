<template>
  <div class="how-it-works">
    <h2 data-aos="fade-up" data-aos-delay="50">How It Works</h2>
    <section class="wrapper-article" v-for="(item, index) in steps">
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
        <p class="step">{{ item.short_description }}</p>
        <h3>{{ item.title }}</h3>
        <p class="article-text">{{ item.text }}</p>
      </article>
    </section>
  </div>
</template>

<script setup lang="ts">

const steps = [
  {
    short_description: 'First step',
    title: 'Buy NFT worker',
    text: 'Step into our world; you\'re just one step away from minting your very own NFT and becoming an integral part of our company!'
  },
  {
    short_description: 'Second step',
    title: 'Commence working',
    text: 'Let your NFT bot work its magic – just set it in motion and witness the results.'
  },
  {
    short_description: 'Last step',
    title: 'Harvest profits',
    text: 'Your bot has garnered a reward for you; now, all it takes is one easy step to receive it.'
  }
]

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
    color: var(--main-green);
    margin-bottom: 70px;
    font-size: 70px;
  }

  .wrapper-article {
    position: relative;
    width: 100%;
    max-width: 1440px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 150px;

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
      background-color: #0af9c43d;
      z-index: -2;

      .number-blocks {
        position: relative;
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: #2c2e31;
        font-weight: 600;


        &:before {
          content: '';
          position: absolute;
          width: 20%;
          height: 20%;
          background: linear-gradient(60deg, rgb(146, 224, 14) 0%, rgb(5, 229, 252) 100%);
          border-radius: 50%;
          z-index: -1;
          animation: spin linear 3s infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg) scale(5);
          }
          to {
            transform: rotate(360deg) scale(5);
          }
        }
      }
    }

    &:nth-child(3) {
      .wrapper-number {
          &:before,
          &:after {
            content: '';
            position: absolute;
            top: -285px;
            width: 2px;
            height: 420px;
            border: none;
            background-image: repeating-linear-gradient(181deg, rgb(113 221 70 / 35%), rgb(4, 232, 255) 25px, transparent 30px, transparent 51px);
            background-size: 10px calc(100% + 51.01px), calc(100% + 51.01px) 3px, 3px calc(100% + 51.01px), calc(100% + 51.01px) 3px;
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
            top: unset;
            bottom: -285px;
          }
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
        font-size: 20px;
      }
    }

    &:nth-child(2n) {
      flex-direction: row-reverse;
    }
  }
}
</style>
