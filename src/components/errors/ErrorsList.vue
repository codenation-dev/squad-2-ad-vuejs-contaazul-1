<template>
  <div>
    <div class="errors-list">
      <header class="errors-list--header columns">
        <div class="errors-list--header-item errors-list--header-actions">
          <div class="buttons has-addons">
            <label
              for="checkAll"
              class="button is-small"
              :class="{ 'is-ghost': !selectedAll }"
            >
              <input
                type="checkbox"
                name="checkAll"
                id="checkAll"
                @change="selectedAll = !selectedAll"
              />
            </label>
            <button class="button is-small is-primary" :class="actionsClasses">
              <span class="icon"><i class="fa fa-archive"></i></span>
              <span>Arquivar</span>
            </button>
            <button class="button is-small is-danger" :class="actionsClasses">
              <span class="icon"><i class="fa fa-trash-alt"></i></span>
              <span>Excluir</span>
            </button>
          </div>
        </div>
        <div
          class="errors-list--header-item"
          v-for="(filter, index) in filters"
          :key="index"
        >
          <span
            class="errors-list--header-filter"
            :class="currentFilter === index ? activeClasses : ''"
            @click="getErrorsApi(index)"
            >{{ filter }}</span
          >
        </div>
        <div class="errors-list--header-item"></div>
      </header>
      <transition mode="out-in" name="fade" appear>
        <loading-page v-if="isLoading" :key="loading"></loading-page>
        <ul class="panel" v-else :key="results">
          <li
            v-for="error in getErrors"
            :key="error.id"
            class="panel-block has-background-white"
          >
            {{ error.id }} - {{ error.name }} -
            <a @click="activeActions">Selecionar</a>
          </li>
        </ul>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingPage from '@/components/LoadingPage.vue';

export default {
  components: {
    LoadingPage,
  },
  data() {
    return {
      title: 'Listagem',
      selectedAll: false,
      selectedSome: false,
      filters: {
        last_date: 'Data/Hora',
        colletected_by: 'Usuário',
        qty: 'Eventos',
        level: 'Level',
      },
      isLoading: false,
    };
  },

  props: {
    environment: String,
    field: String,
    searchValue: String,
  },

  watch: {
    environment() {
      this.getErrorsApi();
    },
  },

  computed: {
    ...mapGetters(['getErrors', 'getParams']),
    actionsClasses() {
      return this.selectedSome ? '' : 'is-disabled';
    },
    currentFilter() {
      return this.getParams.orderby;
    },
    currentOrder() {
      return this.getParams.order;
    },
    activeClasses() {
      return `is-active is-${this.currentOrder}`;
    },
  },

  methods: {
    ...mapActions(['setErrors', 'setParams']),
    activeActions() {
      this.selectedSome = !this.selectedSome;
    },
    getErrorsApi(orderby) {
      this.isLoading = true;
      this.setParams(orderby, this.environment);

      const params = this.getParams;

      this.$http
        .get('/errors', { params })
        .then(({ data }) => {
          this.setErrors(data);
        })
        .catch(() => {
          this.$toasted.show('Não foi possível carregar os logs', {
            position: 'top-center',
            duration: 5000,
            action: {
              text: 'Fechar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
  },

  created() {
    this.getErrorsApi();
  },
};
</script>

<style lang="scss" scoped>
.errors-list--header-item {
  display: flex;
  flex-basis: 0;
  flex-grow: 1;
  flex-shrink: 1;
  flex-direction: column;
  justify-content: center;
  padding: 0.75rem;
  color: #8097b1;
  text-transform: uppercase;
  font-size: 0.875rem;

  &:last-child {
    flex-grow: 0;
    flex-basis: 50px;
    flex-shrink: 0;
  }
}
.errors-list--header-filter {
  display: inline-block;
  cursor: pointer;

  &.is-active {
    color: #0073a8;

    &:after {
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      display: inline-block;
      text-rendering: auto;
      line-height: 1;
      margin-left: 0.3rem;
    }

    &.is-asc::after {
      content: '\f106';
    }

    &.is-desc::after {
      content: '\f107';
    }
  }
}

.errors-list--header-actions {
  flex-direction: row;
  justify-content: start;
  flex-grow: 5;

  .button {
    text-transform: uppercase;
  }

  input[type='checkbox'] {
    cursor: pointer;
  }
}
.button.is-disabled,
.button.is-ghost {
  background-color: #f4f6fc;
  border-color: #e4ebff;
  color: #8097b1;
  box-shadow: none;
}
.button.is-disabled {
  pointer-events: none;
}
</style>
