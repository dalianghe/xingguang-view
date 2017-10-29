<template>
  <div class="box">
    <p>
      <label>固定授信额度</label>
      <span>{{data.finalAmount | formatMoney}}</span>
    </p>
    <p>
      <label>可用额度</label>
      <span>{{data.unusedAmount | formatMoney}}</span>
    </p>
    <p>
      <label>已用额度</label>
      <span>{{data.usedAmount | formatMoney}}</span>
    </p>
  </div>
</template>

<script>

  export default {
    name: 'credit_info',
    data () {
      return {
        data: {}
      };
    },
    mounted: function () {
      this.getData();
    },
    methods: {
      getData: function (event) {
        var vm = this;
        this.$http.get('/credit/info')
          .then(function (response) {
            console.info( response.data);
            vm.data = response.data;
          })
          .catch(function (response) {
          });
      },
    }
  }
</script>

<style scoped>
  .box {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background-image: linear-gradient(0deg,
    rgba(248, 86, 151, 1) 0%,
    rgba(242, 80, 64, 1) 100%);
  }


  dt,dd{display: inline-block}
</style>
