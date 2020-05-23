<template>
  <nav class="navbar is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <router-link class="navbar-item" to="/">
        <img
          src="https://bulma.io/images/bulma-logo.png"
          alt="Bulma: Free, open source, and modern CSS framework based on Flexbox"
          width="112"
          height="28"
        />
      </router-link>
    </div>
    <div class="navbar-menu">
      <div class="navbar-start">
        <a class="navbar-item cde-item">
          <span class="icon">
            <i class="fas fa-table"></i>
          </span>
          Dashboard
        </a>
      </div>

      <div class="navbar-end">
        <div class="nav-welcome">
          <div class="title-welcome">Seja bem-vinda, {{name}}!</div>
          <div class="token">Seu token é: {{token}}</div>
        </div>
        <figure class="image is-48x48 is-40x40 user-img">
          <img
            class="is-rounded"
            src="https://unibrablog.files.wordpress.com/2017/02/marcia-regina.jpg?w=600&resize=327%2C320"
          />
        </figure>
      </div>

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'PageHeader',
  data() {
    return {
      name: this.$store.state.user.name,
      token: this.$store.state.user.token,
    };
  },
};
</script>

<style lang="scss">

.navbar.is-light {
  background-color: white;
}
.user-img {
  align-self: center;
  margin: 0.5em;
}
.is-40x40 {
  height: 40px !important;
  width: 40px !important;
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
.cde-item {
  text-transform: uppercase;
  border-bottom: 3px solid white;
  padding-top: 12px;

  &:hover {
    background-color: #2e5bff10 !important;
    border-bottom: 3px solid #2e5bff;
  }
  .active {
    background-color: #2e5bff10 !important;
    border-bottom: 3px solid #2e5bff;
  }
  .icon {
    margin-right: 0.5em !important;
    margin-top: -1px;
  }
}
</style>
