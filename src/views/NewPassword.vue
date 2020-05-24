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
      />
      <validation-input
        v-model="newPasswordConfirmation"
        title="Senha"
        placeholder="Insira novamente a nova senha"
        type-validation="newPassword"
        :password="newPassword"
        class="margin-input"
        icon="fa-lock"
      />
      <div class="centered">
        <p class="label-style">
          Já possui uma conta?
          <router-link to="/login" class="click-link">Entre.</router-link>
        </p>
      </div>
      <button
        class="button
        is-link
        is-fullwidth
        button-style"
      >
        Cadastre nova senha
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
      newPassword: null,
      newPasswordConfirmation: null,
    };
  },
};
</script>
