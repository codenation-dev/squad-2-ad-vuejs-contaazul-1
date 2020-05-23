<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  metaInfo: {
    title: 'Cricket Gate',
    titleTemplate: '%s - Sistema de tracking de erros',
  },
};
</script>

<style lang="scss">
@import '~bulma/bulma';

@font-face {
  font-family: 'Roboto';
  src: url('./assets/fonts/Roboto-Regular.eot');
  src: local('Roboto'), local('Roboto-Regular'),
    url('./assets/fonts/Roboto-Regular.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Roboto-Regular.woff2') format('woff2'),
    url('./assets/fonts/Roboto-Regular.woff') format('woff'),
    url('./assets/fonts/Roboto-Regular.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/fonts/Roboto-Light.eot');
  src: local('Roboto Light'), local('Roboto-Light'),
    url('./assets/fonts/Roboto-Light.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Roboto-Light.woff2') format('woff2'),
    url('./assets/fonts/Roboto-Light.woff') format('woff'),
    url('./assets/fonts/Roboto-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Roboto';
  src: url('./assets/fonts/Roboto-Bold.eot');
  src: local('Roboto Bold'), local('Roboto-Bold'),
    url('./assets/fonts/Roboto-Bold.eot?#iefix') format('embedded-opentype'),
    url('./assets/fonts/Roboto-Bold.woff2') format('woff2'),
    url('./assets/fonts/Roboto-Bold.woff') format('woff'),
    url('./assets/fonts/Roboto-Bold.ttf') format('truetype');
  font-weight: bold;
  font-style: normal;
  font-display: swap;
}

html,
body {
  font-family: 'Roboto', sans-serif;
  min-height: 100vh;
}

.main {
  min-height: 100vh;
  background-color: #f4f6fc;
}

::-webkit-scrollbar {
  display: none;
}

.label-style {
  height: 14px;
  left: 0px;
  top: 0px;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 5px;
  color: #b0bac9;
}

.big-title-style {
  width: 100%;
  font-style: normal;
  font-weight: 300;
  font-size: 34px;
  text-align: left;
  color: #2e384d;
}

.description-style {
  left: calc(50% - 273px / 2 - 23.5px);
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 15px;
  text-align: left;
  color: #8798ad;
}

.button-style {
  color: #ffffff;
  background-color: #2e5bff;
  margin-top: 15px;
}

.icon-click {
  pointer-events: initial !important;
  cursor: pointer;
  padding: 1px;
}

.click-link {
  color: #8798ad;
}

.click-link:hover {
  color: #2e5bff;
  text-decoration: underline;
}

.text-botton-style {
  font-size: 15px;
  color: #b0bac9;
  margin-top: 5px;
}

.margin-input {
  margin-top: 20px;
  margin-bottom: 20px;
}

.centered {
  text-align: center;
  margin-top: 10px;
}

.page-header {
  margin-top: 1em;
  margin-bottom: 1em;
}

.page-header--title {
  font-size: 1.75rem;
  font-weight: 300;
}

.page-header--badge {
  color: #8798ad;
  font-style: italic;
  font-size: 1.125rem;
  margin-bottom: -0.25em;
}

.toast-error {
  background: red !important;
}
</style>
