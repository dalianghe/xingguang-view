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
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0rem;
    font-size: 1rem;
    font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif, "宋体";
  }
  dt,dd{display: inline-block}
</style>
