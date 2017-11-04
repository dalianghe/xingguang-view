<template>
  <div class="box">
    <dl>
      <dt>提款额度</dt>
      <dd>
        <input type="type" v-model="data.amount"/>
      </dd>
    </dl>
    <dl>
      <dt>银行卡</dt>
      <dd>
        <select v-model="data.bankCardId">
          <option v-for="obj in bankCardOptions" :value="obj.id">{{obj.cusBankCard.bankName}}-{{obj.cusBankCard.cardNo}}</option>
        </select>
      </dd>
    </dl>
    <dl>
      <dt>预留手机号</dt>
      <dd>
        <input type="text" v-model="data.reservePhone"/>
      </dd>
    </dl>
    <button v-on:click="submit">确定</button>
  </div>
</template>

<script>
  var math = require('mathjs');
  export default {
    name: 'wdrl_apply',
    data() {
      return {
        data: {
        },
        bankCardOptions:{},
        productOptions:[],
        productTermOptions:[],
        productTermOptionsMap:{}
      }
    },
    mounted: function () {
      this.getBankCords();
    },
    methods: {
      getBankCords: function (event) {
        var vm = this;
        this.$http.get('/bank/cards')
        .then(function (response) {
          vm.bankCardOptions = response.data;
        })
      },
      /**
      //留着联动参考--开始--
      getProducts: function (event) {
        var vm = this;
        this.$http.get('/products')
          .then(function (response) {
            vm.productOptions = response.data;
            vm.$watch("data.productId", vm.setProductTermOptions);
            for(var product of vm.productOptions){
              let productTermInfoList = product.productTermInfoList;
              for(var term of productTermInfoList){
                term.rate = math.multiply(term.rate, 100);
              }
              vm.productTermOptionsMap[product.id] = product.productTermInfoList;
            }
          })
      },
      setProductTermOptions: function (newVal, oldVal) {
        var vm = this;
        vm.productTermOptions = vm.productTermOptionsMap[newVal];
      },
      //留着联动参考--结束--
      */
      submit: function (event) {
        var vm = this;
        this.$http.post('/wdrl/apply', vm.data)
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.$toast("提款申请已提交,请耐心等待!");
            }else if(response.bizCode == 1){
              vm.$toast("未发现授信记录!");
            }else if(response.bizCode == 2){
              vm.$toast("提款金额不能大于可用余额!");
            }else{
              vm.$toast("服务器繁忙!");
            }
          })
      }
    }
  }
</script>

<style scoped>
  dl, dr, dd {
    display: block;
  }
  dl {
    overflow: hidden;
    width: 400px;
  }
  dt {
    width: 60px;
    float: left;
  }
  dd {
    margin: 0;padding: 0;
    float: left;
  }

</style>
