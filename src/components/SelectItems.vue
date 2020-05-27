<template>
  <div class="columns">
    <div class="column span-title">
      <span>{{ title }}</span>
    </div>
    <div class="column">
      <div class="select is-small is-4">
        <select :value="value" @change="$emit('input', $event.target.value)">
          <option v-for="(option, index) in options" :key="index">
            {{ option.description }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    value: String,
    options: Array,
  },
};
</script>

<style lang="scss">
.span-title {
  padding: 0px;
  margin: auto;
  text-transform: uppercase;
  font-size: 12px;
  text-align: center;
  color: #b0bac9;
}
</style>
