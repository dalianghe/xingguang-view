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
        <dl>
          <dt>收款账户</dt>
          <dd @click="selectBankCard">
            <input type="text" class="text" readonly="readonly" v-model="data.bankName"/>
            <div class="arrow arrow1"></div>
          </dd>
        </dl>
        <dl v-show="isInfoOk">
          <dt>个人信息</dt>
          <dd @click="goInfo">
            <input class="text textleft" type="text" readonly="readonly" placeholder="去完善"/>
            <div class="arrow arrow1"></div>
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
  export default {
    name: 'wdrl_apply',
    data() {
      return {
        popupVisible:false,
        isInfoOk: false,
        data: {},
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
      this.getInfo();
    },
    methods: {
      getBankCords: function (event) {
        var vm = this;
        this.$http.get('/bank/cards')
        .then(function (response) {
          for(var obj of response.data){
            vm.slots[0].values.push({"id": obj.cusBankCard.id, "name": obj.cusBankCard.bankName + "-" + obj.cusBankCard.cardNo});
          }
        })
      },
      getInfo: function (event) {
        var vm = this;
        this.$http.get('/cus/user/info')
          .then(function (response) {
            if (response.bizCode == 0) {
              if(!response.data.education){
                vm.isInfoOk = true;
              }
            }
          })
      },
      goInfo: function(){
        this.$router.push("/info");
      },
      selectBankCard : function(){
        var vm = this;
        if(vm.slots[0].values == 0){
          vm.$messagebox.confirm('您尚未绑定银行卡,前往绑定?').then(action => {
            vm.$router.push("/addbank");
          }).catch(err => {});
          return;
        }
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
