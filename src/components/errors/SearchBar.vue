<template>
  <div>
    <div class="search-bar">
      <div class="columns is-vcentered">
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
          <div class="field has-addons">
            <p class="control">
              <input v-model="searchValue" class="input is-small" type="text" />
            </p>
            <p class="control">
              <button class="button is-primary is-small" @click="search">
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
    };
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
};
</script>

<style lang="scss" scoped>
.search-bar {
  background-color: #fff;
  border: 1px solid #e4ebff;
  padding: 0.75rem 1.5rem;

  .paddin-search {
    padding-left: 0px;
  }

  .paddin-field {
    padding-right: 0px;
  }
  .column {
    flex-basis: auto;

    &:last-child {
      padding-right: 0;
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
