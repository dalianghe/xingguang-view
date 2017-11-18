<template>
  <div class="box">
    <div class="bzbox">
      <div class="bz bzimg"></div>
    </div>
    <div class="content">
      <div class="input">
        <dl>
          <dt>手机号码</dt>
          <dd>
            <input class="text readonly" v-model="phone" readonly="readonly" type="text" />
          </dd>
        </dl>
        <dl>
          <dt>服务密码</dt>
          <dd>
            <input class="text" v-model="data.phonePwd" type="password"/>
          </dd>
        </dl>
        <dl v-show="smsCodeShow" >
          <dt>短信验证码</dt>
          <dd>
            <input class="text" v-model="data.captcha" type="text"/>
          </dd>
        </dl>
        <dl v-show="queryCodeShow" >
          <dt>查询密码</dt>
          <dd>
            <input class="text" v-model="data.queryPwd" type="password"/>
          </dd>
        </dl>
      </div>
    </div>
    <div class="btns">
      <div class="btnbox">
        <a v-show="authShow" v-on:click="cellAuth">运营商授权</a>
        <a v-show="cellShow" v-on:click="cellCollect">完成</a>
      </div>
    </div>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  export default {
    name: 'credit_apply',
    data() {
      return {
        data: {
          appId:""
        },
        tokenData:{
          token: "",
          website: "",
          type:""
        },
        phone: localStorage.getItem("_cusPhone"),
        smsCodeShow: false,
        queryCodeShow: false,
        authShow: true,
        cellShow: false
      }
    },
    mounted: function () {
      console.info(wx);
      this.initWxConfig();
    },
    methods: {
      cellAuth: function(){
        if(this.$tools.isNull(this.data.phonePwd)){
          this.$toast("请填写服务密码");
          return;
        }
        var vm = this;
        let cellAuthData = {
          name: localStorage.getItem("_cusName"),
          idCardNum: localStorage.getItem("_cusIdNo"),
          cellPhoneNum: localStorage.getItem("_cusPhone"),
          password: vm.data.phonePwd
        }
        vm.$indicator.open();
        this.$http.post('/cell/auth', cellAuthData)
          .then(function (response) {
            vm.$indicator.close();
            vm.cellHandle(vm, response);
            vm.tokenData.token = response.data.token;
            vm.tokenData.website = response.data.website;
          })
      },
      cellCollect: function(){
        if(this.smsCodeShow && this.$tools.isNull(this.data.captcha)){
          this.$toast("请填写短信验证码");
          return;
        }
        if(this.queryCodeShow && this.$tools.isNull(this.data.queryPwd)){
          this.$toast("请填写查询密码");
          return;
        }
        var vm = this;
        let cellCollectData = {
          token: vm.tokenData.token,
          website: vm.tokenData.website,
          type: vm.tokenData.type,
          captcha: vm.data.captcha,
          queryPwd: vm.data.queryPwd,
          password: vm.data.phonePwd,
          phone: localStorage.getItem("_cusPhone"),

          name: localStorage.getItem("_cusName"),
          idNo: localStorage.getItem("_cusIdNo")
        }
        vm.$indicator.open();
        this.$http.post('/cell/collect', cellCollectData)
          .then(function (response) {
            vm.$indicator.close();
            vm.cellHandle(vm, response);
          })
      },
      submit: function (event) {
        var vm = this;
        vm.$indicator.open();
        this.$http.post('/credit/apply', vm.data)
          .then(function (response) {
            vm.$indicator.close();
            if (response.bizCode == 0) {
              vm.$toast("授信申请已提交,请耐心等待!");
              vm.$router.push("/common/ok/my");
            }else{
              vm.$toast(response.msg);
            }
          })
      },
      cellHandle: function(vm, response){
        if (response.sysCode == 0 && response.bizCode == 0) {
          if(response.data.success){
            let data = response.data.data;
            if(data){
              if(data.process_code == "10002" ||
                data.process_code == "10001"){
                vm.$toast("请等候短信验证码!");
                vm.tokenData.type = "SUBMIT_CAPTCHA";
                vm.smsCodeShow = true;
              }else if(data.process_code == "10022"){
                vm.$toast("请输入查询密码!");
                vm.tokenData.type = "SUBMIT_QUERY_PWD";
                vm.queryCodeShow = true;
              }else if(data.process_code == "10008"){
                vm.data.appId = response.data.appId;
                vm.submit();
              }
              vm.cellShow = true;
              vm.authShow = false;
            }
          }
        }else{
          vm.$toast(response.msg);
        }
      },
      initWxConfig: function (event) {
        var vm = this;
        this.$http.get('/wx/getWxConfig')
          .then(function (response) {
            if (response.bizCode == 0) {
              let data = response.data;
              console.info(data);
              wx.config({
                debug: false, //开启调试模式
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名
                jsApiList: ["getLocation"] //必填，需要使用的JS接口列表
              });
              wx.ready(function(){
                wx.getLocation({
                  success: function (res) {
                    console.info("CUS经纬度为：（" + res.latitude + "，" + res.longitude + "）" );
                    vm.data.cusLng = res.longitude;
                    vm.data.cusLat = res.latitude;
                  },
                  fail: function(error) {
                    console.info("获取地理位置失败，请确保开启GPS且允许微信获取您的地理位置！");
                  }
                });
              });
            } else {
              vm.$toast(response.msg);
            }
          })
          .catch(function (response) {
          });
      }
    }
  }
</script>

<style scoped>
  .box .bzimg{
    background:url(/static/cus/img/information/bz.png) no-repeat center center;
    background-size: 100% auto
  }
</style>
