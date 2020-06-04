<template>
  <div class="Register">
    <form-image>
      <form-header title="Comece de graça" subtitle="E fique sempre de olho na sua aplicação" />
      <validation-input
        v-model="nome"
        title="Nome Completo"
        placeholder="Insira seu nome completo"
        type-validation="name"
        class="margin-input"
        icon="fa-user"
        @validation="nameValidation"
        :doAction="register"
        :showMessage="showMessage"
      />
      <validation-input
        v-model="email"
        title="Email"
        placeholder="Insira seu e-mail"
        type-validation="email"
        class="margin-input"
        icon="fa-envelope"
        @validation="emailValidation"
        :doAction="register"
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
        :doAction="register"
        :showMessage="showMessage"
      />
      <button
        tabindex="2"
        class="button is-primary is-fullwidth button-style margin-bottom"
        @click="register()"
      >
        Crie sua conta
      </button>
      <div class="centered">
        <p class="label-style">
          Já possui uma conta?
          <router-link to="/login" class="click-link" tabindex="3">
            Entre.
          </router-link>
        </p>
      </div>
    </form-image>
  </div>
</template>

<script>
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
      nome: null,
      email: null,
      password: null,
      nameIsValid: false,
      emailIsValid: false,
      passwordIsValid: false,
      showMessage: false,
    };
  },
  computed: {
    isValid() {
      return this.nameIsValid && this.emailIsValid && this.passwordIsValid;
    },
  },
  methods: {
    nameValidation(valid) {
      this.nameIsValid = valid;
    },
    emailValidation(valid) {
      this.emailIsValid = valid;
    },
    passwordValidation(valid) {
      this.passwordIsValid = valid;
    },
    register() {
      if (this.nome && this.email && this.password) {
        if (this.isValid) {
          this.$http
            .post('/users', {
              name: this.nome,
              email: this.email,
              password: this.password,
            })
            .catch(() => {
              this.useToast('Erro de comunicação com a API. Tente novamente mais tarde.', 'error');
            })
            .then(() => {
              this.useToast('Cadastro realizado com sucesso! Faça login para continuar.', 'success');
              this.$router.push({ name: 'Login' });
            });
        } else {
          this.showMessage = true;
        }
      } else {
        this.useToast('Preencha todas as informações para continuar.');
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
