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
          @click="sendLink()"
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
  methods: {
    sendLink() {
      if (!this.email) {
        this.$toasted.show('Preencha seu e-mail para continuar.', {
          position: 'top-center',
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

      this.$http.get(`http://localhost:3000/users/${this.email}`).catch(() => {
        this.$toasted.show('Erro de comunicação com a API. Tente novamente mais tarde.', {
          position: 'top-center',
          duration: 5000,
          action: {
            text: 'Fechar',
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },
          },
        });
      }).then((results) => {
        if (results.data) {
          this.$router.push({ name: 'NewPassword', params: { id: results.data.id } });
        } else {
          this.$toasted.show('O e-mail informado não pertence a nenhum usuário cadastrado.', {
            position: 'top-center',
            duration: 5000,
            action: {
              text: 'Fechar',
              onClick: (e, toastObject) => {
                toastObject.goAway(0);
              },
            },
          });
        }
      });
    },
  },
};
</script>
