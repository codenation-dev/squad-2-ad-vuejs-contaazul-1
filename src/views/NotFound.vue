<template>
  <div class="main">
    <pageHeader :voltar="true" />
    <div class="columns is-marginless">
        <div v-if="this.windowWidth > 768" class="column is-10 is-offset-1">
            <img class="image-style-404" :src="image">
        </div>
        <div v-else class="column is-paddingless is-12">
            <img class="image-style-404" :src="imageMobile">
        </div>
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';
import pageNotFound from '../img/page-not-found.svg';
import mobilePageNotFound from '../img/page-not-found-mobile.svg';

export default {
  data() {
    return {
      image: pageNotFound,
      imageMobile: mobilePageNotFound,
      windowWidth: window.innerWidth,
    };
  },
  components: {
    PageHeader,
  },
  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  },
};
</script>
