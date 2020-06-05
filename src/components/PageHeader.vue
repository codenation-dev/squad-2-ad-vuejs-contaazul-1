<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand is-pulled-left">
        <router-link class="navbar-item" to="/">
          <img :src="logo" alt="CricketGate - Tracking de erros" @click="closeMenu" />
        </router-link>
      </div>
      <a
        role="button"
        class="navbar-burger burger"
        :class="{ 'is-active': menuActive }"
        aria-label="menu"
        aria-expanded="true"
        data-target="navbarBasicExample"
        @click="toogleMenu"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
      <div class="navbar-menu" :class="{ 'is-active': menuActive }">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/" active-class="active" exact>
            <span @click="toogleMenu">
              <span class="icon">
                <i class="fas fa-table"></i>
              </span>
              <span>
                Dashboard
              </span>
            </span>
          </router-link>
          <router-link class="navbar-item" to="/charts" active-class="active">
            <span @click="toogleMenu">
              <span class="icon">
                <i class="far fa-chart-bar"></i>
              </span>
              <span>
                Gráficos
              </span>
            </span>
          </router-link>
        </div>
        <div class="navbar-end" v-if="!voltar">
          <div class="navbar-info--vcard">
            <div class="nav-welcome">
              <div class="title-welcome">Olá, {{ user.name }}!</div>
              <div class="token">Seu token é: {{ user.token }}</div>
            </div>
            <figure class="image is-48x48 user-img" @click="toogleDropdown">
              <img class="is-rounded" src="../assets/img/avatar.png" />
            </figure>
          </div>
          <div
            class="dropdown is-right navbar-info--dropdown"
            :class="{ 'is-active': dropdownActive }"
          >
            <div class="dropdown-menu">
              <div class="dropdown-content">
                <button class="button is-danger is-outlined is-small" @click="signOut">
                  <span class="icon"><i class="fa fa-sign-out-alt"></i></span>
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="navbar-end button-wrapper">
          <router-link class="is-pulled-right" to="/">
            <button class="button is-info is-outlined is-pulled-right">
              <span class="icon is-small">
                <i class="fas fa-arrow-left"></i>
              </span>
              <span> Voltar</span>
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import LogoCricketGate from '@/assets/img/cricketgate-logo-h.svg';

export default {
  name: 'PageHeader',
  props: {
    voltar: Boolean,
  },
  data() {
    return {
      dropdownActive: false,
      menuActive: false,
      logo: LogoCricketGate,
    };
  },
  computed: mapGetters({ user: 'getUser' }),
  methods: {
    ...mapActions({ logout: 'logout' }),
    toogleDropdown() {
      this.dropdownActive = !this.dropdownActive;
    },
    toogleMenu() {
      this.menuActive = !this.menuActive;
      this.dropdownActive = false;
    },
    closeMenu() {
      this.menuActive = false;
      this.dropdownActive = false;
    },
    signOut() {
      this.logout();
      this.$router.push({ name: 'Login' });
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

@mixin break-large {
  @media (min-width: 1024px) {
    @content;
  }
}

.navbar {
  background-color: white;

  .navbar-brand {
    margin-right: 1em;
  }
  .navbar-item {
    img {
      max-height: 3.25rem;

      @include break-medium-less {
        max-height: 3.25rem;
      }
    }
  }
  .navbar-burger {
    height: 4.65rem;
    width: 4.65rem;

    &:hover {
      background-color: #f4f6fc;
    }

    span {
      background-color: #2e5bff;
      height: 2px;
    }
  }
  .navbar-menu {
    @include break-medium-less {
      padding-top: 0;
    }

    .navbar-start {
      .navbar-item {
        text-transform: uppercase;
        border-bottom: 3px solid white;
        padding-top: 12px;

        @include break-medium-less {
          text-align: center;
        }

        &:hover,
        &.active {
          background-color: #2e5bff10;
          border-bottom: 3px solid #2e5bff;
        }

        .icon {
          margin-right: 0.5em;
          margin-top: -1px;
        }
      }
    }
    .navbar-end {
      display: flex;
      justify-content: flex-end;
      flex-direction: column;

      @include break-large {
        flex-direction: row;
      }

      .navbar-info--vcard {
        display: flex;
      }

      @include break-medium-less {
        margin-top: 1em;
        padding: 8px;
        justify-content: center;
      }

      .nav-welcome {
        display: flex;
        justify-content: center;
        flex-direction: column;

        @include break-large {
          align-items: flex-end;
        }

        .title-welcome {
          font-size: 1.1em;
        }

        .token {
          font-size: 0.8em;
          color: gray;
        }
      }
      .user-img {
        align-self: center;
        margin: 0.5em;
        height: 40px;
        width: 40px;
        cursor: pointer;
      }

      .navbar-info--dropdown {
        .dropdown-menu {
          min-width: 5rem;
          padding-top: 0;

          @include break-medium-less {
            display: block;
            position: relative;
            width: 100%;
          }

          .dropdown-content {
            padding: 0.8em;
            display: flex;
            justify-content: center;

            @include break-medium-less {
              margin-top: 1rem;
              box-shadow: none;
              padding: 0;

              .button {
                width: 100%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
