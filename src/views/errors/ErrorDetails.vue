<template>
  <section class="section">
    <div class="columns is-mobile is-multiline">
      <div class="column is-min-width-fit-content">
        <div class="big-title-style page-header--title">Detalhe do Erro</div>
      </div>
      <div class="column is-min-width-fit-content">
        <div class="buttons has-addons is-pulled-right">
          <button class="button is-primary" @click="archiveItem">
            <span class="icon"><i class="fa fa-archive"></i></span>
            <span>Arquivar</span>
          </button>
          <button class="button is-danger" @click="deleteItem">
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
          <div class="subtitle date">{{ error.last_date | formatDate }}</div>
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
          <article class="message">
            <div class="message-body" :class="classMessage">
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
      return this.error.level;
    },
  },
  methods: {
    async deleteItem() {
      try {
        await this.$http.delete('/errors/', {
          data: {
            ids: [this.error.id],
          },
        });
        this.$router.push({ name: 'ErrorHome' });
      } catch (error) {
        this.useToast('Não foi possível excluir o item', 'error');
      }
    },
    async archiveItem() {
      try {
        await this.$http.put('/errors/archive', {
          ids: [this.error.id],
        });
        this.$router.push({ name: 'ErrorHome' });
      } catch (error) {
        this.useToast('Não foi possível arquivar o item', 'error');
      }
    },
  },
  created() {
    this.$http
      .get(`/errors/${this.id}`)
      .then(({ data }) => {
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
.subtitle.date {
  color: #838ea7;
}
.column-message {
  max-width: 400px;
  .message {
    background-color: #fff;

    .message-body {
      padding-top: 0;
      padding-bottom: 0;
      color: #2e384d;
      &.error {
        border-left: #e84a50 solid 4px;
      }
      &.warning {
        border-left: #eacb1b solid 4px;
      }
      &.debug {
        border-left: rgba(46, 91, 255, 0.6) solid 4px;
      }
    }
    .tag {
      font-weight: 300;
      padding-left: 2em;
      padding-right: 2em;
      &.error {
        background-color: #e84a50;
        color: white;
      }
      &.warning {
        background-color: #eacb1b;
        color: white;
      }
      &.debug {
        background-color: rgba(46, 91, 255, 0.6);
        color: white;
      }
    }
  }
  .label-style {
    left: auto;
    top: auto;
    margin-top: 1.6em;
  }
}
</style>
