<template>
  <div class="Register">
    <form-image>
      <form-header
        title="Comece de graça"
        subtitle="Insira seu e-mail abaixo e mandaremos um link para resetar sua senha."
      />
      <validation-input
        v-model="nome"
        title="Nome Completo"
        placeholder="Insira seu nome completo"
        type-validation="name"
        icon="fa-user"
      />
      <validation-input
        v-model="email"
        title="Email"
        placeholder="Insira seu e-mail"
        type-validation="email"
        class="margin-input"
        icon="fa-envelope"
      />
      <validation-input
        v-model="password"
        title="Senha"
        placeholder="Insira sua senha"
        type-validation="password"
        class="margin-input"
        icon="fa-lock"
      />
      <button
        class="button
        is-link
        is-fullwidth
        button-style"
      >
        Crie sua conta
      </button>
      <div class="centered">
        <p class="label-style">
          Já possui uma conta?
          <router-link to="/login" class="click-link">Entre.</router-link>
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
      nome: null,
      email: null,
      password: null,
    };
  },
};
</script>
