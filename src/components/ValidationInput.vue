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
      :class="{ 'is-danger': !$v.value[type] && value}"
      @input="$emit('input', $event.target.value)"
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
    value: String,
  },
  validations: {
    value: {
      password: (value) => /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(value),
      email,
    },
  },
};
</script>

<style>
.label-title-style {
  width: 41px;

  font-weight: 600;
  font-size: 12px;
  letter-spacing: 1.125px;
  text-transform: uppercase;
}

.input {
  background: rgba(224, 231, 255, 0.2);
}
</style>
