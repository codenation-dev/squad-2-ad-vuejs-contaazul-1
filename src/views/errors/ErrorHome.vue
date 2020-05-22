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
          <div class="field has-addons">
            <p class="control">
              <input class="input" type="text" placeholder="Find a post" />
            </p>
            <p class="control">
              <button class="button">
                Search
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
    <errors-list></errors-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErrorsList from '@/components/errors/ErrorsList.vue';

export default {
  components: {
    ErrorsList,
  },

  data() {
    return {
      title: 'Dashboard de Erros',
    };
  },

  computed: {
    ...mapGetters(['countErrors']),
    total() {
      return `(${this.countErrors})`;
    },
  },
};
</script>

<style></style>
