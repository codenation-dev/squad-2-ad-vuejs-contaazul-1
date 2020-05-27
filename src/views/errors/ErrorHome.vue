<template>
  <div>
    <div class="page-header level">
      <div class="level-left">
        <div class="level-item">
          <h1 class="page-header--title">{{ title }}</h1>
        </div>
        <div class="level-item page-header--badge">{{ total }}</div>
      </div>
      <div class="level-right">
        <div class="level-item">
            <search-bar
              @environment="filterEnvironment"
              @field="filterField"
              @search="search"
            />
        </div>
      </div>
    </div>
    <errors-list :environment="environment" :field="field" :searchValue="searchValue"/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorsList from '@/components/errors/ErrorsList.vue';
import SearchBar from '@/components/SearchBar.vue';

export default {
  components: {
    ErrorsList,
    SearchBar,
  },

  data() {
    return {
      title: 'Dashboard de Erros',
      environment: null,
      field: null,
      searchValue: null,
    };
  },

  computed: {
    ...mapGetters(['countErrors']),
    total() {
      return `(${this.countErrors})`;
    },
  },

  methods: {
    filterEnvironment(environment) {
      this.environment = environment;
    },
    filterField(field) {
      this.field = field;
    },
    search(searchValue) {
      this.searchValue = searchValue;
    },
  },
};
</script>
