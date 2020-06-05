<template>
  <div class="hollow-dots-spinner">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</template>

<style lang="scss" scoped>
.hollow-dots-spinner,
.hollow-dots-spinner * {
  box-sizing: border-box;
}

.hollow-dots-spinner {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3em 0;

  .dot {
    width: 15px;
    height: 15px;
    margin: 0 calc(15px / 2);
    border: calc(15px / 5) solid #2e5bff;
    border-radius: 50%;
    float: left;
    transform: scale(0);
    animation: hollow-dots-spinner-animation 1000ms ease infinite 0ms;

    &:nth-child(1) {
      animation-delay: calc(300ms * 1);
    }

    &:nth-child(2) {
      animation-delay: calc(300ms * 2);
    }

    &:nth-child(3) {
      animation-delay: calc(300ms * 3);
    }
  }
}

@keyframes hollow-dots-spinner-animation {
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
