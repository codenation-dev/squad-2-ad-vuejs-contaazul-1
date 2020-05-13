<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~bulma/bulma";
@import url('https://fonts.googleapis.com/css?family=Rubik');

.label-style {
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
</style>
