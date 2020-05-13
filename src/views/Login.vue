<template>
  <div>
    <form-image>
        <div class="margin-title-description">
          <p class="big-title-style is-pulled-left">Entre</p>
          <p class="description-style is-pulled-left">
            Por favor, entre com suas credenciais para continuar
          </p>
        </div>
        <validation-input
          v-model="email"
          title="Email"
          placeholder="email@exemplo.com"
          type="email"
          class="margin-input"
        />
        <validation-input v-model="password" title="Senha" placeholder="senha" type="password">
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

export default {
  components: {
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

<style lang="scss">
.margin-input {
  margin-bottom: 20px;
}

.margin-title-description {
  margin-bottom: 100px;
}

.link {
  color: #2E5BFF;
}

.centered {
  text-align: center;
}

.centered-button {
  margin: auto;
  width: 50%;
  margin-top: 20px;
}
</style>
