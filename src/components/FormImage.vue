<template>
  <section class="hero is-fullheight">
    <div class="hero-body is-paddingless">
      <div class="columns is-vcentered is-centered is-fullwidth">
        <div class="column is-half">
          <div class="columns">
            <div class="column is-half-widescreen is-offset-one-quarter-widescreen">
              <img :src="logo" alt="CricketGate" class="logo" />
              <slot />
            </div>
          </div>
        </div>
        <div
          v-if="this.windowWidth > 768"
          class="column is-half is-paddingless image"
          :style="background"
        ></div>
      </div>
    </div>
  </section>
</template>

<script>
import backgroundImage from '@/assets/img/background.jpg';
import logo from '@/assets/img/cricketgate-logo-v.svg';

export default {
  data() {
    return {
      background: {
        backgroundImage: `url(${backgroundImage}`,
      },
      windowWidth: window.innerWidth,
      logo,
    };
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  },
};
</script>

<style lang="scss">
.image {
  height: 100vh;
  width: 100%;
  background-size: cover;
}
.columns.is-fullwidth {
  margin: 0;
  width: 100%;

  .column {
    padding: 1rem;
  }
}
.logo {
  margin: 0 auto 1rem;
  display: block;
}
</style>
