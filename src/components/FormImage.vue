<template>
    <section class="hero is-fullheight">
      <div class="hero-body no-padding">
        <div class="container">
          <slot/>
        </div>
        <div class="container width">
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
.no-padding {
  padding: 0px !important;
}

.image {
  max-height: 682px;
}

.width {
  width: 20% !important;
}
</style>
