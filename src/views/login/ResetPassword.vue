<template>
  <div class="PasswordReset">
    <form-image>
      <form-header title="Esqueceu a senha?" subtitle="Insira seu email para redefinir a senha!" />
      <validation-input
        v-model="email"
        title="E-mail"
        placeholder="Insira seu e-mail"
        type-validation="email"
        class="margin-input"
        icon="fa-envelope"
        @validation="emailValidation"
        :doAction="sendLink"
        :showMessage="showMessage"
      />
      <button
        tabindex="2"
        class="button is-primary is-fullwidth button-syle"
        @click="sendLink()"
      >
        Redefinir senha
      </button>
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
      email: null,
      emailIsValid: false,
      showMessage: false,
    };
  },
  methods: {
    emailValidation(valid) {
      this.emailIsValid = valid;
    },
    sendLink() {
      if (this.email) {
        if (this.emailIsValid) {
          this.$http
            .get(`users/${this.email}`)
            .catch(() => {
              this.useToast('Erro de comunicação com a API. Tente novamente mais tarde.', 'error');
            })
            .then((results) => {
              if (results.data) {
                this.$router.push({
                  name: 'NewPassword',
                  params: { id: results.data.id },
                });
              } else {
                this.useToast('O e-mail informado não pertence a nenhum usuário cadastrado.', 'error');
              }
            });
        } else {
          this.showMessage = true;
        }
      } else {
        this.useToast('Preencha seu e-mail para continuar.');
      }
    },
  },
};
</script>
