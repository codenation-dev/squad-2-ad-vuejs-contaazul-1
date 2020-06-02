<template>
  <div class="columns is-desktop">
    <div class="column span-title">
      <span>{{ title }}</span>
    </div>
    <div class="column">
      <div class="select is-4">
        <select :value="value" @change="$emit('input', $event.target.value)">
          <option :value="option.value" v-for="(option, index) in options" :key="index">
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
.column {
  flex-basis: auto;
}
.span-title {
  padding: 0px;
  margin: auto;
  text-transform: uppercase;
  font-size: 12px;
  text-align: center;
  color: #b0bac9;
}
.select {
  width: 100%;

  @media (min-width: 1024px) {
    border-radius: 2px;
    font-size: 0.75rem;
  }

  select {
    border-color: #e0e7ff;
    width: 100%;
  }
}
</style>
