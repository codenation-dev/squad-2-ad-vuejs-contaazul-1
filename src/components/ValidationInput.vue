<template>
  <div class="container">
    <label class="is-pulled-left label-style">
      {{ title }}
    </label>
    <label class="is-pulled-right label-slot-style">
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
.label-style {
  width: 41px;
  height: 14px;
  left: 0px;
  top: 0px;

  font-family: Rubik;
  font-style: normal;
  font-weight: 600;
  font-size: 12px;
  line-height: 5px;
  letter-spacing: 1.125px;
  text-transform: uppercase;

  color: #B0BAC9;
}

.label-slot-style {
  height: 14px;
  left: 0px;
  top: 0px;

  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 5px;

  text-align: right;

  color: #B0BAC9;

}

.input {
  background: rgba(224, 231, 255, 0.2);
}
</style>
