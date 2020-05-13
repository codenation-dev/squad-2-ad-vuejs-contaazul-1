<template>
  <div class="Register">
    <form-image>
      <div class="margin-bottom">
        <p class="big-title-style is-pulled-left">Comece de graça</p>
        <p class="description-style is-pulled-left">E fique sempre de olho na sua aplicação.</p>
      </div>
      <p class="control has-icons-left">
        <validation-input
          v-model="nome"
          title="Nome Completo"
          placeholder="Insira seu nome completo"
          type="name"
        />
        <span class="icon is-small is-left icon-position">
          <i class="fas fa-user"></i>
        </span>
      </p>
      <p class="control has-icons-left">
        <validation-input
          v-model="email"
          title="Email"
          placeholder="Insira seu e-mail"
          type="email"
          class="margin"
        />
        <span class="icon is-left icon-position">
          <i class="fas fa-envelope"></i>
        </span>
      </p>
      <p class="control has-icons-left has-icons-right">
        <validation-input
          v-model="password"
          title="Senha"
          placeholder="Insira sua senha"
          :type="passwordFieldType"
          class="margin"
        >
          <router-link to="/passwordreset" class="click-link">Esqueceu sua senha?</router-link>
        </validation-input>
        <span
          class="icon
          is-small
          is-left
          icon-position">
          <i class="fas fa-lock"></i>
        </span>
        <span
          class="icon
          is-right
          icon-position
          icon-click"
          @click="switchVisibility()">
          <i class="fas fa-eye"></i>
        </span>
      </p>
      <router-link to="/login">
        <button
          class="button
          is-link
          is-fullwidth
          style-button"
        >
          Crie sua conta
        </button>
      </router-link>
      <p class="text-botton-style">
        Já possui uma conta? <router-link to="/login" class="click-link">Entre.</router-link>
      </p>
    </form-image>
  </div>
</template>

<script>
import FormImage from '../components/FormImage.vue';
import ValidationInput from '../components/ValidationInput.vue';

export default {
  components: {
    FormImage,
    ValidationInput,
  },
  data() {
    return {
      nome: null,
      email: null,
      password: null,
      passwordFieldType: 'password',
    };
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
  },
};
</script>

<style lang="scss">
.icon-click {
  pointer-events: initial !important;
  cursor: pointer;
  padding: 1px;
}

.icon-position {
  padding-top: 27px;
}

.click-link {
  color: #8798ad;
}

.click-link:hover {
  color: #2E5BFF;
  text-decoration: underline;
}
.style-button {
  color: #ffffff;
  background-color: #2E5BFF;
}

.text-botton-style {
  font-size: 15px;
  color: #B0BAC9;
  margin-top: 5px;
}
</style>
