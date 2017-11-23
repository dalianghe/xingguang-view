<template>
  <div class="register">
    <input type="text" v-model="phone"/>
    <input type="text" v-model="smsCode"/>
    <button v-on:click="submit">提交</button>
    <button v-on:click="paizhao">拍照</button>
  </div>
</template>

<script>
  import wx from 'weixin-js-sdk';
export default {
  name: 'register',
  data () {
    return {
      phone:"",
      smsCode:""
    }
  },
  mounted: function () {
    this.initWX();
  },
  methods: {
    initWX:function(){
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
              jsApiList: ["chooseImage"] //必填，需要使用的JS接口列表
            });
          } else {
            vm.$toast(response.msg);
          }
        })
        .catch(function (response) {
        });
    },
    paizhao:function(){
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          console.info(localIds);
          alert(localIds);
        }
      });
    },
    submit: function (event) {
      var vm = this;
      this.$http.post('/auth/login', vm.$data)
      .then(function (response) {
        let token = response.data;
        if(token){
          localStorage.setItem("_cusToken", token);
          localStorage.setItem("_cusPhone", vm.phone);
        }
      })
      .catch(function (response) {
      });


    }
  }
}
</script>

<style scoped>
.register{}
</style>
