<template>
  <div class="box">
    <div class="contentC">
      <div class="total">
        <label>授信额度</label>
        <span>{{data.finalAmount | formatMoney}}</span>
      </div>
      <div class="other">
        <div class="left">
          <label>可用额度</label>
          <span>{{data.unusedAmount | formatMoney}}</span>
        </div>
        <div class="right">
          <label>已用额度</label>
          <span>{{data.usedAmount | formatMoney}}</span>
        </div>
      </div>
    </div>

    <router-link to="wdrlapply" class="button">
      立即提款
    </router-link>

    <div class="logo2">
      <div class="bottom">
        <label class="tag" @click="cleanToken">无担保</label>
        <label class="tag1"></label>
        <label class="tag">无抵押</label>
        <label class="tag1"></label>
        <label class="tag">纯信用</label>
        <label class="tag1"></label>
        <label class="tag">审批快</label>
        <label class="tag1"></label>
        <label class="tag">利率低</label>
      </div>
    </div>
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
    z-index: -2;
  }
  .box .contentC{
    width: 15rem;
    margin: 0 auto;
    margin-top: 9rem;
    color: #FFFFFF;
    text-align: center;
    font-family: 	Microsoft YaHei;
  }
  .box .contentC .total{
    font-size: 1.5rem;
  }

  .box .contentC .total label{
    display: block;
  }
  .box .contentC .total span{
    margin-top: 0.3rem;
    display: block;
  }
  .box .contentC .other{
    margin-top: 2rem;
  }
  .box .contentC .other .left{
    float: left;
    width: 48%;
  }
  .box .contentC .other .rigth{
    float: right;
    width: 48%;
  }
  .box .contentC .other label{
    display: block;
  }
  .box .contentC .other span{
    margin-top: 0.2rem;
    display: block;
  }

  .box .button{
    display: block;
    text-align: center;
    color: #ffffff;
    line-height: 2.6rem;
    font-size: 1.2rem;
    background-image: linear-gradient(
      rgba(245, 90, 92, 0.3),
      rgba(245, 90, 92, 0.3)),
    linear-gradient(
      #ff77b4,
      #ff77b4);
    background-blend-mode: color-dodge,
    normal;
    box-shadow: 0px 7px 0px 0px
    rgba(224, 59, 107, 0.4),
    inset -3px 3px 0px 0px
    rgba(255, 226, 242, 0.6);
    border-radius: 2rem;
    margin: 0 auto;
    margin-top: 5rem;
    width: 17rem;
    height: 2.5rem;
  }

  .box .logo2{
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 10rem;
    background:url(/static/cus/img/register/logo2.png) no-repeat center center;
    background-size: 100% auto;
    vertical-align:bottom;
    z-index: -1;
  }

  .box .logo2 .bottom{
    position: absolute;
    bottom: 1.2rem;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    align-content: center;
    text-align:center;
  }

  .box .logo2 .bottom .tag{
    display: inline-block;
    letter-spacing: 0px;
    color: #ffedf4;
    width: 3.6rem;
  }

  .box .logo2 .bottom .tag1{
    display: inline-block;
    height: 0.6rem;
    border-left: 1px solid #ffedf4;
  }

  dt,dd{display: inline-block}
</style>
