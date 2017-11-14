<template>
  <div class="box">
    <div class="logo1"></div>
    <div class="contentR">
      <div class="content1">
        <p>
          <input type="text" v-model="data.phone" placeholder="您的手机号"/>
        </p>
        <p id="ewmP">
          <input type="text" id="ewminput" v-model="data.imgCode" @input="validateVerifyCode" placeholder="图形验证码"/>
          <input type="text" readonly="readonly" id="ewm" ref="ewm" @click="getVerifyCode"/>
        </p>
        <p v-show="smsFlag">
          <input type="text" v-model="data.smsCode" placeholder="短信验证码"/>
        </p>
        <p id="smsSend" v-show="smsFlag">
          <label @click="sendSms">未收到短信验证码？</label>
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
  export default {
    name: 'register',
    data() {
      return {
        smsFlag:false,
        data: {
          phone: "",
          imgCode: "",
          smsCode: ""
        }
      }
    },
    created: function () {
      this.data.workUserId = this.$route.params.key;
    },
    mounted: function () {
      this.getVerifyCode();
    },
    methods: {
      getVerifyCode: function(){
        let url = this.$http.defaults.baseURL + '/verify/code?' + new Date().getTime();
        this.$refs.ewm.setAttribute('style', 'background: ' + 'url('+url+') no-repeat center center; background-size: contain');
      },
      sendSms: function(){
        var vm = this;
        let phone = vm.data.phone;
//        if(imgCode.length != 4){
//          return;
//        }
        vm.$indicator.open();
        this.$http.get('/sms/send/' + phone)
          .then(function (response) {
            vm.$indicator.close();
            if (response.bizCode == 0) {
              vm.$toast("验证码已发送");
            } else {
              vm.$toast(response.msg);
            }
          })
      },
      validateVerifyCode: function(){
        var vm = this;
        let imgCode = vm.data.imgCode;
        if(imgCode.length != 4){
            return;
        }
        vm.$indicator.open();
        this.$http.get('/verify/code/' + imgCode)
          .then(function (response) {
            vm.$indicator.close();
            if (response.bizCode == 0) {
              let flag = response.data;
              if (flag == 1) {
                vm.smsFlag = true;
                vm.sendSms();
              }else{
                vm.$toast("图形验证码错误");
                vm.data.imgCode = '';
                vm.getVerifyCode();
              }
            } else {
              vm.$toast(response.msg);
            }
          })
      },
      submit: function (event) {
        var vm = this;
        vm.data.openId = localStorage.getItem("_openId");
        vm.$indicator.open();
        this.$http.post('/auth/register', vm.data)
          .then(function (response) {
            vm.$indicator.close();
            if (response.bizCode == 0) {
              let token = response.data;
              if (token) {
                localStorage.setItem("_cusToken", token);
                localStorage.setItem("_cusPhone", vm.data.phone);
              }
              vm.$toast("注册成功");
              vm.$router.push("/real");
            } else {
              vm.$toast(response.msg);
            }
          })
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
    z-index: -2;
  }

  .box .logo1{
    height: 14rem;
    width:80%;
    margin:0 auto;
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
    text-align:center;
  }
  .box .contentR .content1 p{
    width: 18rem;
    margin: 1rem auto;
    align-content: center;
    text-align:center;
  }

  #ewmP{
    align-content: left;
    text-align:left;
  }

  #smsSend{
    align-content: right;
    text-align:right;
    font-size: 0.5rem;
    color:#fff;
    line-height: 0.1rem;
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

  #ewminput{
    width:13rem;
  }

  #ewm{
    float: right;
    display: block;
    width:4.5rem;
    height: 2rem;
    border-style:none;
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
    z-index: -1;
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
