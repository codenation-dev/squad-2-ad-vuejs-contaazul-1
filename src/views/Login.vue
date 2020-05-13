<template>
  <div>
    <form-image>
      <form-header title="Entre" subtitle="Por favor, entre com suas credenciais para continuar"/>
      <validation-input
        v-model="email"
        title="Email"
        placeholder="Insira seu e-mail"
        type="email"
        class="margin-input"
      />
      <validation-input
        v-model="password"
        title="Senha"
        placeholder="Insira sua senha"
        type="password"
      >
        <router-link class="label-style" to="/">Esqueceu sua senha?</router-link>
      </validation-input>
      <div class="centered">
        <label class="label-style width-center">
          Não tem uma conta? <router-link class="link" to="/">Cadastre-se</router-link>
        </label>
      </div>
      <div class="centered-button">
        <button class="button is-fullwidth">Entre</button>
      </div>
    </form-image>
  </div>
</template>

<script>
import FormImage from '../components/FormImage.vue';
import ValidationInput from '../components/ValidationInput.vue';
import FormHeader from '../components/FormHeader.vue';

export default {
  components: {
    FormImage,
    ValidationInput,
    FormHeader,
  },
  data() {
    return {
      email: null,
      password: null,
    };
  },
};
</script>

<style lang="scss">
.margin-input {
  margin-bottom: 20px;
}

.link {
  color: #2E5BFF;
}

.centered {
  text-align: center;
  margin-top: 10px;
}

.centered-button {
  margin: auto;
  width: 50%;
  margin-top: 15px;
}
</style>
