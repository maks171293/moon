<template>
  <div class="home-image">
    <img src="~@/assets/images/dashboard-bg.jpg" alt="">
  </div>
</template>

<style lang="scss" scoped>
  .home-image {
    position: absolute;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100%;
    overflow: hidden;
    background: #007bff;

    img {
      height: 100%;
      width: auto;
      min-width: 100%;
      opacity: 0.6;
    }
  }
</style>
