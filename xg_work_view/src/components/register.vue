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
          <a class="bt" v-on:click="submit">确定</a>
        </p>
      </div>
    </div>
    <div class="logo2">
      <div class="bottom">
        <label class="tag" @click="cleanToken">放飞梦想从现在开始</label>
      </div>
    </div>
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
        },
        chars : ['2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'],
        smsChars : ['1','2','3','4','5','6','7','8','9','0'],
        tempCode: "",
        smsTempCode: ""
      }
    },
    created: function(){
      this.data.ownerId = this.$route.params.key;
    },
    mounted: function () {
      this.getVerifyCode();
    },
    methods: {
      cleanToken: function(){
        alert("清空");
        localStorage.clear();
      },
      getVerifyCode: function(event){
        if(event && event.target != null){
          event.target.blur();
        }
        this.tempCode = this.generateMixed(this.chars, 4);
        let url = this.$http.defaults.baseURL + '/verify/code/' + this.tempCode + '?' + new Date().getTime();
        this.$refs.ewm.setAttribute('style', 'background: ' + 'url('+url+') no-repeat center right; background-size: contain');
      },
      generateMixed: function (chars, n){
        var res = "";
        for(var i = 0; i < n ; i ++) {
          var id = Math.ceil(Math.random() * (chars.length-1));
          res += chars[id];
        }
        return res;
      },
      sendSms: function(){
        var vm = this;
        if(vm.data.phone.length != 11){
          vm.$toast("请先填写手机号");
          vm.data.imgCode = '';
          vm.getVerifyCode();
          return;
        }
        if(vm.data.imgCode.toUpperCase() != vm.tempCode){
          vm.data.imgCode = '';
          vm.getVerifyCode();
          vm.$toast("图形验证码错误");
          return;
        }
        vm.$indicator.open();
        this.smsTempCode = this.generateMixed(this.smsChars, 4);
        this.$http.get('/sms/send/login/' + vm.data.phone + '/' + this.smsTempCode)
          .then(function (response) {
            vm.$indicator.close();
            if (response.bizCode == 0) {
              vm.$toast("验证码已发送");
//              vm.data.imgCode = '';
//              vm.getVerifyCode();
            } else {
              vm.$toast(response.msg);
            }
          })
      },
      validateVerifyCode: function(){
        var vm = this;
        if(vm.data.imgCode.length == 4){
          if(vm.data.phone.length != 11){
            vm.$toast("请先填写手机号");
            vm.data.imgCode = '';
            vm.getVerifyCode();
            return;
          }
          if(vm.data.imgCode.toUpperCase() == vm.tempCode){
            vm.smsFlag = true;
            vm.sendSms();
          }else{
            vm.$toast("图形验证码错误");
            vm.data.imgCode = '';
            vm.getVerifyCode();
          }
//          vm.$indicator.open();
//          this.$http.post('/verify/code/' + vm.data.imgCode)
//            .then(function (response) {
//              vm.$indicator.close();
//              if (response.bizCode == 0) {
//                let flag = response.data;
//                if (flag == 1) {
//                  vm.smsFlag = true;
//                  vm.sendSms();
//                }else{
//                  vm.$toast("图形验证码错误");
//                  vm.data.imgCode = '';
//                  vm.getVerifyCode();
//                }
//              } else {
//                vm.$toast(response.msg);
//              }
//            })
        }
      },
      submit: function (event) {
        var vm = this;
        if(vm.data.phone.length != 11) {
          vm.$toast("请先填写手机号");
          return;
        }
        if(vm.smsTempCode == "" || vm.smsTempCode != vm.data.smsCode){
          vm.$toast("验证码错误");
          return;
        }
        vm.data.openId = localStorage.getItem("_openId");
        if(process.env.IS_WX == 0){
          vm.data.openId = "openid666";
        }
        vm.$indicator.open();
        this.$http.post('/auth/register', vm.data)
          .then(function (response) {
            vm.$indicator.close();
            if (response.bizCode == 0) {
              let token = response.data;
              if (token) {
                localStorage.setItem("_workToken", token);
                localStorage.setItem("_workUserId", response.msg);
                localStorage.setItem("_workPhone", vm.data.phone);
              }
              vm.$toast("注册成功");
              vm.$router.push("/info");
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
    height: 12rem;
    width:80%;
    margin:0 auto;
    margin-top:2rem;
    background:url(/static/work/img/register/logo1.png) no-repeat center center;
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
    position: relative;
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
    /*width:12rem;*/
  }

  #ewm{
    position: absolute;
    display: block;
    width: 5rem;
    height: 2.0rem;
    top: 0rem;
    left: 13rem;
  }

  .box .contentR .content1 .bt{
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
    background:url(/static/work/img/register/logo2.png) no-repeat center center;
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
    width: 13rem;
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
