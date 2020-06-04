<template>
  <div>
    <form-image>
      <form-header title="Entre" subtitle="Por favor, entre com suas credenciais para continuar." />
      <validation-input
        v-model="email"
        title="E-mail"
        placeholder="Insira seu e-mail"
        type-validation="email"
        class="margin-input"
        icon="fa-envelope"
        @validation="emailValidation"
        :doAction="doLogin"
        :showMessage="showMessage"
      />
      <validation-input
        v-model="password"
        title="Senha"
        placeholder="Insira sua senha"
        type-validation="password"
        class="margin-input"
        icon="fa-lock"
        @validation="passwordValidation"
        :doAction="doLogin"
        :showMessage="showMessage"
      >
        <router-link class="click-link" to="/reset-password" tabindex="3"
          >Esqueceu sua senha?</router-link
        >
      </validation-input>
      <button
        tabindex="2"
        class="button is-primary is-fullwidth button-style margin-bottom"
        @click="doLogin"
      >
        Entre
      </button>
      <div class="centered">
        <p class="label-style">
          Não tem uma conta?
          <router-link class="click-link" to="/register" tabindex="4">Cadastre-se</router-link>
        </p>
      </div>
    </form-image>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import FormHeader from '@/components/FormHeader.vue';
import FormImage from '@/components/FormImage.vue';
import ValidationInput from '@/components/ValidationInput.vue';

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
      emailIsValid: false,
      passwordIsValid: false,
      showMessage: false,
    };
  },
  computed: {
    isValid() {
      return this.emailIsValid && this.passwordIsValid;
    },
  },
  methods: {
    ...mapActions(['login']),

    emailValidation(valid) {
      this.emailIsValid = valid;
    },
    passwordValidation(valid) {
      this.passwordIsValid = valid;
    },
    doLogin() {
      if (this.email && this.password) {
        if (this.isValid) {
          const payload = {
            email: this.email,
            password: this.password,
          };

          this.$http
            .post('/users/login', payload)
            .then(({ data }) => {
              if (data === 'Usuário ou senha incorretos') {
                this.useToast(data, 'error');
              } else {
                this.login(data);
                this.$router.push({ name: 'ErrorHome' });
              }
            })
            .catch((error) => {
              this.useToast(error, 'error');
            });
        } else {
          this.showMessage = true;
        }
      } else {
        this.useToast('Preencha todos os campos!');
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.margin-bottom {
  margin-bottom: 1.4em;
}
</style>
