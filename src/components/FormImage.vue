<template>
    <section class="hero is-fullheight">
      <div class="hero-body is-paddingless">
        <div class="container slot-style">
          <slot/>
        </div>
        <div class="container is-marginless width">
          <img class="image is-pulled-right" :src="background">
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
  width: 100%;
  height: stretch;
}

.slot-style{
  max-width: 30%;
}

.width {
  max-width: 50%;
}
</style>
