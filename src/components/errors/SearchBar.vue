<template>
  <div class="wrap">
    <div class="dropdown" :class="{ 'is-active': showSearch || !isMobile }">
      <div class="dropdown-trigger" v-if="isMobile">
        <button
          class="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          @click="showSearch = !showSearch"
        >
          <span class="icon is-small">
            <i class="fas fa-search"></i>
          </span>
          <span>Busca avançada</span>
          <span class="icon is-small">
            <i class="fas fa-angle-down" aria-hidden="true"></i>
          </span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <div class="search-bar">
            <div class="columns is-desktop">
              <div class="column">
                <select-items
                  title="Ambiente"
                  :options="optionsEnvironment"
                  v-model="environment"
                />
              </div>
              <div class="column padding-field">
                <select-items
                  title="Buscar por"
                  :options="optionsField"
                  v-model="field"
                />
              </div>
              <div class="column padding-search">
                <div class="columns is-mobile">
                  <div class="column">
                    <div class="field has-addons">
                      <p class="control">
                        <input
                          v-model="searchValue"
                          class="input"
                          type="text"
                          placeholder="Palavra-chave"
                        />
                      </p>
                      <p class="control">
                        <button class="button is-info" @click="search">
                          Buscar
                        </button>
                      </p>
                    </div>
                  </div>
                  <div class="column">
                    <a
                      @click="cleanAll"
                      class="click-link"
                      title="Limpar todos os filtros"
                    >
                      <i class="far fa-times-circle"></i>
                    </a>
                  </div>
                  <div class="column options-column">
                    <div
                      class="dropdown is-right"
                      :class="{ 'is-active': dropdownOptions }"
                    >
                      <a class="click-link" @click="toogleDropdownOptions">
                        <i class="fas fa-ellipsis-h"></i>
                      </a>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import SelectItems from '../SelectItems.vue';

export default {
  components: {
    SelectItems,
  },
  data() {
    return {
      optionsEnvironment: [
        { description: 'Desenvolvimento', value: 'develop' },
        { description: 'Produção', value: 'production' },
        { description: 'Todos', value: null },
      ],
      environment: null,
      optionsField: [
        { description: 'Nome', value: 'name' },
        { description: 'Origem', value: 'origin' },
      ],
      field: null,
      searchValue: null,
      dropdownOptions: false,
      isArchivedErrors: false,
      showSearch: false,
      windowWidth: window.innerWidth,
    };
  },
  computed: {
    isMobile() {
      return this.windowWidth <= 1023;
    },
  },
  watch: {
    environment(value) {
      this.setParamsEnvironment(value);
      this.$emit('search');
    },
    field(value) {
      this.setParamsField(value);
    },
  },
  methods: {
    ...mapActions([
      'setParamsEnvironment',
      'setParamsField',
      'setParamsSearchValue',
      'setParamsArchived',
    ]),
    search() {
      this.setParamsSearchValue(this.searchValue);
      this.$emit('search');
    },
    cleanAll() {
      this.environment = null;
      this.field = null;
      this.searchValue = null;
      this.search();
    },
    toogleDropdownOptions() {
      this.dropdownOptions = !this.dropdownOptions;
    },
    getArchivedErrors() {
      this.dropdownOptions = false;
      this.isArchivedErrors = !this.isArchivedErrors;
      this.setParamsArchived(this.isArchivedErrors);
      this.$emit('search');
    },
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

.wrap {
  width: 100%;
  display: block;
}

.dropdown {
  width: 100%;

  .dropdown-menu {
    width: 100%;

    .dropdown-content {
      border-radius: 0;
      padding: 0;
    }
  }

  @include break-large {
    .dropdown-menu {
      min-width: auto;
      position: relative;
      top: 0;
      left: 0;
      padding: 0;

      .dropdown-content {
        box-shadow: none;
      }
    }
  }

  .dropdown-trigger {
    width: 100%;

    * {
      width: 100%;
    }
    .button {
      border-color: #e0e7ff;

      .icon {
        width: 1.5em;
      }
    }
  }
}

.search-bar {
  background-color: #fff;
  border: 1px solid #e4ebff;
  padding: 1.5rem;

  @include break-large {
    padding: 0.75rem 1.5rem;

    .input,
    .button {
      border-radius: 2px;
      font-size: 0.75rem;
    }

    .input {
      max-width: 120px;
    }
  }

  @include break-huge {
    .input {
      max-width: 100%;
    }
  }

  .padding-search {
    @include break-medium-less {
      .columns {
        margin-left: -0.5rem;
        margin-right: -0.5rem;
        align-items: center;

        .column {
          &:first-child {
            :first-child {
              flex-grow: 1;
            }
          }
          &:last-child {
            padding-left: 0;
            flex-shrink: 0;
            flex-grow: 0;
            flex-basis: 1.5em;
          }
        }
      }
    }
  }

  .column {
    flex-basis: auto;

    &:last-child {
      padding-right: 0.5rem;
      padding-left: 0.5rem;
    }
  }

  .click-link {
    font-size: 1.25rem;
    opacity: 0.5;
  }
}
.dropdown.is-right {
  color: #c3ccd6;
}
.dropdown-menu {
  min-width: 9rem;
  padding-top: 0;
  .dropdown-content {
    justify-content: center;
    display: flex;

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
