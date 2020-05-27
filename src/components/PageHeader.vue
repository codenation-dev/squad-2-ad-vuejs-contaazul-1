<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          Cricket Gate
        </router-link>
      </div>
      <div class="navbar-menu">
        <div class="navbar-start">
          <router-link class="navbar-item" to="/" active-class="active">
            <span class="icon">
              <i class="fas fa-table"></i>
            </span>
            <span>
              Dashboard
            </span>
          </router-link>
        </div>
      <div class="navbar-end" v-if="!voltar">
        <div class="navbar-end">
          <div class="nav-welcome">
            <div class="title-welcome">Seja bem-vinda, {{name}}!</div>
            <div class="token">Seu token é: {{token}}</div>
        <div class="navbar-end">
          <div class="nav-welcome">
            <div class="title-welcome">Olá, {{ user.name }}!</div>
            <div class="token">Seu token é: {{ user.token }}</div>
          </div>
          <figure class="image is-48x48 user-img">
            <img
              class="is-rounded"
              src="https://unibrablog.files.wordpress.com/2017/02/marcia-regina.jpg?w=600&resize=327%2C320"
            />
          </figure>
        </div>
      </div>
      <div v-else class="navbar-end button-wrapper">
        <router-link to='/'>
          <button class="button is-link button-return">
            Voltar
          </button>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'PageHeader',
  props: {
    voltar: Boolean,
  },
  data() {
    return {
      name: this.$store.state.user.name,
      token: this.$store.state.user.token,
    };
  },
  computed: mapGetters({ user: 'getUser' }),
};
</script>

<style lang="scss" scoped>
.navbar {
  background-color: white;

  .navbar-brand {
    margin-right: 1em;
  }
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
}

.navbar-menu .navbar-start .navbar-item {
  text-transform: uppercase;
  border-bottom: 3px solid white;
  padding-top: 12px;

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
</style>
