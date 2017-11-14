<template>
  <div class="auth">
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
  export default {
    name: 'auth',
    data () {
      return {
        code: ""
      }
    },
    created: function () {
      this.code = this.$route.params.code;
      this.getAuth();
    },
    methods: {
      getAuth: function (event) {
        var vm = this;
        this.$http.get('/wx/auth/' + vm.code)
          .then(function (response) {
            let data = response.data;
            if (data) {
              console.info(data);
              if (data.token) {
                localStorage.setItem("_cusToken", data.token);
                vm.$router.go(-1);
              } else {
                if (localStorage.getItem("isGoOut") == 1) {
                  localStorage.setItem("isGoOut", null);
                  alert("您还没有注册,请联系业务员!");
                  vm.initWxConfig();
                }else{
                  if (data.openId) {
                    localStorage.setItem("_openId", data.openId);
                  }
                  vm.$router.go(-1);
                }
              }
            } else {
              alert("系统繁忙请稍后");
              vm.initWxConfig();
            }
          })
          .catch(function (response) {
          });
      },
      initWxConfig: function (event) {
        var vm = this;
        this.$http.get('/wx/getWxConfig')
          .then(function (response) {
            if (response.bizCode == 0) {
              let data = response.data;
              console.info(data);
              wx.config({
                debug: true, //开启调试模式
                appId: data.appId, // 必填，公众号的唯一标识
                timestamp: data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                signature: data.signature,// 必填，签名
                jsApiList: ["getLocation"] //必填，需要使用的JS接口列表
              });
              wx.ready(function () {
                wx.closeWindow();
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
  .register {
  }
</style>
