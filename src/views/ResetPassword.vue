<template>
  <div class="PasswordReset">
    <form-image>
      <form-header
        title="Esqueceu a senha?"
        subtitle="Insira seu email para redefinir a senha!"
      />
      <validation-input
        v-model="email"
        title="Email"
        placeholder="Insira seu e-mail"
        type-validation="email"
        class="margin-input"
        icon="fa-envelope"
        @validation="emailValidation"
        :doAction="sendLink"
      />
      <button
        tabindex="2"
        class="button
          is-link
          is-fullwidth
          button-syle"
        :disabled="!emailIsValid"
        @click="sendLink()"
      >
        Redefinir senha
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
      emailIsValid: false,
    };
  },
  methods: {
    emailValidation(valid) {
      this.emailIsValid = valid;
    },
    sendLink() {
      if (!this.email) {
        this.$toasted.show('Preencha seu e-mail para continuar.', {
          position: 'bottom-left',
          duration: 5000,
          action: {
            text: 'Fechar',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
        return;
      }

      this.$http
        .get(`users/${this.email}`)
        .catch(() => {
          this.$toasted.show(
            'Erro de comunicação com a API. Tente novamente mais tarde.',
            {
              position: 'bottom-left',
              duration: 5000,
              type: 'error',
              action: {
                text: 'Fechar',
                onClick: (e, toastObject) => {
                  toastObject.goAway(0);
                },
              },
            },
          );
        })
        .then((results) => {
          if (results.data) {
            this.$router.push({
              name: 'NewPassword',
              params: { id: results.data.id },
            });
          } else {
            this.$toasted.show(
              'O e-mail informado não pertence a nenhum usuário cadastrado.',
              {
                position: 'bottom-left',
                duration: 5000,
                type: 'error',
                action: {
                  text: 'Fechar',
                  onClick: (e, toastObject) => {
                    toastObject.goAway(0);
                  },
                },
              },
            );
          }
        });
    },
  },
};
</script>
