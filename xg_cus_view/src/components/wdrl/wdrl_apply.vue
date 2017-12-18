<template>
  <div class="box">
    <mt-popup
      class="mint-popup-width-full"
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <div class="selectbt">
        <div class="qx" @click="selectQX">取消</div>
        <div class="qd" @click="selectQD">确定</div>
      </div>
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
    <div class="xybox">
      <div class="unxieyi" v-bind:class="{ xieyi: xyFlag }" @click="xyChange"></div>
      <router-link to="/explain/agreement/a2">我已阅读本协议</router-link>
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
        xyFlag:true,
        data: {amount:"", bankCardId:"", bankName:""},
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1'
          }
        ],
        bankCardId:"",
        bankName:""
      }
    },
    created: function(){
      this.data.workUserId = this.$route.params.key;
    },
    mounted: function () {
      this.setInit();
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
      setInit: function(){
        let wdrlAmount = sessionStorage.getItem("t_wdrl_apply_amount");
        if(wdrlAmount){
          this.data.amount = wdrlAmount;
        }
        let wdrlBankCardId = sessionStorage.getItem("t_wdrl_apply_bankCardId");
        if(wdrlBankCardId){
          this.data.bankCardId = wdrlBankCardId;
          this.data.bankName = sessionStorage.getItem("t_wdrl_apply_bankName");
        }
        sessionStorage.removeItem("t_wdrl_apply_amount");
        sessionStorage.removeItem("t_wdrl_apply_bankCardId");
        sessionStorage.removeItem("t_wdrl_apply_bankName");
      },
      goInfo: function(){
        sessionStorage.setItem("t_wdrl_apply_amount", this.data.amount);
        sessionStorage.setItem("t_wdrl_apply_bankCardId", this.data.bankCardId);
        sessionStorage.setItem("t_wdrl_apply_bankName", this.data.bankName);
        this.$router.push("/info");
      },
      selectBankCard : function(){
        event.target.blur();
        var vm = this;
        if(vm.slots[0].values == 0){
          vm.$messagebox.confirm('您尚未绑定银行卡,前往绑定?').then(action => {
            sessionStorage.setItem("t_wdrl_apply_amount", this.data.amount);
            vm.$router.push("/addbank");
          }).catch(err => {});
          return;
        }
        if(this.data.bankCardId == "" || this.data.bankCardId == null){
          this.bankCardId = this.slots[0].values[0].id;
          this.bankName = this.slots[0].values[0].name;
        }else{
          this.bankCardId = this.data.bankCardId;
          this.bankName = this.data.bankName;
        }

        this.popupVisible = true;
      },
      selectQD: function(){
        this.data.bankCardId = this.bankCardId;
        this.data.bankName = this.bankName;
        this.popupVisible = false;
      },
      selectQX: function(){
        this.popupVisible = false;
      },
      selectedBankCard : function(picker, values){
        if(!this.popupVisible){
          return;
        }
        if(picker.getValues()[0]){
          this.bankCardId = picker.getValues()[0].id;
          this.bankName = picker.getValues()[0].name;
        }
      },
      submit: function (event) {
        if(!this.validate()){
          return;
        }
        var vm = this;
        vm.$indicator.open();
        this.$http.post('/wdrl/apply', vm.data)
          .then(function (response) {
            vm.$indicator.close();
            if (response.bizCode == 0) {
              vm.$toast("提款申请已提交,请耐心等待!");
              vm.$router.push("/common/ok/my");
            }else if(response.bizCode == 1){
              vm.$toast("未发现授信记录!");
            }else if(response.bizCode == 2){
              vm.$toast("提款金额不能大于可用余额!");
            }else{
              vm.$toast("服务器繁忙!");
            }
          })
      },
      xyChange: function(){
        this.xyFlag = !this.xyFlag;
      },
      validate : function(){
        var vm = this;
        if(this.$tools.isNull(vm.data.amount)){
          vm.$toast("请填写提款金额");
          return false;
        }
        if(this.$tools.isNull(vm.data.bankName)){
          vm.$toast("请选择账户");
          return false;
        }
        if(!vm.xyFlag){
          vm.$toast("您未同意本协议");
          return;
        }
        return true;
      }
    }
  }
</script>

<style scoped>
  .xybox{
    margin-top: 0.5rem;
    margin-left: 1rem;
    font-size: 0.5rem;
  }

  .unxieyi{
    display: inline-block;
    height: 0.6rem;
    width: 0.6rem;
    margin-top: -0.4rem;
    margin-right: 0.3rem;
    background:url(/static/cus/img/c_bgx.png) no-repeat center center;
    background-size: contain;
  }

  .xieyi{
    background:url(/static/cus/img/c_gx.png) no-repeat center center;
    background-size: contain;
  }
</style>
