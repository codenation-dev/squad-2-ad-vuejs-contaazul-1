<template>
  <div class="container">
    <label class="is-pulled-left label-style label-title-style">
      {{ title }}
    </label>
    <label class="is-pulled-right label-style">
      <slot/>
    </label>
    <input
      class="input"
      :placeholder="placeholder"
      :value="value"
      :class="{ 'is-danger': !$v.value[typeValidation] && value}"
      @input="$emit('input', $event.target.value)"
      :type="type"
    />
  </div>
</template>

<script>
import { email } from 'vuelidate/lib/validators';

export default {
  props: {
    placeholder: String,
    title: String,
    type: String,
    typeValidation: String,
    value: String,
  },
  validations: {
    value: {
      password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      email,
      name: (value) => /^([a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+\s+[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+)$/.test(value) && value.length >= 7 && value.length <= 50,
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
