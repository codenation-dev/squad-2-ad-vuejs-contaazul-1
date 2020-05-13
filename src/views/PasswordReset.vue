<template>
    <div class="PasswordReset">
      <form-image>
        <div class="margin-bottom">
          <p class="big-title-style is-pulled-left">Esqueceu a senha?</p>
          <p class="description-style is-pulled-left">Email para receber o link de redefinição</p>
        </div>
        <p class="control has-icons-left">
          <validation-input
            v-model="email"
            title="Email"
            placeholder="Insira seu e-mail"
            type="email"
            class="margin"
          />
          <span class="icon is-left icon-position">
            <i class="fas fa-envelope"></i>
          </span>
        </p>
        <!-- Adicionar router /reset-password-->
        <button
          class="button
          is-link
          is-fullwidth
          style-button"
        >
          Enviar link de reset
        </button>
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
    };
  },
};
</script>
