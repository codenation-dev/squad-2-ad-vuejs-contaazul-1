<template>
  <div>
    <div class="errors-list">
      <header class="errors-list--header columns">
        <div class="errors-list--header-item errors-list--header-actions">
          <div class="buttons has-addons">
            <label for="checkAll" class="button is-small" :class="{ 'is-ghost': !isAllSelected }">
              <input
                type="checkbox"
                name="checkAll"
                id="checkAll"
                @change="toggleAllSelected"
                :checked="isAllSelected"
              />
            </label>
            <button
              class="button is-small is-primary"
              :class="actionsClasses"
              @click="archiveErrors"
            >
              <span class="icon"><i class="fa fa-archive"></i></span>
              <span>Arquivar</span>
            </button>
            <button class="button is-small is-danger" :class="actionsClasses" @click="deleteErrors">
              <span class="icon"><i class="fa fa-trash-alt"></i></span>
              <span>Excluir</span>
            </button>
          </div>
        </div>
        <div class="errors-list--header-item" v-for="(filter, index) in filters" :key="index">
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
        <loading-page v-if="isLoading" key="loading"></loading-page>
        <section v-else key="results">
          <errors-list-item
            v-for="error in getErrors"
            :key="error.id"
            :error="error"
            @updateList="getErrorsApi"
          />
        </section>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import LoadingPage from '@/components/LoadingPage.vue';
import ErrorsListItem from '@/components/errors/ErrorsListItem.vue';

export default {
  components: {
    LoadingPage,
    ErrorsListItem,
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

  computed: {
    ...mapGetters(['getErrors', 'getParams', 'getSelectedItems']),
    actionsClasses() {
      return this.getSelectedItems.length ? '' : 'is-disabled';
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
    allIds() {
      return this.getErrors.map((item) => item.id);
    },
    isAllSelected() {
      return this.allIds.length > 0 && this.allIds.length === this.getSelectedItems.length;
    },
  },

  methods: {
    ...mapActions(['setErrors', 'setParamsOrder', 'setSelectedItems']),
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
    getErrorsApi(orderby) {
      this.isLoading = true;

      this.setParamsOrder(orderby);

      const params = this.getParams;

      this.$http
        .get('/errors', { params })
        .then(({ data }) => {
          this.setErrors(data);
        })
        .catch(() => {
          this.useToast('Não foi possível carregar os logs');
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    toggleAllSelected() {
      if (!this.isAllSelected) {
        this.setSelectedItems(this.allIds);
      } else {
        this.setSelectedItems([]);
      }
    },
    async archiveErrors() {
      try {
        await this.$http.put('/errors/archive', {
          ids: this.getSelectedItems,
        });

        this.useToast('Itens arquivados com sucesso', 'success');
      } catch (error) {
        this.useToast('Não foi possível arquivar os itens', 'error');
      }

      this.getErrorsApi();
    },
    async deleteErrors() {
      try {
        this.$http.delete('/errors/', {
          data: {
            ids: this.getSelectedItems,
          },
        });

        this.useToast('Itens excluídos com sucesso', 'success');
      } catch (error) {
        this.useToast('Não foi possível excluir os itens', 'error');
      }

      this.getErrorsApi();
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
    margin-right: 0.75em;
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
  flex: none;
  width: 50%;

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
