<template>
  <div class="container">
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
        class="icon is-right icon-click"
        @click.stop="switchVisibility()"
        :class="passwordFieldType"
      >
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
      icons: {
        eye: '../../assets/img/eye.png',
        eyeSlash: '../../assets/img/eye-slash.png',
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

.control {
  .input {
    background: rgba(224, 231, 255, 0.2);
    border-color: #e0e7ff;
  }
  .icon {
    color: #728aa6;
    opacity: 0.5;

    &.icon-click {
      &:hover {
        opacity: 1;
      }

      &:before {
        font-family: 'Font Awesome 5 Free';
        font-weight: 900;
        display: inline-block;
        text-rendering: auto;
        line-height: 1;
        margin-left: 0.3rem;
      }

      &.password::before {
        content: '\f06e';
      }

      &.text::before {
        content: '\f070';
      }
    }
  }
}

.error {
  font-size: 14px;
  color: red;
}
</style>
