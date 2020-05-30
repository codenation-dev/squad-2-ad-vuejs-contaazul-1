<template>
  <div>
    <form-image>
      <form-header title="Nova senha" subtitle="Cadastre sua nova senha de acesso" />
      <validation-input
        v-model="newPassword"
        title="Nova senha"
        placeholder="Insira a nova senha"
        type-validation="password"
        class="margin-input"
        icon="fa-lock"
        @validation="passwordValidation"
        :doAction="changePassword"
      />
      <validation-input
        v-model="newPasswordConfirmation"
        title="Repetir nova senha"
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
        class="button is-primary is-fullwidth button-style margin-bottom"
        @click="changePassword"
        :disabled="disableButton"
      >
        Cadastrar nova senha
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
      newPassword: null,
      newPasswordConfirmation: null,
      passwordIsValid: false,
      newPasswordIsValid: false,
    };
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
      if (this.newPassword === this.newPasswordConfirmation && this.password !== null) {
        const payload = {
          password: this.newPassword,
        };

        this.$http
          .post(`users/${this.$route.params.id}/reset`, payload)
          .then(() => {
            this.useToast('Senha alterada com sucesso!', 'success');
            this.$router.push({ name: 'Login' });
          })
          .catch((error) => {
            this.useToast(error, 'error');
          });
      } else {
        this.useToast('As senhas devem ser iguais!', 'error');
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
