<template>
  <div class="box">
    <div class="logo1"></div>
    <div class="content">
      <div class="content1">
        <p>
          <input type="text" v-model="data.phone"/>
        </p>
        <p>
          <input type="text" v-model="data.imgCode"/>
        </p>
        <p>
          <input type="text" v-model="data.smsCode"/>
        </p>
        <p>
          <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
        <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
        </p>
        <p>
          <button v-on:click="submit">确定</button>
        </p>
      </div>
    </div>
    <div class="logo2"></div>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
//  var wx = require('weixin-js-sdk');
  export default {
    name: 'register',
    data() {
      return {
        data: {
          phone: "",
          imgCode: "",
          smsCode: ""
        },
        jsApiList:["getLocation"]
      }
    },
    created: function () {
      this.data.workUserId = this.$route.params.key;
      console.info(wx);
      this.initWxConfig();
    },
    methods: {
      submit: function (event) {
        var vm = this;
        this.$http.post('/auth/register', vm.data)
          .then(function (response) {
            if (response.bizCode == 0) {
              let token = response.data;
              if (token) {
                localStorage.setItem("token", token);
              }
              vm.$toast("注册成功");
              vm.$router.push("/real");
            } else {
              vm.$toast(response.msg);
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
              console.info(1);
              wx.ready(function(){
                console.info(2);
                wx.getLocation({
                  success: function (res) {
                    alert("小宝鸽获取地理位置成功，经纬度为：（" + res.latitude + "，" + res.longitude + "）" );
                    console.info("小宝鸽获取地理位置成功，经纬度为：（" + res.latitude + "，" + res.longitude + "）" );
                  },
                  fail: function(error) {
                    console.info("获取地理位置失败，请确保开启GPS且允许微信获取您的地理位置！");
                  }
                });
                console.info(3);
              });
              console.info(4);
            } else {
              vm.$toast(response.msg);
            }
          })
          .catch(function (response) {
          });
      }
    },
    vuerify: {
      username: {
        test: /\w{4,}/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
        message: '至少 4 位字符'
      },
      password: 'required' // 使用全局注册的规则
    }
  }
</script>

<style scoped>
  .box {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background-image: linear-gradient(0deg,
    rgba(252, 72, 159, 1) 0%,
    rgba(245, 79, 57, 1) 100%);
  }

  .box .logo1{
    position: absolute;
    top: 8rem;
    left: 0px;
    right: 0px;
    height: 10rem;
  }

  .box .content{
    position: absolute;
    top: 20rem;
    left: 0px;
    right: 0px;
    height: 12rem;
  }

  .box .content .content1{
    width: 10rem;
    margin: 0 auto;
  }

  .box .logo2{
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 10rem;
  }

</style>
