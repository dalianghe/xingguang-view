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
          <dd @click="selectCode('cusUserInfo','education', 'educationName')">
            <input type="text" class="text" placeholder="请选择学历" readonly="readonly" v-model="data.cusUserInfo.educationName"/>
            <div class="arrow arrow1"></div>
          </dd>
        </dl>
        <dl>
          <dt>职业</dt>
          <dd @click="selectCode('cusUserInfo', 'occupation', 'occupationName')">
            <input type="text" class="text" placeholder="请选择职业" readonly="readonly" v-model="data.cusUserInfo.occupationName"/>
            <div class="arrow arrow1"></div>
          </dd>
        </dl>
        <dl>
          <dt>收入</dt>
          <dd @click="selectCode('cusUserInfo', 'income', 'incomeName')">
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
          <dd @click="selectCode('cusUserLink', 'relationId', 'relationName')">
            <input type="text" class="text" placeholder="请选择关系" readonly="readonly" v-model="data.cusUserLink.relationName"/>
            <div class="arrow arrow1"></div>
          </dd>
        </dl>
        <dl>
          <dt>家庭住址</dt>
          <dd>
            <input type="text" class="text" v-model="data.cusUserInfo.homeAddr"/>
          </dd>
        </dl>
        <dl>
          <dt>单位名称</dt>
          <dd>
            <input type="text" class="text" v-model="data.cusUserInfo.companyName"/>
          </dd>
        </dl>
        <dl>
          <dt>单位地址</dt>
          <dd>
            <input type="text" class="text" v-model="data.cusUserInfo.companyAddr"/>
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
      v-model="educationPopupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <div class="selectbt">
        <div class="qx" @click="selectQX('educationPopupVisible')">取消</div>
        <div class="qd" @click="selectQD('cusUserInfo', 'education', 'educationName')">确定</div>
      </div>
      <mt-picker :slots="educationList" valueKey="name" @change="selectedEducationCode"></mt-picker>
    </mt-popup>
    <mt-popup
      class="mint-popup-width-full"
      v-model="occupationPopupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <div class="selectbt">
        <div class="qx" @click="selectQX('occupationPopupVisible')">取消</div>
        <div class="qd" @click="selectQD('cusUserInfo', 'occupation', 'occupationName')">确定</div>
      </div>
      <mt-picker :slots="occupationList" valueKey="name" @change="selectedOccupationCode"></mt-picker>
    </mt-popup>
    <mt-popup
      class="mint-popup-width-full"
      v-model="incomePopupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <div class="selectbt">
        <div class="qx" @click="selectQX('incomePopupVisible')">取消</div>
        <div class="qd" @click="selectQD('cusUserInfo', 'income', 'incomeName')">确定</div>
      </div>
      <mt-picker :slots="incomeList" valueKey="name" @change="selectedIncomeCode"></mt-picker>
    </mt-popup>
    <mt-popup
      class="mint-popup-width-full"
      v-model="relationIdPopupVisible"
      popup-transition="popup-fade"
      position="bottom">
      <div class="selectbt">
        <div class="qx" @click="selectQX('relationIdPopupVisible')">取消</div>
        <div class="qd" @click="selectQD('cusUserLink', 'relationId', 'relationName')">确定</div>
      </div>
      <mt-picker :slots="relationIdList" valueKey="name" @change="selectedLinkCode"></mt-picker>
    </mt-popup>
  </div>
</template>

<script>

  export default {
    name: 'credit_apply',
    data() {
      return {
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
        },
        _selectId:"",
        _selectName:"",
        _selectIdKey:"",
        _selectNameKey:""
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
            vm.educationList[0].values = response.data["104"];
            vm.occupationList[0].values = response.data["105"];
            vm.incomeList[0].values = response.data["103"];
            vm.relationIdList[0].values = response.data["102"];
          })
      },
      selectCode : function(obj, id, name){
        event.target.blur();
        if(this.data[obj][id] == "" || this.data[obj][id] == null){
          this._selectId = this[id + "List"][0].values[0].code;
          this._selectName = this[id + "List"][0].values[0].name;
        }else{
          this._selectId = this.data[obj][id];
          this._selectName = this.data[obj][name];
        }
        this[id + "PopupVisible"] = true;
      },
      selectQD: function(obj, id, name){
        this.data[obj][id] = this._selectId;
        this.data[obj][name] = this._selectName;
        this[id + "PopupVisible"] = false;
      },
      selectQX: function(popupVisible){
        this[popupVisible] = false;
      },
      selectedEducationCode : function(picker, values){
        if(!this.educationPopupVisible){return;}
        if(picker.getValues()[0]){
          this._selectId = picker.getValues()[0].code;
          this._selectName = picker.getValues()[0].name;
        }
      },
      selectedOccupationCode : function(picker, values){
        if(!this.occupationPopupVisible){return;}
        if(picker.getValues()[0]){
          this._selectId = picker.getValues()[0].code;
          this._selectName = picker.getValues()[0].name;
        }
      },
      selectedIncomeCode : function(picker, values){
        if(!this.incomePopupVisible){return;}
        if(picker.getValues()[0]){
          this._selectId = picker.getValues()[0].code;
          this._selectName = picker.getValues()[0].name;
        }
      },
      selectedLinkCode : function(picker, values){
        if(!this.relationIdPopupVisible){return;}
        if(picker.getValues()[0]){
          this._selectId = picker.getValues()[0].code;
          this._selectName = picker.getValues()[0].name;
        }
      },
      submit: function (event) {
        if(!this.validate()){
          return;
        }
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
      },
      validate : function(){
        var vm = this;
        if(this.$tools.isNull(vm.data.cusUserInfo.educationName)){
          vm.$toast("请选择学历");
          return false;
        }
        if(this.$tools.isNull(vm.data.cusUserInfo.occupationName)){
          vm.$toast("请选择职业");
          return false;
        }
        if(this.$tools.isNull(vm.data.cusUserInfo.incomeName)){
          vm.$toast("请选择收入");
          return false;
        }
        if(this.$tools.isNull(vm.data.cusUserLink.linkName)){
          vm.$toast("请填写联系人姓名");
          return false;
        }
        if(this.$tools.isNull(vm.data.cusUserLink.phone)){
          vm.$toast("请填写联系人电话");
          return false;
        }
        if(this.$tools.isNull(vm.data.cusUserLink.relationName)){
          vm.$toast("请选择联系人关系");
          return false;
        }
        if(this.$tools.isNull(vm.data.cusUserInfo.homeAddr)){
          vm.$toast("请填写家庭住址");
          return false;
        }
        if(this.$tools.isNull(vm.data.cusUserInfo.companyName)){
          vm.$toast("请填写公司名称");
          return false;
        }
        if(this.$tools.isNull(vm.data.cusUserInfo.companyAddr)){
          vm.$toast("请填写公司地址");
          return false;
        }
        return true;
      }
    }
  }
</script>

<style scoped>

</style>
