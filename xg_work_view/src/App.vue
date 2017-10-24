<template>
  <div>
    <transition name="root" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app'
  }
</script>

<style>
  body { margin:0; padding:0; -moz-box-sizing:border-box; box-sizing:border-box; outline:none;}

  .root-enter-active {
    animation: root-in .4s;
  }
  .root-leave-active {
    animation: root-in .2s reverse;
  }
  @keyframes root-in {
    0% {
      transform: scale(0);
    }

    85% {
      transform: scale(1.1);
    }

    100% {
      transform: scale(1);
    }
  }

</style>
