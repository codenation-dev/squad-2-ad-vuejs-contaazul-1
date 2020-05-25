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
            <input class="input is-small" type="text"/>
          </p>
          <p class="control">
            <button class="button is-info is-small">
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
      optionsEnvironment: ['Desenvolvimento', 'Produção'],
      environment: null,
      optionsField: ['Descrição'],
      field: null,
    };
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
