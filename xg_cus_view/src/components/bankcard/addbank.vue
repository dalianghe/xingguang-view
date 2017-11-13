<template>
  <div class="box">
    <mt-popup
      class="mint-popup-width-full"
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <mt-picker :slots="slots" valueKey="name" @change="selectedBank"></mt-picker>
    </mt-popup>
    <div class="content clears">
      <div class="input">
        <dl>
          <dt>银行卡</dt>
          <dd @click="selectBank">
            <input type="text" class="text" readonly="readonly" v-model="data.bankName"/>
            <div class="arrow arrow1"></div>
          </dd>
        </dl>
        <dl>
          <dt>卡号</dt>
          <dd>
            <input type="text" class="text" v-model="data.cardNo"/>
          </dd>
        </dl>
        <dl>
          <dt>联系人电话</dt>
          <dd>
            <input type="text" class="text" v-model="data.phone"/>
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
        ]
      };
    },
    mounted: function () {
      this.getBanks();
    },
    methods: {
      selectBank : function(){
        this.popupVisible = true;
      },
      selectedBank : function(picker, values){
        if(!this.popupVisible){
          return;
        }
        if(picker.getValues()[0]){
          this.data.bankId = picker.getValues()[0].id;
          this.data.bankName = picker.getValues()[0].name;
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
      }
    }
  }
</script>

<style scoped>

</style>
