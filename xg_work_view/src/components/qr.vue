<template>
  <div class="box">
    <div class="title"></div>
    <div class="logo2">
      <div class="bottom">
        <div class="qrBox">
          <div class="qr" ref="qr">
            <div class="logo"></div>
          </div>
        </div>
        <label class="tag">放飞梦想从现在开始</label>
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
        data:{}
      }
    },
    mounted: function () {
      this.getInfo();
    },
    methods: {
      getInfo: function (event) {
        var vm = this;
        this.$http.get('/info/user/' + localStorage.getItem("_workUserId"))
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.data = response.data;
              if(vm.data.status == 2 && vm.data.enableStatus != 1){
                vm.initWxConfig();
              }else{
                if(vm.data.status == 1){
                  alert("您还在审核中,不能生成二维码");
                }else if(vm.data.status == 3){
                  alert("您审核不通过,不能生成二维码");
                }else{
                  alert("您已被停用,不能生成二维码");
                }
                wx.config({
                  debug: false, //开启调试模式
                  appId: data.appId, // 必填，公众号的唯一标识
                  timestamp: data.timestamp, // 必填，生成签名的时间戳
                  nonceStr: data.nonceStr, // 必填，生成签名的随机串
                  signature: data.signature,// 必填，签名
                  jsApiList: ["getLocation"] //必填，需要使用的JS接口列表
                });
                wx.ready(function() {
                  wx.closeWindow();
                });
              }
            } else {
              vm.$toast(response.msg);
            }
          })
      },
      getQR: function (lng, lat) {
        var vm = this;
        let workUserId = localStorage.getItem("_workUserId");
        let url = process.env.API_ROOT + "/qrcode/code/"+workUserId+"/"+lng+"/" + lat + "/";
        vm.$refs.qr.setAttribute('style', 'background: url('+url+') no-repeat center center; background-size: contain');
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
                    console.info("WORK经纬度为：（" + res.latitude + "，" + res.longitude + "）" );
                    vm.getQR(res.longitude, res.latitude);
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
  .box {
    position: absolute;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
    background-image: linear-gradient(0deg,
    #f6d365 0%,
    #f49253 30%,
    #f25040 100%);
    z-index: -2;
  }

  .box .title{
    height: 27rem;
    width: 100%;
    margin: 0 auto;
    background:url(/static/work/img/qr/title.png) no-repeat center center;
    background-size: 100% auto
  }
  .box .logo2{
    position: absolute;
    width:100%;
    bottom: 0px;
    height: 18rem;
    margin: 0 auto;
    background:url(/static/work/img/qr/qiandai.png) no-repeat center center;
    background-size: contain;
    vertical-align: 100% auto;
    z-index: -1;
  }

  .box .logo2 .bottom{
    position: absolute;
    bottom: 0rem;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    height: 14rem;
    align-content: center;
    text-align:center;
  }

  .box .logo2 .bottom .qrBox{
    position: absolute;
    bottom: 3.5rem;
    left: 0px;
    right: 0px;
    width:8rem;
    height:8rem;
    background-color: #FFFFFF;
    margin: 0 auto;
    border-radius: 0.3rem;
  }

  .box .logo2 .bottom .qrBox .qr{
    position: absolute;
    left:0rem;
    right:0rem;
    top:0rem;
    bottom:0rem;
    border-radius: 0.3rem;
    background-color: #FFFFFF;
  }

  .box .logo2 .bottom .qrBox .qr .logo{
    position: absolute;
    left:3.4rem;
    right:3.4rem;
    top:3.4rem;
    bottom:3.4rem;
    background-color: #FFFFFF;
    background:url(/static/work/img/qr/icon.jpg) no-repeat center center;
    background-size: contain;
    box-shadow: 0px 0px 2px #888888;
  }

  .box .logo2 .bottom .tag{
    position: absolute;
    bottom: 1rem;
    left: 0px;
    right: 0px;
    letter-spacing: 0px;
    color: #ffedf4;
    width: 13rem;
    margin: 0 auto;
  }

</style>
