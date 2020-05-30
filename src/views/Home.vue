<template>
  <div class="main">
    <page-header />

    <div class="container">
      <transition mode="out-in" name="fade" appear>
        <router-view />
      </transition>
    </div>
    <footer class="footer">
      Copyright
    </footer>
  </div>
</template>

<script>
import PageHeader from '@/components/PageHeader.vue';

export default {
  components: {
    PageHeader,
  },
  data() {
    return {
      title: 'Home',
    };
  },
};
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
