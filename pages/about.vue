<template>
  <div class="about">
    <h1 class="about__title">About the project</h1>
    <div class="about__description description">
      <p class="description__top">Welcome to our passive income project in the world of cryptocurrencies!
        We are excited to offer you a unique opportunity to earn money by purchasing our NFTs and receiving weekly
        payments. Here's how it works:</p>
      <ol class="description__list">
        <li>Purchase our NFTs: Start by acquiring our carefully curated NFTs, each representing a unique digital asset.
          These NFTs are designed to provide you with a consistent passive income stream.
        </li>
        <li>Hold NFTs in your wallet: To be eligible for weekly payments in USDT (a stablecoin pegged to the US dollar),
          you need to keep the purchased NFTs in your wallet. By holding onto the NFTs, you maintain your status as an
          active participant in the program.
        </li>
        <li>Weekly USDT rewards: Once you meet the criteria of holding the NFTs in your wallet, you will receive weekly
          payments in USDT. These payments serve as a passive income stream, providing you with a regular and
          predictable source of earnings.
        </li>
        <li>Flexibility to sell NFTs: While holding the NFTs is necessary to receive the weekly rewards, you still have
          the freedom to sell your NFTs at any time. Selling the NFTs allows you to realize their market value and
          explore other investment opportunities if desired.
        </li>
      </ol>
      <p class="description__bottom">Please note that while you can sell the NFTs, selling them will disqualify you from
        receiving future rewards.
        The passive income component is tied to the ownership and presence of the NFTs in your wallet.</p>
      <p class="description__footer">Join our project today and take advantage of the growing world of cryptocurrencies.
        Earn passive income through
        our NFTs and unlock the potential of the digital asset market. Start building your financial future with our
        innovative passive income project.</p>
    </div>
  </div>
  <div class="card-nft">
    <div class="card-nft__left">
      <CardNFT img="https://bafybeicvld6ubfwyzzpxg6ellg2ezutyb5kvmxdfp5qlc2vxwruc2miv74.ipfs.nftstorage.link/robot-1.png"/>
    </div>
    <div class="card-nft__right">
      <CardNFT img="https://bafybeicvld6ubfwyzzpxg6ellg2ezutyb5kvmxdfp5qlc2vxwruc2miv74.ipfs.nftstorage.link/robot-2.png"/>
    </div>
  </div>
  <BackgroundStars/>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.about {
  position: relative;
  z-index: 5;
  max-width: 600px;
  margin: 60px auto;

  @media only screen and (max-width: 800px) {
    font-size: 12px;
    padding: 0 20px;
  }

  &__title {
    margin-bottom: 20px;
    font-size: 32px;
    text-align: center;
  }

  &__description {
    display: grid;
    gap: 26px;

    .description {
      &__list {
        display: grid;
        gap: 16px;
      }
    }
  }
}

.card-nft {
  background-color: transparent;

  @media only screen and (max-width: 800px) {
    display: none;
  }

  &__left {
    position: absolute;
    top: 10%;
    left: 15%;
    transform: rotate(10deg);
    transition: transform 0.5s;

    &:hover {
      box-shadow: var(--hover-card-box-shadow);
      transform: scale(1.2);
    }
  }

  &__right {
    position: absolute;
    top: 60%;
    right: 15%;
    transform: rotate(-30deg);
    transition: transform 0.5s;

    &:hover {
      box-shadow: var(--hover-card-box-shadow);
      transform: scale(1.2);
    }
  }
}
</style>