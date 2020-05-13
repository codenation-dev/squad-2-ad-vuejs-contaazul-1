<template>
  <div>
    <form-image>
        <div class="margin-bottom">
          <p class="big-title-style is-pulled-left">Entre</p>
          <p class="description-style is-pulled-left">
            Por favor, entre com suas credenciais para continuar
          </p>
        </div>
        <validation-input
          v-model="email"
          title="Email"
          placeholder="email@exemplo.com"
          type="email"
          class="margin"
        />
        <validation-input
          v-model="password"
          title="Senha"
          placeholder="senha"
          type="password">
          Esqueceu sua senha?
        </validation-input>
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
      password: null,
    };
  },
};
</script>

<style lang="scss">
.margin {
  margin-top: 20px;
  margin-bottom: 20px;
}

.big-title-style {
  left: calc(50% - 273px/2 - 23.5px);
  width: 100%;

  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 34px;
  text-align: left;

  color: #2E384D;
}

.description-style {
  left: calc(50% - 273px/2 - 23.5px);

  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 15px;
  text-align: left;

  color: #8798AD;
}

.margin-bottom {
  margin-bottom: 100px;
}
</style>
