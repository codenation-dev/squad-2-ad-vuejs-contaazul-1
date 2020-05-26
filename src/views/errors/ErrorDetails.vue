<template>
  <section class="section">
    <div class="columns is-mobile is-multiline">
      <div class="column is-min-width-fit-content">
        <div class="big-title-style page-header--title">Detalhe do Erro</div>
      </div>
      <div class="column is-min-width-fit-content">
        <div class="buttons has-addons is-pulled-right">
          <button class="button is-primary">
            <span class="icon"><i class="fa fa-archive"></i></span>
            <span>Arquivar</span>
          </button>
          <button class="button is-danger">
            <span class="icon"><i class="fa fa-trash-alt"></i></span>
            <span>Excluir</span>
          </button>
        </div>
      </div>
    </div>
    <div class="box">
      <div class="columns is-mobile is-multiline is-vcentered">
        <div class="column">
          <div class="medium-title-style">
            {{ error.name }} no {{ error.origin }}
          </div>
          <div class="subtitle">{{ error.last_date | formatDate }}</div>
          <div class="margin-top">
            <div class="small-title-style">
              Título
            </div>
            {{ error.title }}
          </div>
          <div class="margin-top">
            <div class="small-title-style">
              Detalhes
            </div>
            <div v-for="(detail, index) in error.details" :key="index">
              {{ detail }}
            </div>
          </div>
        </div>
        <div class="column is-min-width-fit-content column-message">
          <article class="message" :class="classMessage">
            <div class="message-body">
              <div class="tag is-medium" :class="classMessage">
                {{ error.level }}
              </div>
              <div class="label-style">Eventos</div>
              <div class="small-title-style">{{ error.qty }}</div>
              <div class="label-style">Usuário</div>
              <div class="small-title-style">{{ error.collected_by }}</div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: {
    id: String,
  },
  data() {
    return {
      error: {},
    };
  },
  computed: {
    ...mapGetters,
    classMessage() {
      // eslint-disable-next-line no-nested-ternary
      return this.error.level === 'error'
        ? 'is-danger'
        : this.error.level === 'warning'
          ? 'is-warning'
          : 'is-info';
    },
  },
  created() {
    this.$http
      .get(`/errors/${this.id}`)
      .then(({ data }) => {
        console.log(data);
        this.error = data;
      })
      .catch(() => this.$router.push({ name: '404' }));
  },
};
</script>

<style lang="scss" scoped>
.margin-top {
  margin-top: 2em;
}
.column-message {
  max-width: 400px;
  .message {
    background-color: #fff;
    .message-body {
      padding-top: 0;
      padding-bottom: 0;
      color: #2e384d;
    }
    .tag {
      font-weight: 300;
      padding-left: 2em;
      padding-right: 2em;
    }
  }
  .label-style {
    left: auto;
    top: auto;
    margin-top: 1.6em;
  }
}
</style>
