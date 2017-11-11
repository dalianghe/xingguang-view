<template>
  <div class="box">
    <mt-popup
      class="mint-popup-width-full"
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <mt-picker :slots="slots" valueKey="name" @change="selectedBankCard"></mt-picker>
    </mt-popup>
    <div class="content clears">
      <div class="input">
        <dl>
          <dt>提款额度</dt>
          <dd>
            <input class="text" type="text" v-model="data.amount"/>
          </dd>
        </dl>
        <dl @click="selectBankCard">
          <dt >银行卡</dt>
          <dd>
            <input type="text" class="text" readonly="readonly" v-model="data.bankName"/>
            <input type="hidden" class="text" readonly="readonly" v-model="data.bankCardId"/>
          </dd>
        </dl>
        <dl>
          <dt>预留手机号</dt>
          <dd>
            <input class="text" type="text" v-model="data.reservePhone"/>
          </dd>
        </dl>
      </div>
    </div>
    <div class="btns">
      <div class="btnbox">
        <a v-on:click="submit">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
  var math = require('mathjs');
  export default {
    name: 'wdrl_apply',
    data() {
      return {
        popupVisible:false,
        data: {
        },
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1'
          }
        ]
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
          //obj.cusBankCard.bankName}}-{{obj.cusBankCard.cardNo

          for(var obj of response.data){
            vm.slots[0].values.push({"id": obj.cusBankCard.id, "name": obj.cusBankCard.bankName + "-" + obj.cusBankCard.cardNo});
          }
        })
      },
      selectBankCard : function(){
        this.popupVisible = true;
      },
      selectedBankCard : function(picker, values){
        if(!this.popupVisible){
          return;
        }
        if(picker.getValues()[0]){
          this.data.bankCardId = picker.getValues()[0].id;
          this.data.bankName = picker.getValues()[0].name;
        }
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
        vm.$indicator.open();
        this.$http.post('/wdrl/apply', vm.data)
          .then(function (response) {
            vm.$indicator.close();
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

</style>
