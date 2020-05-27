<template>
  <div class="box">
    <div class="columns">
      <div class="column">
        <select-items title="Ambiente" :options="optionsEnvironment" v-model="environment"/>
      </div>
      <div class="column">
        <select-items title="Buscar por" :options="optionsField" v-model="field"/>
      </div>
      <div class="column">
        <div class="field has-addons">
          <p class="control">
            <input v-model="searchValue" class="input is-small" type="text"/>
          </p>
          <p class="control">
            <button class="button is-info is-small" @click="search">
              Buscar
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SelectItems from './SelectItems.vue';

export default {
  components: {
    SelectItems,
  },
  data() {
    return {
      optionsEnvironment: [
        { description: 'Desenvolvimento', label: 'develop' },
        { description: 'Produção', label: 'production' },
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
      this.$emit('environment', value.label);
    },
    field(value) {
      this.$emit('field', value.label);
    },
  },
  methods: {
    search() {
      this.$emit('search', this.searchValue);
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
</style>
