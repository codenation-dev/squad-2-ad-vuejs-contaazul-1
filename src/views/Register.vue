<template>
  <div class="Register">
    <form-image>
      <form-header title="Comece de graça" subtitle="E fique sempre de olho na sua aplicação."/>
      <p class="control has-icons-left">
        <validation-input
          v-model="nome"
          title="Nome Completo"
          placeholder="Insira seu nome completo"
          type-validation="name"
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
          type-validation="email"
          class="margin-input"
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
          type-validation="password"
          class="margin-input"
        />
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
          button-style"
        >
          Crie sua conta
        </button>
      </router-link>
      <div class="centered">
        <p class="label-style">
          Já possui uma conta? <router-link to="/login" class="click-link">Entre.</router-link>
        </p>
      </div>
    </form-image>
  </div>
</template>

<script>
import FormHeader from '../components/FormHeader.vue';
import FormImage from '../components/FormImage.vue';
import ValidationInput from '../components/ValidationInput.vue';

export default {
  components: {
    FormHeader,
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
