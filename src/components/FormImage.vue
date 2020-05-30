<template>
  <section class="hero is-fullheight">
    <div class="hero-body is-paddingless">
      <div class="columns is-vcentered is-centered">
        <div class="column is-half">
          <div class="columns">
            <div class="column is-half is-offset-one-quarter">
              <slot />
            </div>
          </div>
        </div>
        <div v-if="this.windowWidth > 768" class="column is-half is-paddingless">
          <img class="image is-pulled-right" :src="background" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import backgroundImage from '@/assets/img/background.jpg';

export default {
  data() {
    return {
      background: backgroundImage,
      windowWidth: window.innerWidth,
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
  object-fit: cover;
}

.width {
  max-width: 50%;
}
</style>
