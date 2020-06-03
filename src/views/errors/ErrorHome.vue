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
          <search-bar @search="search" />
        </div>
      </div>
    </div>
    <errors-list ref="errorsList" @search="search" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorsList from '@/components/errors/ErrorsList.vue';
import SearchBar from '@/components/errors/SearchBar.vue';

export default {
  components: {
    ErrorsList,
    SearchBar,
  },

  computed: {
    ...mapGetters(['countErrors', 'getParams']),
    total() {
      return `(${this.countErrors})`;
    },
    title() {
      return this.getParams.archived ? 'Erros Arquivados' : 'Dashboard de Erros';
    },
  },

  methods: {
    search() {
      this.$refs.errorsList.getErrorsApi();
    },
  },
};
</script>

<style lang="scss" scoped>
@mixin break-medium-less {
  @media (max-width: 1023px) {
    @content;
  }
}

@include break-medium-less {
  .page-header {
    padding: 0 0.5rem;
  }
}
.level {
  @include break-medium-less {
    display: block;

    .level-left + .level-right {
      margin-top: 1.5rem;
    }

    .level-right {
      .level-item {
        width: 100%;
      }
    }
  }
  .level-left {
    display: flex;

    .level-item {
      &:not(:last-child) {
        margin-bottom: 0;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
