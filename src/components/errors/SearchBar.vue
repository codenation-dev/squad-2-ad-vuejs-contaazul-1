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
                <select-items title="Buscar por" :options="optionsField" v-model="field" />
              </div>
              <div class="column padding-search">
                <div class="columns is-mobile is-multiline">
                  <div class="column" :class="{ 'is-full': isMobile }">
                    <div class="field has-addons">
                      <p class="control">
                        <input
                          v-model="searchValue"
                          class="input"
                          type="text"
                          placeholder="Palavra-chave"
                          @keypress.enter="search"
                        />
                      </p>
                      <p class="control">
                        <button class="button is-info" @click="search">
                          Buscar
                        </button>
                      </p>
                    </div>
                  </div>
                  <div v-if="isMobile" class="column is-full options is-mobile">
                    <a
                      @click="cleanAll"
                      class="click-link clear-filter"
                      title="Limpar todos os filtros"
                    >
                      <i class="far fa-times-circle"></i>
                      <span class="label-option text-option">Limpar filtro</span>
                    </a>
                    <a
                      @click="getArchivedErrors"
                      class="click-link link-archived"
                      :class="{ 'is-active': isArchivedErrors }"
                      title="Visualizar arquivados"
                    >
                      <span v-show="!isArchivedErrors" class="icon is-small">
                        <i class="far fa-square"></i>
                      </span>
                      <span v-show="isArchivedErrors" class="icon is-small">
                        <i class="fas fa-check-square"></i>
                      </span>
                      <span class="label-option text-option">Arquivados</span>
                    </a>
                  </div>
                  <div v-else class="column">
                    <div class="dropdown is-right " :class="{ 'is-active': dropdownOptions }">
                      <a class="click-link" @click="toogleDropdownOptions">
                        <i class="fas fa-ellipsis-v"></i>
                      </a>
                      <div
                        class="dropdown-menu menu-options header-dropdown"
                        :class="{ 'is-active': dropdownOptions }"
                      >
                        <div class="dropdown-content options">
                          <a @click="cleanAll" class="click-link" title="Limpar todos os filtros">
                            <i class="far fa-times-circle"></i>
                            <span class="label-option text-option">Limpar filtro</span>
                          </a>
                          <a
                            @click="getArchivedErrors"
                            class="click-link link-archived"
                            :class="{ 'is-active': isArchivedErrors }"
                            title="Visualizar arquivados"
                          >
                            <span v-show="!isArchivedErrors" class="icon is-small">
                              <i class="far fa-square"></i>
                            </span>
                            <span v-show="isArchivedErrors" class="icon is-small">
                              <i class="fas fa-check-square"></i>
                            </span>
                            <span class="label-option text-option">Arquivados</span>
                          </a>
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
        { description: 'Todos', value: null },
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
      this.setErrors();
      this.closeDropdown();
    },
    field(value) {
      this.setParamsField(value);
    },
  },
  methods: {
    ...mapActions([
      'setErrors',
      'setParamsEnvironment',
      'setParamsField',
      'setParamsSearchValue',
      'setParamsArchived',
    ]),
    search() {
      this.closeDropdown();
      this.setParamsSearchValue(this.searchValue);
      this.setErrors();
    },
    cleanAll() {
      this.environment = null;
      this.field = null;
      this.searchValue = null;
      this.search();
      this.closeDropdown();
      this.dropdownOptions = false;
    },
    toogleDropdownOptions() {
      this.dropdownOptions = !this.dropdownOptions;
    },
    getArchivedErrors() {
      this.dropdownOptions = false;
      this.closeDropdown();
      this.isArchivedErrors = !this.isArchivedErrors;
      this.setParamsArchived(this.isArchivedErrors);
      this.setErrors();
    },
    closeDropdown() {
      this.showSearch = false;
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
    #dropdown-menu {
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
  }
}
.dropdown.is-right {
  color: #c3ccd6;
}
.dropdown-menu.menu-options {
  min-width: 9rem;
  padding-top: 0;
  margin-top: 0.2em;
  margin-right: -1em;
  display: none;

  &.is-active {
    display: block;
  }

  .dropdown-content {
    display: flex;
    flex-direction: column;
    padding-top: 0.4em;
    padding-bottom: 0.4em;
    padding-left: 1em;
  }
}
.options {
  .click-link.is-active {
    color: #0073a8;
  }
  .link-archived {
    margin-left: 0.15em;
  }
  .button.is-small {
    border: none;
  }
  .label-option {
    font-size: 14px;
    margin-left: 0.75em;
    &:hover {
      color: #0073a8;
    }
    &.text-option {
      top: -4px;
      position: relative;
    }
  }
  &.is-mobile {
    min-width: 100%;
    display: flex;
    justify-content: space-evenly;
    .clear-filter {
      top: -2px;
      position: relative;
      span {
        top: -2px;
      }
    }
  }
}
#checkArchived {
  width: auto;
  margin-right: 0.25em;
}
</style>
