<template>
  <div class="box">
    <div class="columns">
      <div class="column">
        <select-items title="Ambiente" :options="optionsEnvironment" v-model="environment"/>
      </div>
      <div class="column is-3 padding-field">
        <select-items title="Buscar por" :options="optionsField" v-model="field"/>
      </div>
      <div class="column padding-search">
        <div class="field has-addons">
          <p class="control">
            <input v-model="searchValue" class="input is-small" type="text"/>
          </p>
          <p class="control">
            <button class="button is-primary is-small" @click="search">
              Buscar
            </button>
          </p>
        </div>
      </div>
      <div class="column is-2">
        <button class="button is-info is-small" @click="cleanAll">
          Limpar filtros
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import SelectItems from '../SelectItems.vue';

export default {
  components: {
    SelectItems,
  },
  data() {
    return {
      optionsEnvironment: [
        { description: 'Desenvolvimento', label: 'develop' },
        { description: 'Produção', label: 'production' },
        { description: 'Todos', label: null },
      ],
      environment: null,
      optionsField: [
        { description: 'Nome', label: 'name' },
        { description: 'Origem', label: 'origin' },
      ],
      field: null,
      searchValue: null,
    };
  },
  watch: {
    environment(value) {
      this.$emit('environment', value);
    },
    field(value) {
      this.$emit('field', value);
    },
  },
  methods: {
    search() {
      this.$emit('search', this.searchValue);
    },
    cleanAll() {
      this.environment = null;
      this.field = null;
      this.searchValue = null;
      this.search();
    },
  },
};
</script>

<style lang="scss">
.box {
  border: 1px solid #dbdbdb !important;
  box-shadow: none;
  padding-top: 15px;
  padding-bottom: 15px;
}

.paddin-search {
  padding-left: 0px;
}

.paddin-field {
  padding-right: 0px;
}
</style>
