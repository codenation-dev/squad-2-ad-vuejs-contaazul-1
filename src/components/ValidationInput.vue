<template>
  <div class="container">
    <label class="is-pulled-left label-style label-title-style">
      {{ title }}
    </label>
    <label class="is-pulled-right label-style">
      <slot/>
    </label>
    <div
      class="control"
      :class="{ 'has-icons-right': isPassword, 'has-icons-left': icon !== null }"
    >
      <input
        class="input"
        :placeholder="placeholder"
        :value="value"
        :class="{ 'is-danger': !$v.value[typeValidation] && value }"
        @input="$emit('input', $event.target.value)"
        :type="passwordFieldType"
      />
      <span
        v-if="isPassword"
        class="icon
        is-right
        icon-click"
        @click="switchVisibility()">
        <i class="fas fa-eye"></i>
      </span>
      <span v-if="icon" class="icon is-small is-left">
        <i class="fas" :class="icon"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { email, sameAs } from 'vuelidate/lib/validators';

export default {
  props: {
    placeholder: String,
    title: String,
    typeValidation: String,
    value: String,
    icon: String,
    password: String,
  },
  data() {
    return {
      passwordFieldType: null,
    };
  },
  validations: {
    value: {
      password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      email,
      name: (value) => /^([a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s+[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+)$/.test(value) && value.length >= 7 && value.length <= 50,
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

<style>
.label-title-style {
  font-weight: 600;
  font-size: 12px;
  letter-spacing: 1.125px;
  text-transform: uppercase;
}

.input {
  background: rgba(224, 231, 255, 0.2);
}
</style>
