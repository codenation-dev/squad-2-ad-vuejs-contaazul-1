<template>
    <div class="margin-title-description">
      <p class="big-title-style is-pulled-left">{{ title }}</p>
      <p class="description-style is-pulled-left">{{ subtitle }}</p>
    </div>
</template>

<script>
export default {
  props: {
    title: String,
    subtitle: String,
  },
};
</script>

<style lang="scss">
.margin-title-description {
  margin-bottom: 110px;
}
</style>
