<template>
  <div>
    <form-image>
      <validation-input
        v-model="value"
        title="Email"
        placeholder="email@exemplo.com"
        type="email"
        class="margin"
      />
      <validation-input v-model="value" title="Senha" placeholder="senha" type="password"/>
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
      value: null,
    };
  },
};
</script>

<style lang="scss">
.margin {
  margin-bottom: 20px;
}
</style>
