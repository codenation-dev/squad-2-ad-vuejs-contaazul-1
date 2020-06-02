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

$primary-blue: #2e5bff;
$yellow: #eacb1b;

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

@mixin break-large {
  @media (min-width: 1024px) {
    @content;
  }
}

html,
body {
  font-family: 'Roboto', sans-serif;
  color: #2e384d;
  min-height: 100vh;
}

.main {
  min-height: 100vh;
  background-color: #f4f6fc;

  @include break-large {
    padding-bottom: 60px;
    position: relative;
  }
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

.medium-title-style {
  width: 100%;
  font-style: normal;
  font-weight: 300;
  font-size: 28px;
  text-align: left;
  color: #2e384d;
}

.small-title-style {
  width: 100%;
  font-style: normal;
  font-weight: 300;
  font-size: 22px;
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
  background-color: $primary-blue;
  margin-top: 15px;
}

.button-wrapper {
  display: flex !important;
  align-items: center !important;
  margin-right: 10px;
}

.icon-click {
  pointer-events: initial !important;
  cursor: pointer;
  padding: 1px;
}

.input {
  border-color: #e0e7ff;
}

.click-link {
  color: #8798ad;
}

.click-link:hover {
  color: $primary-blue;
  text-decoration: underline;
}

.text-botton-style {
  font-size: 15px;
  color: #b0bac9;
  margin-top: 5px;
}

.image-style-404 {
  margin-top: 10%;
  object-fit: contain !important;
  width: 100%;
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

.button.is-primary {
  background-color: $primary-blue;
  border-color: #1057bf;
  color: #fff;

  &:hover,
  .is-hover {
    background-color: #0c40ff;
    border-color: #0d49a0;
  }

  &:focus,
  .is-focus {
    box-shadow: 0 0 0 0.125em rgba(46, 91, 255, 0.25);
  }

  &:active,
  .is-active {
    background-color: #0032e9;
    border-color: #0b3a80;
  }

  &:disabled {
    background-color: #5076ff;
    border-color: #1365de;
  }
}

.button.is-danger {
  background-color: #e84a50;
  border-color: #bb242a;
  color: #fff;

  &:hover,
  .is-hover {
    background-color: #e42c33;
    border-color: #9f1f24;
  }

  &:focus,
  .is-focus {
    box-shadow: 0 0 0 0.125em rgba(232, 74, 80, 0.25);
  }

  &:active,
  .is-active {
    background-color: #d31b22;
    border-color: #82191d;
  }
}

.button.is-info {
  background-color: #8097b1;
  border-color: #8798ad;
  color: #fff;

  &:hover,
  .is-hover {
    background-color: #6b86a4;
    border-color: #73879f;
  }

  &:focus,
  .is-focus {
    box-shadow: 0 0 0 0.125em rgba(128, 151, 177, 0.25);
  }

  &:active,
  .is-active {
    background-color: #5a7593;
    border-color: #61768f;
  }
}
.is-min-width-fit-content {
  min-width: fit-content;
}

.footer {
  padding: 1rem;
  text-align: center;
  background-color: #fff;

  @include break-large {
    height: 60px;
    position: absolute;
    width: 100%;
    bottom: 0;
  }
}
</style>
