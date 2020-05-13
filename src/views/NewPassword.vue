<template>
  <div>
    <form-image>
      <form-header title="Nova senha" subtitle="Insira a nova senha"/>
      <p class="control has-icons-left has-icons-right">
        <validation-input
          v-model="newPassword"
          title="Senha"
          placeholder="Insira a nova senha"
          type-validation="password"
          :type="passwordFieldType"
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
      <p class="control has-icons-left has-icons-right">
        <validation-input
          v-model="newPasswordConfirmation"
          title="Senha"
          placeholder="Insira sua senha"
          type-validation="password"
          :type="passwordFieldType"
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
      <div class="centered">
        <p class="label-style">
          Já possui uma conta? <router-link to="/login" class="click-link">Entre.</router-link>
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
