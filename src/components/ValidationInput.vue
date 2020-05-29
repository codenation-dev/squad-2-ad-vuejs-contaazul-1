<template>
  <div class="container" tabindex="-1">
    <label class="is-pulled-left label-style label-title-style">
      {{ title }}
    </label>
    <label class="is-pulled-right label-style">
      <slot />
    </label>
    <div
      class="control"
      :class="{
        'has-icons-right': isPassword,
        'has-icons-left': icon !== null,
      }"
    >
      <input
        tabindex="1"
        class="input"
        :placeholder="placeholder"
        :value="value"
        :class="{ 'is-danger': !$v.value[typeValidation] && value }"
        @input="$emit('input', $event.target.value)"
        :type="passwordFieldType"
        @keypress.enter="doAction"
      />
      <span
        v-if="isPassword"
        class="icon
        is-right
        icon-click"
        @click="switchVisibility()"
      >
        <img class="icon-image" src="../img/eye.png" v-if="passwordFieldType === 'password'" />
        <img class="icon-image" src="../img/eye-slash.png" v-else />
      </span>
      <span v-if="icon" class="icon is-small is-left">
        <i class="fas" :class="icon"></i>
      </span>

      <div class="error" v-if="!$v.value[typeValidation] && value">
        {{ messages[typeValidation] }}
      </div>
    </div>
  </div>
</template>

<script>
import { email, sameAs } from 'vuelidate/lib/validators';

const nameRegex = /^([a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s+[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+)$/;

export default {
  props: {
    placeholder: String,
    title: String,
    typeValidation: String,
    value: String,
    icon: String,
    password: String,
    doAction: Function,
  },
  data() {
    return {
      passwordFieldType: null,
      messages: {
        password:
          'No mínimo 8 caracteres. Requer letra maíuscula, minúscula e pelo menos um número.',
        name: 'Digite seu nome completo.',
        email: 'E-mail inválido.',
      },
    };
  },
  watch: {
    value() {
      this.$emit('validation', this.$v.value[this.typeValidation]);
    },
  },
  validations: {
    value: {
      password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      email,
      name: (value) => nameRegex.test(value) && value.length >= 7 && value.length <= 50,
      newPassword: sameAs('password'),
    },
  },
  computed: {
    isPassword() {
      return this.typeValidation === 'password' || this.typeValidation === 'newPassword';
    },
  },
  created() {
    this.passwordFieldType = this.isPassword ? 'password' : 'text';
  },
  methods: {
    switchVisibility() {
      this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password';
    },
  },
};
</script>

<style lang="scss" scoped>
.label-title-style {
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 1.125px;
  text-transform: uppercase;
}

.input {
  background: rgba(224, 231, 255, 0.2);
}

.icon-image {
  width: 20px;
  height: 20px;
  opacity: 0.7;
}

.error {
  font-size: 14px;
  color: red;
}
</style>
