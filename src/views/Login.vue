<template>
  <div>
    <form-image>
      <form-header
        title="Entre"
        subtitle="Por favor, entre com suas credenciais para continuar."
      />
      <validation-input
        v-model="email"
        title="Email"
        placeholder="Insira seu e-mail"
        type-validation="email"
        class="margin-input"
        icon="fa-envelope"
        @validation="emailValidation"
        :doAction="doLogin"
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
      >
        <router-link class="click-link" to="/reset-password" tabindex="2"
          >Esqueceu sua senha?</router-link
        >
      </validation-input>
      <button
        tabindex="1"
        class="button
        is-link
        is-fullwidth
        button-style
        margin-bottom"
        @click="doLogin"
        :disabled="disableButton"
      >
        Entre
      </button>
      <div class="centered">
        <p class="label-style" >
          Não tem uma conta?
          <router-link class="click-link" to="/register" tabindex="2"
            >Cadastre-se</router-link
          >
        </p>
      </div>
    </form-image>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
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
      emailIsValid: false,
      passwordIsValid: false,
    };
  },
  computed: {
    disableButton() {
      return !(this.emailIsValid && this.passwordIsValid);
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
        const payload = {
          email: this.email,
          password: this.password,
        };

        this.$http.post('/users/login', payload)
          .then(({ data }) => {
            if (data === 'Usuário ou senha incorretos') {
              this.$toasted.show(data, {
                theme: 'toasted-primary',
                position: 'bottom-left',
                duration: 5000,
                type: 'error',
                action: {
                  text: 'Fechar',
                  onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                  },
                },
              });
            } else {
              this.login(data);
              this.$router.push({ name: 'ErrorHome' });
            }
          })
          .catch((error) => this.$toasted.show(error, {
            theme: 'toasted-primary',
            position: 'bottom-left',
            duration: 5000,
            type: 'error',
            action: {
              text: 'Fechar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          }));
      } else {
        this.$toasted.show('Preencha todos os campos!', {
          theme: 'toasted-primary',
          position: 'bottom-left',
          duration: 5000,
          action: {
            text: 'Fechar',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.margin-bottom{
  margin-bottom:1.4em;
}
</style>
