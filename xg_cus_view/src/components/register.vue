<template>
  <div class="box">
    <div class="logo1"></div>
    <div class="contentR">
      <div class="content1">
        <p>
          <input type="text" v-model="data.phone" placeholder="您的手机号"/>
        </p>
        <p>
          <span class="ewminputbox">
            <input type="text" id="ewminput" v-model="data.imgCode" placeholder="图形验证码"/>
          </span>
          <span class="ewm" ref="ewm" @click="refreshVerifyCode"></span>
        </p>
        <p>
          <input type="text" v-model="data.smsCode" placeholder="短信验证码"/>
        </p>
        <!--<p>-->
          <!--<input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">-->
        <!--<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>-->
        <!--</p>-->
        <p>
          <a v-on:click="submit">确定</a>
        </p>
      </div>
    </div>
    <div class="logo2">
      <div class="bottom">
        <label class="tag">无担保</label>
        <label class="tag1"></label>
        <label class="tag">无抵押</label>
        <label class="tag1"></label>
        <label class="tag">纯信用</label>
        <label class="tag1"></label>
        <label class="tag">审批快</label>
        <label class="tag1"></label>
        <label class="tag">利率低</label>
      </div>
    </div>
    <div class="jb1"></div>
    <div class="jb2"></div>
    <div class="jb3"></div>
    <div class="jb4"></div>
    <div class="jb5"></div>
    <div class="jb6"></div>
    <div class="jb7"></div>
    <div class="jb8"></div>
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
    mounted: function () {
      this.getVerifyCode();
    },
    methods: {
      getVerifyCode: function(){
        let url = this.$http.defaults.baseURL + '/verify/code?' + new Date().getTime();
        this.$refs.ewm.setAttribute('style', 'background: ' + 'url('+url+') no-repeat center center; background-size: contain');
      },
      refreshVerifyCode: function(){
        this.getVerifyCode();
      },
      submit: function (event) {
        var vm = this;
        vm.$indicator.open();
        this.$http.post('/auth/register', vm.data)
          .then(function (response) {
            vm.$indicator.close();
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
    height: 20rem;
    background:url(/static/cus/img/register/logo1.png) no-repeat center center;
    background-size: 100% auto
  }

  .box .contentR{
    height: 12rem;
  }

  .box .contentR .content1{
    width: 18rem;
    margin: 0 auto;
    align-content: center;
    text-align:center
  }
  .box .contentR .content1 p{
    width: 18rem;
    margin: 1rem auto;
    align-content: center;
    text-align:center
  }
  .box .contentR .content1 input{
    width: 18rem;
    height: 2rem;
    border-radius: 0.4rem;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid #CCC;
    line-height: 2rem;
    text-indent: 1rem;
    font-size: 1rem;
  }

  .ewminputbox{
    width:13rem;
  }
  #ewminput{
    width:13rem;
  }

  .ewm{
    display: inline-block;
    width:4rem;
    height: 2rem;
  }

  .box .contentR .content1 a{
    display: block;
    width: 18rem;
    height: 2rem;
    background-color: rgba(255, 123, 183, 1);
    box-shadow: 0px 7px 0px 0px
    rgba(226, 56, 106, 0.4);
    border-radius: 0.4rem;
    color: #ffffff;
    line-height: 2rem;
  }

  .box .logo2{
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 10rem;
    background:url(/static/cus/img/register/logo2.png) no-repeat center center;
    background-size: 100% auto;
    vertical-align:bottom;
  }

  .box .logo2 .bottom{
    position: absolute;
    bottom: 1.2rem;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    align-content: center;
    text-align:center;
  }

  .box .logo2 .bottom .tag{
    display: inline-block;
    letter-spacing: 0px;
    color: #ffedf4;
    width: 3.6rem;
  }

  .box .logo2 .bottom .tag1{
    display: inline-block;
    height: 0.6rem;
    border-left: 1px solid #ffedf4;
  }

  .box .jb1{
    position: absolute;
    background:url(/static/cus/img/register/jb1.png) no-repeat left center;
    background-size: contain;
    width: 20rem;
    height: 3rem;
    top: 1rem;
    left: 1rem;
  }

  .box .jb2{
    position: absolute;
    background:url(/static/cus/img/register/jb1.png) no-repeat left center;
    background-size: contain;
    width: 20rem;
    height: 3rem;
    top: 7rem;
    left: 12rem;
  }

  .box .jb3{
    position: absolute;
    background:url(/static/cus/img/register/jb1.png) no-repeat left center;
    background-size: contain;
    width: 20rem;
    height: 3rem;
    top: 11rem;
    left: 11rem;
  }

  .box .jb4{
    position: absolute;
    background:url(/static/cus/img/register/jb1.png) no-repeat left center;
    background-size: contain;
    width: 20rem;
    height: 3rem;
    top: 3rem;
    left: 8rem;
  }

  .box .jb5{
    position: absolute;
    background:url(/static/cus/img/register/jb1.png) no-repeat left center;
    background-size: contain;
    width: 20rem;
    height: 3rem;
    top: 6rem;
    left: 11rem;
  }

  .box .jb6{
    position: absolute;
    background:url(/static/cus/img/register/jb1.png) no-repeat left center;
    background-size: contain;
    width: 20rem;
    height: 3rem;
    top: 4rem;
    left: 8rem;
  }

  .box .jb7{
    position: absolute;
    background:url(/static/cus/img/register/jb1.png) no-repeat left center;
    background-size: contain;
    width: 20rem;
    height: 3rem;
    top: 5rem;
    left: 10rem;
  }

  .box .jb8{
    position: absolute;
    background:url(/static/cus/img/register/jb1.png) no-repeat left center;
    background-size: contain;
    width: 20rem;
    height: 3rem;
    top: 2rem;
    left: 20rem;
  }

  @-webkit-keyframes twinkling{
    0%{
      opacity:0.1;
    }
    100%{
      opacity:1;
    }
  }
  @keyframes twinkling{
    0%{
      opacity:0.1;
    }
    100%{
      opacity:1;
    }
  }

</style>
