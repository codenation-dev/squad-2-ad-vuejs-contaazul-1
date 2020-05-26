import Vue from 'vue';

Vue.filter('formatDate', (value) => {
  if (!value) return '';

  const formatDate = new Date(value);

  return formatDate.toLocaleString('pt-BR');
});
