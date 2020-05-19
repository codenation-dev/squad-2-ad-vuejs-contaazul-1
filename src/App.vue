<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~bulma/bulma";
@import url('https://fonts.googleapis.com/css?family=Rubik');

::-webkit-scrollbar {
  display: none;
}

.label-style {
  height: 14px;
  left: 0px;
  top: 0px;

  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 5px;

  color: #B0BAC9;

}

.big-title-style {
  width: 100%;

  font-family: Rubik;
  font-style: normal;
  font-weight: 300;
  font-size: 34px;
  text-align: left;

  color: #2E384D;
}

.description-style {
  left: calc(50% - 273px/2 - 23.5px);

  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 15px;
  line-height: 15px;
  text-align: left;

  color: #8798AD;
}

.button-style {
  color: #ffffff;
  background-color: #2E5BFF;
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
  color: #2E5BFF;
  text-decoration: underline;
}

.text-botton-style {
  font-size: 15px;
  color: #B0BAC9;
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
</style>
