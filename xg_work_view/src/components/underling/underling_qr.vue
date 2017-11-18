<template>
  <div class="box">
    <div class="box1">
      <div class="header">
        <div class="left"></div>
        <div class="right">
          <p class="name">{{data.name}}</p>
          <p class="addr">{{data.provinceName}}-{{data.cityName}}</p>
        </div>
      </div>
      <div class="content" ref="qr">
        <div class="icon"></div>
      </div>
      <div class="bottom">放飞梦想从现在开始,立即扫码加入我们</div>
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
                vm.getQR();
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
      getQR: function () {
        var vm = this;
        let workUserId = localStorage.getItem("_workUserId");
        let url = process.env.API_ROOT + "/qrcode/bizcode/"+workUserId;
        vm.$refs.qr.setAttribute('style', 'background: url('+url+') no-repeat center center; background-size: contain');
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
    background-color: #2D3132;
    vertical-align: middle;
    z-index: -2;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .box1 {
    width: 80%;
    height: 80%;
    background-color: #FFFFFF;
    vertical-align: middle;
    z-index: -1;
  }

  .header {
    margin: 1rem auto;
    height: 4.5rem;
    width: 90%;
    z-index: -1;
  }

  .header .left{
    float: left;
    width: 4.5rem;
    height: 4.5rem;
    background: url(/static/work/img/my/header.png) no-repeat center center;
    background-size: contain;
  }

  .header .right{
    float: left;
    height: 4.5rem;
    width: 8rem;
    margin-left: 0.5rem;
  }

  .header .right .name{
    margin: 0.6rem 0;
    color: #666666;
  }

  .header .right .addr{
    font-size: 0.9rem;
    margin: 0.6rem 0;
    color: #999999;
  }

  .content{
    margin: 0rem auto;
    margin-bottom: 1rem;
    width: 90%;
    height: 72vw;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;
  }

  .content .icon{
    margin: auto auto;
    width: 2rem;
    height: 2rem;
    background:url(/static/work/img/qr/icon.jpg) no-repeat center center;
    background-size: contain;
    background-color: #FFFFFF;
  }

  .bottom{
    margin: 0rem auto;
    margin-bottom: 1rem;
    width: 90%;
    height: 2.5rem;
    text-align: center;
    line-height: 1.5rem;
    font-size: 0.8rem;
  }


</style>
