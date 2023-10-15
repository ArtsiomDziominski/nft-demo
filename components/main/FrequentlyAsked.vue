<template>
  <div class="wrapper-frequently">
    <div class="frequently">
      <div class="frequently-description">
        <h2 data-aos="fade-right" data-aos-delay="40">Frequently Asked Questions</h2>
        <p data-aos="fade-right" data-aos-delay="40">
          Uncover valuable insights about our product here. We trust this resource is beneficial. Should you have more
          questions, you can find detailed information on our About Us page or within our Discord community.
        </p>
        <div class="wrapper-image-frequently" data-aos="fade-right" data-aos-delay="60">
          <img src="~/assets/images/frequently-asked/ai-main-image.jpeg" alt="main image for asked">
        </div>
      </div>
      <div class="frequently-asked">
        <div class="wrapper-fs" v-for="(item, index) in asked" data-aos="fade-left" :data-aos-delay="`${20 * index}`">
          <v-expansion-panels>
            <v-expansion-panel

                :title="item.title"
                :text="item.text"
            >
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const asked = [
  {
    title: 'How often can rewards be claim?',
    text: 'Rewards can be claimed at any time, with the stamp commission being the responsibility of the NFT owner.'
  },
  {
    title: 'How quickly does the robot start its work?',
    text: 'On average, it takes around 2 hours to complete this process.'
  },
  {
    title: 'Is it possible to sell NFTs while the bot is active?',
    text: 'No, you are required to deactivate the bot prior to selling the NFT.'
  },
  {
    title: 'What\'s the maximum work period for the bot?',
    text: 'There are no time limits for the bot\'s operation. It works tirelessly.'
  },
  {
    title: 'How can I access the latest information regarding the bot?',
    text: 'Find all pertinent updates on our Discord or Twitter channels. We look forward to welcoming you there.'
  }


]
</script>

<style scoped lang="scss">
.wrapper-frequently {
  display: flex;
  justify-content: center;
  padding: 0 50px;

  .frequently {
    width: 100%;
    max-width: 1440px;
    display: flex;
    justify-content: space-between;

    &-description {
      width: 40%;
      display: flex;
      flex-direction: column;
      gap: 30px;

      h2 {
        color: var(--main-green);
        font-size: 60px;
        line-height: 1;
        margin-bottom: 15px;
      }

      p {
        color: var(--hover-card-history);
        font-size: 17px;
      }

      .wrapper-image-frequently {
        height: 50%;
        position: relative;
        padding: 2px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-color: transparent;
        border-radius: calc(20px + 2px);

        &:before {
          content: '';
          position: absolute;
          display: block;
          width: 25%;
          height: 50%;
          background: linear-gradient(80deg, rgba(146, 224, 14, 1) 0%, rgba(4, 232, 255, 1) 100%);
          z-index: -1;
          animation: spin linear 5s infinite;
        }

        @keyframes spin {
          from {
            transform: rotate(0deg) scale(5);
          }
          to {
            transform: rotate(360deg) scale(5);
          }
        }

        img {
          height: 100%;
          width: 100%;
          animation: unset;
          border-radius: 20px;
          object-fit: cover;
        }
      }
    }

    &-asked {
      width: 45%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 25px;

      .wrapper-fs {
        background: linear-gradient(80deg, rgba(146, 224, 14, 1) 0%, rgba(4, 232, 255, 1) 100%);
        padding: 1px;
        border-radius: 5px;
      }
    }
  }
}

:deep(.v-expansion-panels) {
  //margin: 20px 0 7px 0;

}

:deep(.v-expansion-panels .v-expansion-panel) {
  background: var(--background-card);
  color: var(--text-color);

  .mdi-chevron-down,
  .mdi-chevron-up {
    color: #04E8FFFF;
  }
}


</style>
