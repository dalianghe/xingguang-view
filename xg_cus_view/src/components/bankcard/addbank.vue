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
      <mt-picker class="remember" :slots="slots" valueKey="name" @change="selectedBank"></mt-picker>
    </mt-popup>
    <div class="content clears">
      <div class="input">
        <dl>
          <dt>开户银行</dt>
          <dd @click="selectBank">
            <input type="text" class="text" placeholder="请选择银行" readonly="readonly" v-model="data.bankName"/>
            <div class="arrow arrow1"></div>
          </dd>
        </dl>
        <dl>
          <dt>银行卡号</dt>
          <dd>
            <input type="text" class="text" placeholder="请输入银行卡卡号" v-model="data.cardNo"/>
          </dd>
        </dl>
        <dl>
          <dt>预留手机号</dt>
          <dd>
            <input type="text" class="text" placeholder="请输入预留手机号" v-model="data.phone"/>
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
    name: 'addbank',
    data() {
      return {
        popupVisible:false,
        data: {},
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1'
          }
        ],
        pickerKey:"",
        pickerName:""
      };
    },
    mounted: function () {
      this.getBanks();
    },
    methods: {
      selectBank : function(){
        event.target.blur();
        if(this.data.bankId == "" || this.data.bankId == null){
          this.pickerKey = this.slots[0].values[0].id;
          this.pickerName = this.slots[0].values[0].name;
        }else{
          this.pickerKey = this.data.bankId;
          this.pickerName = this.data.bankName;
        }
        this.popupVisible = true;
      },
      selectQD: function(){
        this.data.bankId = this.pickerKey;
        this.data.bankName = this.pickerName;
        this.popupVisible = false;
      },
      selectQX: function(){
        this.popupVisible = false;
      },
      selectedBank : function(picker, values){
        if(!this.popupVisible){
          return;
        }
        if(picker.getValues()[0]){
          this.pickerKey = picker.getValues()[0].id;
          this.pickerName = picker.getValues()[0].name;
        }
      },
      getBanks: function (event) {
        var vm = this;
        this.$http.get('/banks')
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.slots[0].values = response.data;
            }
          })
          .catch(function (response) {
          });
      },

      submit: function (event) {
        if(!this.validate()){
          return;
        }
        var vm = this;
        console.info(vm.$data.data.bankId);
        vm.$indicator.open();
        this.$http.post('/bank/cards', vm.$data.data)
          .then(function (response) {
            vm.$indicator.close();
            if (response.bizCode == 1) {
              vm.$toast("银行卡已存在");
            } else {
              vm.$toast("银行卡绑定成功");
              vm.$router.go(-1);
            }
          })
          .catch(function (response) {
          });
      },
      validate : function(){
        var vm = this;
        if(this.$tools.isNull(vm.data.bankName)){
          vm.$toast("请选择银行");
          return false;
        }
        if(this.$tools.isNull(vm.data.cardNo)){
          vm.$toast("请填写银行卡号");
          return false;
        }
        if(this.$tools.isNull(vm.data.phone)){
          vm.$toast("请填写预留手机号");
          return false;
        }
        return true;
      }
    }
  }
</script>

<style scoped>

</style>
