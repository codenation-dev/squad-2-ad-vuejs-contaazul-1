<template>
  <div
    class="errors-list--item"
    :class="[error.level, { selected: isSelected }]"
    @click="toggleItem()"
  >
    <div class="errors-list--item-column errors-list--item-text">
      <div class="item-column"><input type="checkbox" :checked="isSelected" /></div>
      <div class="item-column">
        <p>
          <span class="item-column--title">{{ error.name }}</span> {{ error.origin }}
        </p>
        <p>{{ error.title }}</p>
      </div>
    </div>
    <div class="errors-list--item-column">{{ error.last_date | formatDate }}</div>
    <div class="errors-list--item-column">{{ error.colletected_by }}</div>
    <div class="errors-list--item-column">{{ error.qty }}</div>
    <div class="errors-list--item-column">
      <span class="is-uppercase">{{ error.level }}</span>
    </div>
    <div class="errors-list--item-column">
      <a
        class="errors-list--item-action errors-list--item-action-archive"
        @click.stop="archiveItem(error.id)"
      >
        <span class="icon is-small">
          <i class="fas fa-archive"></i>
        </span>
      </a>
      <a
        class="errors-list--item-action errors-list--item-action-delete"
        @click.stop="deleteItem(error.id)"
      >
        <span class="icon is-small">
          <i class="fas fa-trash-alt"></i>
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  props: {
    error: Object,
  },
  data() {
    return {
      selected: [],
    };
  },
  computed: {
    ...mapGetters(['getSelectedItems']),
    isSelected() {
      return !!this.getSelectedItems.find((item) => item === this.error.id);
    },
  },
  methods: {
    ...mapActions(['toggleSelectedItem']),
    useToast(msg, type = 'default') {
      this.$toasted.show(msg, {
        position: 'top-center',
        type,
        duration: 5000,
        action: {
          text: 'Fechar',
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          },
        },
      });
    },
    async deleteItem() {
      try {
        await this.$http.delete('/errors/', {
          data: {
            ids: [this.error.id],
          },
        });

        this.useToast('Item excluído com sucesso', 'success');
      } catch (error) {
        this.useToast('Não foi possível excluir o item', 'error');
      }

      this.$emit('updateList');
    },
    async archiveItem() {
      try {
        await this.$http.put('/errors/archive', {
          ids: [this.error.id],
        });

        this.useToast('Item arquivado com sucesso', 'success');
      } catch (error) {
        this.useToast('Não foi possível arquivar o item', 'error');
      }

      this.$emit('updateList');
    },
    toggleItem() {
      this.toggleSelectedItem(this.error.id);
    },
  },
};
</script>

<style lang="scss" scoped>
.errors-list--item {
  background-color: #fff;
  border: 1px solid #e4ebff;
  border-left-width: 5px;
  display: flex;
  transition: all 0.3s;

  &:hover,
  &.selected {
    border-color: rgba(46, 91, 255, 0.3);
    box-shadow: 0px 3px 5px rgba(46, 91, 255, 0.1);
  }

  + .errors-list--item {
    margin-top: 1em;
  }

  &.error {
    border-left-color: #e84a50;
  }

  &.warning {
    border-left-color: #ffd700;
  }

  .errors-list--item-column {
    display: flex;
    flex-basis: 0;
    flex-grow: 1;
    flex-shrink: 1;
    padding: 0.75em;
    align-items: center;

    &.errors-list--item-text {
      display: flex;
      flex-basis: 0;
      flex-grow: 1;
      flex-shrink: 1;
      justify-content: flex-start;
      flex: none;
      width: 50%;
      color: #979797;

      .item-column {
        &:first-child {
          flex-grow: 0;
          flex-basis: 30px;
          flex-shrink: 0;
        }

        .item-column--title {
          font-size: 1.5rem;
          color: #2e384d;
          margin-right: 1em;
        }
      }
    }

    &:last-child {
      flex-grow: 0;
      flex-basis: 50px;
      flex-shrink: 0;
      flex-direction: column;
      justify-content: center;
    }

    .errors-list--item-action {
      color: #e0e7ff;
      border: 0;
      transition: all 0.3s;
      padding: 0.25rem 0;

      &.errors-list--item-action-archive {
        &:hover {
          color: #2e5bff;
        }
      }

      &.errors-list--item-action-delete {
        &:hover {
          color: #e84a50;
        }
      }
    }
  }
}
</style>
