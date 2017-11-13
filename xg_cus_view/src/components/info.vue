<template>
  <div class="box">
    <div class="content">
      <div class="input">
        <dl>
          <dt>性别</dt>
          <dd>
            <input type="text" class="text" placeholder="请选择性别" readonly="readonly" v-model="data.cusUserInfo.sexName"/>
          </dd>
        </dl>
        <dl>
          <dt>学历</dt>
          <dd @click="selectCode('educationPopupVisible')">
            <input type="text" class="text" placeholder="请选择学历" readonly="readonly" v-model="data.cusUserInfo.educationName"/>
            <div class="arrow arrow1"></div>
          </dd>
        </dl>
        <dl>
          <dt>职业</dt>
          <dd @click="selectCode('occupationPopupVisible')">
            <input type="text" class="text" placeholder="请选择职业" readonly="readonly" v-model="data.cusUserInfo.occupationName"/>
            <div class="arrow arrow1"></div>
          </dd>
        </dl>
        <dl>
          <dt>收入</dt>
          <dd @click="selectCode('incomePopupVisible')">
            <input type="text" class="text" placeholder="请选择收入" readonly="readonly" v-model="data.cusUserInfo.incomeName"/>
            <div class="arrow arrow1"></div>
          </dd>
        </dl>
        <dl>
          <dt>联系人姓名</dt>
          <dd>
            <input type="text" class="text" v-model="data.cusUserLink.linkName"/>
          </dd>
        </dl>
        <dl>
          <dt>联系人电话</dt>
          <dd>
            <input type="text" class="text" v-model="data.cusUserLink.phone"/>
          </dd>
        </dl>
        <dl>
          <dt>联系人关系</dt>
          <dd @click="selectCode('relationIdPopupVisible')">
            <input type="text" class="text" placeholder="请选择关系" readonly="readonly" v-model="data.cusUserLink.relationName"/>
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
      v-model="sexPopupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <mt-picker :slots="sexList" valueKey="name" @change="selectedSexCode"></mt-picker>
    </mt-popup>
    <mt-popup
      class="mint-popup-width-full"
      v-model="educationPopupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <mt-picker :slots="educationList" valueKey="name" @change="selectedEducationCode"></mt-picker>
    </mt-popup>
    <mt-popup
      class="mint-popup-width-full"
      v-model="occupationPopupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <mt-picker :slots="occupationList" valueKey="name" @change="selectedOccupationCode"></mt-picker>
    </mt-popup>
    <mt-popup
      class="mint-popup-width-full"
      v-model="incomePopupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <mt-picker :slots="incomeList" valueKey="name" @change="selectedIncomeCode"></mt-picker>
    </mt-popup>
    <mt-popup
      class="mint-popup-width-full"
      v-model="relationIdPopupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <mt-picker :slots="relationIdList" valueKey="name" @change="selectedLinkCode"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>

  export default {
    name: 'credit_apply',
    data() {
      return {
        sexPopupVisible: false,
        sexList:[
          {
            flex: 1,
            values: [],
            className: 'slot1'
          }
        ],
        educationPopupVisible: false,
        educationList:[
          {
            flex: 1,
            values: [],
            className: 'slot1'
          }
        ],
        occupationPopupVisible: false,
        occupationList:[
          {
            flex: 1,
            values: [],
            className: 'slot1'
          }
        ],
        incomePopupVisible: false,
        incomeList:[
          {
            flex: 1,
            values: [],
            className: 'slot1'
          }
        ],
        relationIdPopupVisible:false,
        relationIdList:[
          {
            flex: 1,
            values: [],
            className: 'slot1'
          }
        ],
        data: {
          cusUserInfo:{},
          cusUserLink:{}
        }
      }
    },
    mounted: function () {
      this.getCodes();
      this.getInfo();
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
      getCodes: function (event) {
        var vm = this;
        this.$http.get('/codes', {
          params: {
            typeIds: "101,102,103,104,105"
          }
        }).then(function (response) {
            vm.sexList[0].values = response.data["101"];
            vm.educationList[0].values = response.data["104"];
            vm.occupationList[0].values = response.data["105"];
            vm.incomeList[0].values = response.data["103"];
            vm.relationIdList[0].values = response.data["102"];
          })
      },
      selectCode : function(popupVisible){
        this[popupVisible] = true;
      },
      selectedSexCode : function(picker, values){
        if(!this.sexPopupVisible){return;}
        if(picker.getValues()[0]){
          this.data.cusUserInfo.sex = picker.getValues()[0].code;
          this.data.cusUserInfo.sexName = picker.getValues()[0].name;
        }
      },
      selectedEducationCode : function(picker, values){
        if(!this.educationPopupVisible){return;}
        if(picker.getValues()[0]){
          this.data.cusUserInfo.education = picker.getValues()[0].code;
          this.data.cusUserInfo.educationName = picker.getValues()[0].name;
        }
      },
      selectedOccupationCode : function(picker, values){
        if(!this.occupationPopupVisible){return;}
        if(picker.getValues()[0]){
          this.data.cusUserInfo.occupation = picker.getValues()[0].code;
          this.data.cusUserInfo.occupationName = picker.getValues()[0].name;
        }
      },
      selectedIncomeCode : function(picker, values){
        if(!this.incomePopupVisible){return;}
        if(picker.getValues()[0]){
          this.data.cusUserInfo.income = picker.getValues()[0].code;
          this.data.cusUserInfo.incomeName = picker.getValues()[0].name;
        }
      },
      selectedLinkCode : function(picker, values){
        if(!this.relationIdPopupVisible){return;}
        if(picker.getValues()[0]){
          this.data.cusUserLink.relationId = picker.getValues()[0].code;
          this.data.cusUserLink.relationName = picker.getValues()[0].name;
        }
      },
      submit: function (event) {
        var vm = this;
        this.$http.patch('/cus/user', vm.data)
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.$toast("操作成功!");
              vm.$router.go(-1);
            }else{
              vm.$toast(response.msg);
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
