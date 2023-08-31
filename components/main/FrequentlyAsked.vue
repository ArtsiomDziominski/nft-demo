<template>
  <div class="wrapper-frequently">
    <div class="frequently">
      <div class="frequently-description">
        <h2>Frequently Asked Questions</h2>
        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a
          search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved
          over
          the years, sometimes by accident, sometimes on purpose (injected humour and the like).
        </p>
        <div class="wrapper-image-frequently">
          <img src="~/assets/images/frequently-asked/ai-main-image.jpeg" alt="main image for asked">
        </div>
      </div>
      <div class="frequently-asked">
        <v-expansion-panels>
          <v-expansion-panel v-for="item in 6">
            <v-expansion-panel-title expand-icon="mdi-plus" collapse-icon="mdi-minus">
              Item
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

</script>

<style scoped lang="scss">
.wrapper-frequently {
  display: flex;
  justify-content: center;

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
        color: #89c51a;
        font-size: 60px;
        line-height: 1;
        margin-bottom: 15px;
      }

      p {
        color: var(--hover-card-history);
      }

      .wrapper-image-frequently {
        position: relative;
        padding: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
        background-color: transparent;
        border-radius: calc(20px + 5px);

        &:before {
          content: '';
          position: absolute;
          display: block;
          width: 100%;
          height: 100%;
          background: linear-gradient(295deg, rgba(0, 0, 0, 0.9976365546218487) 20%, rgba(159, 246, 7, 1) 100%);
          z-index: -1;
          animation: spin linear 4s infinite;
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
          width: 100%;
          animation: unset;
          border-radius: 20px;
        }
      }
    }

    &-asked {
      width: 40%;
    }
  }
}
</style>
