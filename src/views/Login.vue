<template>
  <div>
    <form-image>
      <form-header title="Entre" subtitle="Por favor, entre com suas credenciais para continuar."/>
      <validation-input
        v-model="email"
        title="Email"
        placeholder="Insira seu e-mail"
        type-validation="email"
        class="margin-input"
        icon="fa-envelope"
      />
      <validation-input
        v-model="password"
        title="Senha"
        placeholder="Insira sua senha"
        type-validation="password"
        class="margin-input"
        icon="fa-lock"
      >
        <router-link class="label-style" to="/reset-password">Esqueceu sua senha?</router-link>
      </validation-input>
      <div class="centered">
        <p class="label-style">
          Não tem uma conta?
          <router-link class="click-link" to="/register">Cadastre-se</router-link>
        </p>
      </div>
      <button
        class="button
        is-link
        is-fullwidth
        button-style"
      >
        Entre
      </button>
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
      email: null,
      password: null,
    };
  },
};
</script>
