<template>
  <div>
    <div class="errors-list">
      <header class="errors-list--header columns is-desktop">
        <div class="errors-list--header-wrapper errors-list--header-actions">
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
        <div class="errors-list--header-wrapper" v-if="windowWidth <= 1023">
          <div
            class="dropdown errors-list--header-dropdown"
            :class="{ 'is-active': dropdownActive }"
          >
            <p>Ordenar por</p>
            <div class="dropdown-trigger">
              <button
                class="button"
                aria-haspopup="true"
                aria-controls="dropdown-filter"
                @click="dropdownActive = !dropdownActive"
                :class="currentOrder"
              >
                <span>{{ filters[currentFilter] }}</span>
                <span class="icon is-small">
                  <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
              </button>
            </div>
            <div class="dropdown-menu" id="dropdown-filter" role="menu">
              <div class="dropdown-content">
                <a
                  class="dropdown-item"
                  v-for="(filter, index) in filters"
                  :key="index"
                  @click="getErrorsApi(index)"
                >
                  {{ filter }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="errors-list--header-wrapper">
          <div class="errors-list--header-item" v-for="(filter, index) in filters" :key="index">
            <span
              class="errors-list--header-filter"
              :class="currentFilter === index ? activeClasses : ''"
              @click="getErrorsApi(index)"
              >{{ filter }}</span
            >
          </div>
          <div class="errors-list--header-item" @click="toogleDropdownOptions">
            <div class="dropdown is-right" :class="{ 'is-active': dropdownOptions }">
              <i class="fas fa-ellipsis-h"></i>
              <div class="dropdown-menu header-dropdown">
                <div class="dropdown-content">
                  <label for="checkArchived" class="button is-small">
                    <input
                      type="checkbox"
                      name="checkArchived"
                      id="checkArchived"
                      @change="getArchivedErrors"
                      :checked="isArchivedErrors"
                    />
                    Arquivados
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <transition mode="out-in" name="fade" appear>
        <loading-page v-if="isLoading" key="loading"></loading-page>
        <section v-else key="results" class="errors-list--list">
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
      dropdownActive: false,
      windowWidth: window.innerWidth,
      dropdownOptions: false,
      isArchivedErrors: false,
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
    ...mapActions(['setErrors', 'setParamsOrder', 'setSelectedItems', 'setParamsArchived']),
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
          this.dropdownActive = false;
        });
    },
    toogleDropdownOptions() {
      this.dropdownOptions = !this.dropdownOptions;
    },
    toggleAllSelected() {
      if (!this.isAllSelected) {
        this.setSelectedItems(this.allIds);
      } else {
        this.setSelectedItems([]);
      }
    },
    getArchivedErrors() {
      this.dropdownOptions = false;
      this.isArchivedErrors = !this.isArchivedErrors;
      this.setParamsArchived(this.isArchivedErrors);
      this.$emit('search');
    },
    async archiveErrors() {
      try {
        await this.$http.put('/errors/archive', {
          ids: this.getSelectedItems,
        });

        this.setSelectedItems([]);
        this.useToast('Itens arquivados com sucesso', 'success');
      } catch (error) {
        this.useToast('Não foi possível arquivar os itens', 'error');
      }

      this.getErrorsApi();
    },
    async deleteErrors() {
      try {
        await this.$http.delete('/errors/', {
          data: {
            ids: this.getSelectedItems,
          },
        });

        this.setSelectedItems([]);
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

  mounted() {
    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
    });
  },
};
</script>

<style lang="scss" scoped>
@mixin break-large {
  @media (min-width: 1024px) {
    @content;
  }
}

@mixin break-huge {
  @media (min-width: 1200px) {
    @content;
  }
}

@mixin break-medium-less {
  @media (max-width: 1023px) {
    @content;
  }
}

.errors-list--header {
  @include break-medium-less {
    margin: 0;
    padding: 0 0.5em;
  }
  .errors-list--header-wrapper {
    display: flex;
    flex-direction: column;

    @include break-large {
      flex: none;
      width: 50%;
      flex-direction: row;
    }

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
    }

    &:last-child {
      .errors-list--header-item {
        &:last-child {
          flex-grow: 0;
          flex-basis: 50px;
          flex-shrink: 0;
          margin-right: 0.75em;
          display: flex;
          align-items: flex-end;
        }
      }
    }
    .errors-list--header-filter {
      display: inline-block;
      cursor: pointer;

      @include break-large {
        font-size: 0.75rem;
      }

      @include break-huge {
        font-size: inherit;
      }

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
  }

  .errors-list--header-actions {
    @include break-large {
      padding-left: 0.75em;
      padding-right: 0.75em;
    }

    .buttons {
      display: flex;
    }

    .button {
      text-transform: uppercase;

      @include break-medium-less {
        flex-grow: 1;
      }
    }

    input[type='checkbox'] {
      cursor: pointer;
    }
  }

  .errors-list--header-dropdown {
    margin-bottom: 1em;

    .button {
      border-color: #e0e7ff;

      &::before {
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        display: inline-block;
        text-rendering: auto;
        line-height: 1;
        margin-left: calc(-0.5em - 1px);
        width: 1.5em;
      }

      &.asc {
        &::before {
          content: '\f884';
        }
      }

      &.desc {
        &::before {
          content: '\f160';
        }
      }
    }
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

.errors-list--list {
  margin-bottom: 1em;

  @include break-medium-less {
    padding: 0 0.5em;
  }
}

.dropdown {
  display: block;
  padding: 0.5em 0;

  * {
    width: 100%;
  }
}
.dropdown-menu {
  min-width: 9rem;
  padding-top: 0;

  .dropdown-content {
    .button.is-small {
      border: none;
    }
  }
}
#checkArchived {
  width: auto;
  margin-right: 1em;
}
</style>
