import Vue from 'vue';

Vue.mixin({
  methods: {
    useToast(msg, type = 'default') {
      this.$toasted.show(msg, {
        position: 'top-center',
        type,
        duration: 5000,
        action: {
          text: 'Fechar',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      });
    },
  },
});
