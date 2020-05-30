<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand is-pulled-left">
        <router-link class="navbar-item" to="/">
          Cricket Gate
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
          <router-link class="navbar-item" to="/" exact-active-class="active">
            <span class="icon">
              <i class="fas fa-table"></i>
            </span>
            <span>
              Dashboard
            </span>
          </router-link>
        </div>
        <div class="navbar-end" v-if="!voltar">
          <div class="nav-welcome">
            <div class="title-welcome">Olá, {{ user.name }}!</div>
            <div class="token">Seu token é: {{ user.token }}</div>
          </div>
          <div
            class="dropdown is-right"
            :class="{ 'is-active': dropdownActive }"
          >
            <figure class="image is-48x48 user-img" @click="toogleDropdown">
              <img
                class="is-rounded"
                src="https://i7.pngflow.com/pngimage/754/2/png-samsung-galaxy-a8-a8-user-login-telephone-avatar-pawn-blue-angle-sphere-business-clipart-thumb.png"
              />
            </figure>
            <div class="dropdown-menu header-dropdown">
              <div class="dropdown-content">
                <button class="button is-danger" @click="signOut">
                  <span class="icon"><i class="fa fa-sign-out-alt"></i></span>
                  <span>Sair</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="navbar-end button-wrapper">
          <router-link to="/">
            <button class="button is-link button-return">
              Voltar
            </button>
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'PageHeader',
  props: {
    voltar: Boolean,
  },
  data() {
    return {
      dropdownActive: false,
      menuActive: false,
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
.navbar {
  background-color: white;

  .navbar-brand {
    margin-right: 1em;
  }
  .navbar-burger {
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

      @include break-medium-less {
        margin-top: 1em;
        padding: 8px;
        justify-content: center;
      }
      .nav-welcome {
        display: flex;
        align-items: flex-end;
        justify-content: center;
        flex-direction: column;
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
    }
  }
}
.header-dropdown {
  min-width: 5rem;
  padding-top: 0;
  .dropdown-content {
    padding: 0.8em;
    display: flex;
    justify-content: center;
    @include break-medium-less {
      margin-right: 8px;
    }
  }
}
</style>
