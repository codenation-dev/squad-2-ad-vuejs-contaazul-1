<template>
  <div
    class="errors-list--item"
    :class="[error.level, { selected: isSelected }]"
    @click="redirectDetails(error.id)"
  >
    <div class="errors-list--item-wrapper">
      <div class="errors-list--item-column errors-list--item-text">
        <div class="item-column" @click.stop="toggleItem">
          <input type="checkbox" :checked="isSelected" />
        </div>
        <div class="item-column">
          <p>
            <span class="item-column--title">{{ error.name }}</span> {{ error.origin }}
          </p>
          <p>{{ error.title }}</p>
        </div>
      </div>
    </div>
    <div class="errors-list--item-wrapper">
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
    redirectDetails(id) {
      this.$router.push({ name: 'ErrorDetails', params: { id } });
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
@mixin break-large {
  @media (min-width: 992px) {
    @content;
  }
}

@mixin break-medium-less {
  @media (max-width: 991px) {
    @content;
  }
}

.errors-list--item {
  background-color: #fff;
  border: 1px solid #e4ebff;
  border-left-width: 5px;
  cursor: pointer;
  display: flex;
  transition: all 0.3s;
  flex-direction: column;

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
    border-left-color: #eacb1b;
  }
  &.debug {
    border-left-color: rgba(46, 91, 255, 0.6);
  }

  @include break-large {
    flex-direction: row;
  }

  .errors-list--item-wrapper {
    display: flex;
    flex-direction: column;

    &:first-child {
      margin-bottom: 0.5em;
    }

    @include break-large {
      flex-direction: row;
      width: 50%;
      flex: none;
      margin-bottom: 0;
    }

    .errors-list--item-column {
      display: flex;
      flex-basis: 0;
      flex-grow: 1;
      flex-shrink: 1;
      padding: 0.25em 0.75em;
      align-items: center;
      flex-wrap: wrap;

      @include break-large {
        padding: 0.75em;
      }

      &.errors-list--item-text {
        display: flex;
        flex-basis: 0;
        flex-grow: 1;
        flex-shrink: 1;
        justify-content: flex-start;
        color: #979797;
        padding: 0.75em;

        .item-column {
          flex-grow: 1;
          flex-basis: 0;

          &:first-child {
            flex-grow: 0;
            flex-basis: 30px;
            flex-shrink: 0;
            align-self: flex-start;
            padding: 0.5em 0;

            @include break-large {
              align-self: auto;
              padding: 0;
            }
          }

          .item-column--title {
            font-size: 1.5rem;
            color: #2e384d;
            margin-right: 1em;
            display: block;

            @include break-large {
              display: inline;
            }
          }

          p {
            word-break: break-all;
          }
        }
      }
    }

    &:last-child {
      flex-wrap: wrap;

      .errors-list--item-column {
        @include break-medium-less {
          &::before {
            color: #979797;
            width: 30%;
          }
          &:nth-child(1) {
            &::before {
              content: 'Data/hora';
            }
          }
          &:nth-child(2) {
            &::before {
              content: 'Usuário';
            }
          }
          &:nth-child(3) {
            &::before {
              content: 'Eventos';
            }
          }
          &:nth-child(4) {
            &::before {
              content: 'Level';
            }
          }
        }

        &:last-child {
          display: flex;
          flex-grow: 4;
          flex-basis: auto;
          flex-shrink: 1;
          flex-direction: row;
          margin-top: 0.75em;

          @include break-large {
            flex-grow: 0;
            flex-basis: 50px;
            flex-shrink: 0;
            flex-direction: column;
            justify-content: center;
            margin-top: 0;
          }

          .errors-list--item-action {
            color: #e0e7ff;
            border: 0;
            transition: all 0.3s;
            flex-grow: 1;
            text-align: center;
            padding: 0.75em 0;
            margin: 0 -0.75em -0.75em;
            border-top: 1px solid #e4ebff;

            @include break-large {
              flex-grow: 1;
              border: 0;
              padding: 0.25rem 0;
              margin: 0;
              display: flex;
              align-items: center;
            }

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
    }
  }
}
</style>
