<template>
    <section class="hero is-fullheight">
      <div class="hero-body is-paddingless">
        <div class="columns is-vcentered is-centered">
          <div class="column
            is-4-desktop is-offset-1-desktop
            is-10-mobile is-offset-1-mobile">
            <slot/>
          </div>

          <div class="column is-offset-1 is-6 is-hidden-mobile is-paddingless">
            <img class="image is-pulled-right" :src="background">
          </div>
        </div>
      </div>
    </section>
</template>

<script>
import BackgroundImage from '../img/background.jpg';

export default {
  data() {
    return {
      background: BackgroundImage,
    };
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
