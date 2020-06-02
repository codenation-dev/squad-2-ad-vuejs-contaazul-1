<template>
  <div class="margin-title-description">
    <p class="big-title-style">{{ title }}</p>
    <p class="description-style">{{ subtitle }}</p>
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
