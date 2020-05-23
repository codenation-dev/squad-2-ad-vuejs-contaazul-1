<template>
  <div class="PasswordReset">
    <form-image>
      <form-header
        title="Esqueceu a senha?"
        subtitle="Email para receber o link de redefinição"
      />
      <validation-input
        v-model="email"
        title="Email"
        placeholder="Insira seu e-mail"
        type-validation="email"
        class="margin-input"
        icon="fa-envelope"
      />
      <button
        class="button
          is-link
          is-fullwidth
          button-syle"
      >
        Enviar link de reset
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
      email: null,
    };
  },
};
</script>
