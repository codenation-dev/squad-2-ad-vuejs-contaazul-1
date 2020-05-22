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
import axios from 'axios';
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
        console.log('Preencha todas as informações.');
        return;
      }

      try {
        axios.get(`http://localhost:3000/users/${this.email}`).then((results) => {
          if (results.data) {
            console.log(results.data);
            this.$router.push({ name: 'NewPassword', params: { id: results.data.id } });
          } else {
            console.log('Email não pertence a nenhum usuário cadastrado.');
          }
        });
      } catch (err) {
        console.log('Erro de comunicação com a API.');
        console.log(err);
      }
    },
  },
};
</script>
