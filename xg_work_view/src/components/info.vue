<template>
  <div class="box">
    <div class="content">
      <div class="input">
        <dl>
          <dt>姓名</dt>
          <dd>
            <input class="text" type="text" v-model="data.name"/>
          </dd>
        </dl>
        <dl>
          <dt>身份证号</dt>
          <dd>
            <input class="text" type="text" @input="changeIdNo" v-model="data.idNo"/>
          </dd>
        </dl>
        <dl v-show="sexShow">
          <dt>性别</dt>
          <dd>
            <input class="text" type="text" readonly="readonly" v-model="data.sexName"/>
          </dd>
        </dl>
        <dl>
          <dt>所属区域</dt>
          <dd @click="select">
            <input type="text" class="text" placeholder="请选择" readonly="readonly" v-model="regionName"/>
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
    <mt-popup
      class="mint-popup-width-full"
      v-model="popupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <div class="selectbt">
        <div class="qx" @click="selectQX">取消</div>
        <div class="qd" @click="selectQD">确定</div>
      </div>
      <mt-picker class="remember" :slots="slots" valueKey="regionName" @change="selected"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>

  export default {
    name: 'credit_apply',
    data() {
      return {
        regionName:"",
        popupVisible: false,
        sexShow:false,
        data: {
          id: localStorage.getItem("_workUserId")
        },
        provinceId:"",
        tpId:"",
        tpName:"",
        tcId:"",
        tcName:"",
        slots: [
          {
            flex: 1,
            values: [],
            className: 'slot1',
            textAlign: 'right'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: [],
            className: 'slot3',
            textAlign: 'left'
          }
        ]
      }
    },
    mounted: function () {
      this.getProvince();
      //this.getInfo();
    },
    methods: {
      getInfo: function (event) {
        var vm = this;
        this.$http.get('/cus/user/info')
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.data.cusUserInfo = response.data;
              vm.data.cusUserLink = response.data.cusUserLinkAll;
            } else {
              vm.$toast(response.msg);
            }
          })
      },
      changeIdNo: function(){
        if(this.$data.data.idNo.length == 18){
          if(parseInt(this.$data.data.idNo.substr(16, 1)) % 2 == 1){
            this.data.sexName = "男";
            this.data.sex = 101001;
          }else{
            this.data.sexName = "女";
            this.data.sex = 101002;
          }
          this.sexShow = true;
        }else{
          this.sexShow = false;
        }
      },
      getProvince: function(){
        var vm = this;
        this.$http.get('code/region/1')
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.slots[0].values = response.data;
            } else {
              vm.$toast(response.msg);
            }
          })
      },
      getCity: function(id){
        var vm = this;
        this.$http.get('code/region/' + id)
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.slots[2].values = response.data;
            } else {
              vm.$toast(response.msg);
            }
          })
      },
      select : function(){
        if(this.data.provinceId == "" || this.data.provinceId == null){
          this.provinceId = this.slots[0].values[0].id
          this.tpId = this.slots[0].values[0].regionCode;
          this.tpName = this.slots[0].values[0].regionName;
          if(this.slots[2].values.length != 0){
            this.tcId = this.slots[2].values[0].regionCode;
            this.tcName = this.slots[2].values[0].regionName;
          }
        }else{
          this.tpId = this.data.provinceId;
          this.tpName = this.data.provinceName;
          this.tcId = this.data.cityId;
          this.tcName = this.data.cityName;
        }
        this.getCity(this.provinceId);
        this.popupVisible = true;
      },
      selectQD: function(){
        this.data.provinceId = this.tpId;
        this.data.provinceName = this.tpName;
        this.data.cityId = this.tcId;
        this.data.cityName = this.tcName;
        this.regionName = this.data.provinceName + "-" + this.data.cityName;
        this.popupVisible = false;
      },
      selectQX: function(){
        this.popupVisible = false;
      },
      selected: function(picker, values){
        if(!this.popupVisible){
          return;
        }
        if(picker.getValues()[0]){
          let pId = picker.getValues()[0].regionCode
          if(this.tpId != pId){
            this.tpId = pId;
            this.tpName = picker.getValues()[0].regionName;
            this.provinceId = picker.getValues()[0].id;
            this.getCity(this.provinceId);
          }
          if(picker.getValues()[1]) {
            let cId = picker.getValues()[1].regionCode
            if (this.tcId != cId) {
              this.tcId = pId;
              this.tcName = picker.getValues()[1].regionName;
            }
          }
        }
      },
      submit: function (event) {
        if(!this.validate()){
          return;
        }
        var vm = this;
        this.$http.post('/info/user', vm.data)
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.$toast("操作成功!");
              vm.$router.push("/common/ok");
            }else{
              vm.$toast(response.msg);
            }
          })
      },
      validate : function(){
        var vm = this;
        if(this.$tools.isNull(vm.data.name)){
          vm.$toast("请填写姓名");
          return false;
        }
        if(this.$tools.isNull(vm.data.idNo)){
          vm.$toast("请填写身份证号");
          return false;
        }
        if(this.$tools.isNull(vm.data.sexName)){
          vm.$toast("请填写正确的身份证号");
          return false;
        }
        if(this.$tools.isNull(vm.regionName)){
          vm.$toast("请选择所属区域");
          return false;
        }
        return true;
      }
    }
  }
</script>

<style scoped>

</style>
