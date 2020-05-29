<template>
  <div>
    <form-image>
      <form-header title="Nova senha" subtitle="Insira a nova senha" />
      <validation-input
        v-model="newPassword"
        title="Senha"
        placeholder="Insira a nova senha"
        type-validation="password"
        class="margin-input"
        icon="fa-lock"
        @validation="passwordValidation"
        :doAction="changePassword"
      />
      <validation-input
        v-model="newPasswordConfirmation"
        title="Senha"
        placeholder="Insira novamente a nova senha"
        type-validation="newPassword"
        :password="newPassword"
        class="margin-input"
        icon="fa-lock"
        @validation="newPasswordValidation"
        :doAction="changePassword"
      />
      <button
        tabindex="2"
        class="button
        is-link
        is-fullwidth
        button-style
        margin-bottom"
        @click="changePassword"
        :disabled="disableButton"
      >
        Cadastre nova senha
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
      newPassword: null,
      newPasswordConfirmation: null,
      passwordIsValid: false,
      newPasswordIsValid: false,
    };
  },
  props: {
    id: String,
  },
  computed: {
    disableButton() {
      return !(this.passwordIsValid && this.newPasswordIsValid);
    },
  },
  methods: {
    passwordValidation(valid) {
      this.passwordIsValid = valid;
    },
    newPasswordValidation(valid) {
      this.newPasswordIsValid = valid;
    },
    changePassword() {
      if (
        this.newPasswordConfirmation === this.newPassword
        && this.newPassword !== null
      ) {
        const payload = {
          password: this.newPassword,
        };

        this.$http
          .post(`users/${this.id}/reset`, payload)
          .then(() => {
            this.$toasted.show('Senha alterada com sucesso!', {
              theme: 'toasted-primary',
              position: 'bottom-left',
              duration: 5000,
              type: 'success',
              action: {
                text: 'Fechar',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            });

            this.$router.push({ name: 'Login' });
          })
          .catch((error) => this.$toasted.show(error, {
            theme: 'toasted-primary',
            position: 'bottom-left',
            duration: 5000,
            action: {
              text: 'Fechar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          }));
      } else {
        this.$toasted.show('As senhas devem ser iguais!', {
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
  .margin-bottom {
    margin-bottom: 1.4em;
  }
</style>
