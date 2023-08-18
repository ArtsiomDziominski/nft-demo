<template>
  <section>
    <div class="wrapper-advantages">

        <div class="description" v-if="isShowTitle" data-aos="fade-right">
          <h2>
            <span>Why</span>
            <span>we?</span>
          </h2>

          <p>We are a team of crypto enthusiasts who have found how to improve trading tools, we have finance meets the
            imagination: no routine, only progress!</p>
        </div>

      <div class="advantages" >
        <div id="#example-anchor" class="item corner-left" data-aos="fade-left" data-aos-delay="100">
          <img src="~/assets/images/main-features/launch.svg" alt="">
          <h3>Automation</h3>
          <p> Bots can work 24/7, monitor markets, and react to real-time changes.</p>
        </div>
        <div class="item gradient-top" data-aos="fade-left" data-aos-delay="200">
          <img src="~/assets/images/main-features/robot.svg" alt="">
          <h3>Elimination of emotions</h3>
          <p>Trading decisions made by people are often influenced by emotions such as fear, greed or euphoria. Bots act
            strictly in accordance with the rules laid down in them.</p>
        </div>
        <div class="item corner-right" data-aos="fade-left" data-aos-delay="300">
          <img src="~/assets/images/main-features/power.svg" alt="">
          <h3>Speed</h3>
          <p>Bots are capable of rapidly analyzing large volumes of data and making instantaneous decisions.</p>
        </div>
        <div class="item corner-bottom-left" data-aos="fade-left" data-aos-delay="300">
          <img src="~/assets/images/main-features/response.svg" alt="">
          <h3>Instant Response</h3>
          <p>Some trading bots are equipped with news and social media analytics. This allows them to quickly respond to
            events.</p>
        </div>
        <div class="item gradient-bottom" data-aos="fade-left" data-aos-delay="400">
          <img src="~/assets/images/main-features/time.svg" alt="">
          <h3>Claim 24/7</h3>
          <p>Ability to claim rewards at any time</p>
        </div>
        <div class="item corner-bottom-right" data-aos="fade-left" data-aos-delay="500">
          <img src="~/assets/images/main-features/lock.svg" alt="">
          <h3>Lock-up 2 weeks</h3>
          <p>After you send the bot to work, the ability to sell NFTs is blocked for 2 weeks</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import {ref} from "vue";

let isShowTitle = ref(false);

setTimeout(() => {
  isShowTitle.value = true;
}, 500)
</script>

<style scoped lang="scss">
section {
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 100px 50px 50px 50px;

  .wrapper-advantages {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1440px;

    .title-enter-from {
      opacity: 0;
      transform: translateX(-60px);
    }

    .title-enter-to {
      transform: translateX(0);
    }

    .title-enter-active {
      transition: all 2s;
    }

    .description {
      width: 25%;

      h2 {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        font-size: 95px;
        line-height: 1;
        margin-bottom: 50px;
        color: var(--main-green);

        span:last-of-type {
          align-self: flex-end;
        }
      }

      p {
        color: #dadada;
      }
    }

    .advantages {
      width: 70%;
      display: flex;
      flex-wrap: wrap;
      gap: 5%;

      .item {
        width: 30%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 5px;
        padding: 30px;
        background-color: #1d1f21;

        img {
          width: 40px;
          height: 40px;
          margin-bottom: 15px;
        }

        h3 {
        }

        p {
          color: #dadada;
          font-size: 13px;
        }
      }

      .corner-left {
        background: linear-gradient(166deg, rgba(31, 33, 29, 1) 53%, rgba(59, 66, 50, 1) 84%, rgba(76, 97, 41, 1) 95%, rgba(89, 120, 34, 1) 100%);
        margin-bottom: 5%;
      }

      .gradient-top {
        background: linear-gradient(180deg, rgba(31, 33, 29, 1) 53%, rgba(59, 66, 50, 1) 84%, rgba(76, 97, 41, 1) 95%, rgba(89, 120, 34, 1) 100%);
        margin-bottom: 5%;
      }

      .corner-right {
        background: linear-gradient(194deg, rgba(31, 33, 29, 1) 53%, rgba(59, 66, 50, 1) 84%, rgba(76, 97, 41, 1) 95%, rgba(89, 120, 34, 1) 100%);
        margin-bottom: 5%;
      }

      .corner-bottom-left {
        background: linear-gradient(14deg, rgba(31, 33, 29, 1) 53%, rgba(59, 66, 50, 1) 84%, rgba(76, 97, 41, 1) 95%, rgba(89, 120, 34, 1) 100%);
      }

      .gradient-bottom {
        background: linear-gradient(0deg, rgba(31, 33, 29, 1) 53%, rgba(59, 66, 50, 1) 84%, rgba(76, 97, 41, 1) 95%, rgba(89, 120, 34, 1) 100%);
      }

      .corner-bottom-right {
        background: linear-gradient(340deg, rgba(31, 33, 29, 1) 53%, rgba(59, 66, 50, 1) 84%, rgba(76, 97, 41, 1) 95%, rgba(89, 120, 34, 1) 100%);
      }
    }
  }
}


</style>
