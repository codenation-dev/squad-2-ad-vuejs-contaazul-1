<template>
  <div>
    <div class="errors-list">
      <header class="errors-list--header columns">
        <div class="column">Checkbox</div>
        <div class="column">Botões</div>
        <div class="column">Data/hora</div>
        <div class="column">Usuário</div>
        <div class="column">Eventos</div>
        <div class="column">Levels</div>
        <div class="column"></div>
      </header>
    </div>

    <div>
      {{ getErrors }}
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      title: 'Listagem',
    };
  },

  computed: {
    ...mapGetters(['getErrors']),
  },

  methods: {
    ...mapActions(['setErrors']),
  },

  created() {
    this.$http
      .get('/errors')
      .then(({ data }) => {
        this.errors = data;
        this.setErrors(data);
      })
      .catch((err) => console.error(err));
  },
};
</script>
