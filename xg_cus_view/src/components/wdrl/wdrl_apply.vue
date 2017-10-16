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
    <dl>
      <dt>产品</dt>
      <dd>
        <select v-model="data.productId">
          <option v-for="obj in productOptions" :value="obj.id">{{obj.name}}</option>
        </select>
      </dd>
    </dl>

    <button v-on:click="submit">确定</button>
  </div>
</template>

<script>

  export default {
    name: 'credit_apply',
    data() {
      return {
        data: {
        },
        bankCardOptions:{},
        productOptions:{}
      }
    },
    mounted: function () {
      this.getBankCords();
      this.getProducts();
    },
    methods: {
      getBankCords: function (event) {
        var vm = this;
        this.$http.get('/bank/cards')
        .then(function (response) {
          vm.bankCardOptions = response.data;
        })
      },
      getProducts: function (event) {
        var vm = this;
        this.$http.get('/products')
          .then(function (response) {
            vm.productOptions = response.data;
          })
      },
      submit: function (event) {
        var vm = this;
        this.$http.post('/credit/apply', vm.data)
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.$toast("授信申请已提交,请耐心等待!");
            }else{
              vm.$toast(response.msg);
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
