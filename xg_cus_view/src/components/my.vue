<template>
  <div class="box">
    <div class="top">
      <div class="content1">
        <div class="header"></div>
        <div class="name">{{data.name}}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="menus">
        <router-link class="url clears" to="/creditinfo">
          <div class="menu">
            <div class="icon icon1"></div>
            <div class="title">我的授信</div>
            <div class="arrow"></div>
          </div>
        </router-link>
        <router-link class="url clears" to="/wdrllist">
          <div class="menu">
            <div class="icon icon2"></div>
            <div class="title">我的借款</div>
            <div class="arrow"></div>
          </div>
        </router-link>
        <router-link class="url clears" to="/banklist">
          <div class="menu">
            <div class="icon icon3"></div>
            <div class="title">银行卡管理</div>
            <div class="arrow"></div>
          </div>
        </router-link>
      </div>
      <div class="menus">
        <router-link class="url clears" to="/wdrllist">
          <div class="menu">
            <div class="icon icon4"></div>
            <div class="title">借款攻略</div>
            <div class="arrow"></div>
          </div>
        </router-link>
        <router-link class="url clears" to="/">
          <div class="menu">
            <div class="icon icon5"></div>
            <div class="title">了解星光</div>
            <div class="arrow"></div>
          </div>
        </router-link>
        <router-link class="url clears" to="/banks">
          <div class="menu">
            <div class="icon icon6"></div>
            <div class="title">常见问题</div>
            <div class="arrow"></div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'credit_apply',
    data() {
      return {
        data: {}
      }
    },
    mounted: function () {
      this.getInfo();
    },
    methods: {
      getInfo: function (event) {
        var vm = this;
        this.$http.get('/cus/user/info')
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.data = response.data;
            } else {
              vm.$toast(response.msg);
            }
          })
      }
    }
  }
</script>

<style scoped>

  .box{
    position: absolute;
    background-color: #F5F7FA;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }

  .box .top{
    position: absolute;
    height: 16rem;
    top: 0px;
    left: 0px;
    right: 0px;
    background-image: linear-gradient(0deg,
    rgba(248, 86, 151, 1) 0%,
    rgba(242, 80, 64, 1) 100%),
    linear-gradient(
      rgba(29, 163, 129, 1),
      rgba(29, 163, 129, 1));
    background-blend-mode: normal,
    normal;
  }
  .box .top .content1{
    width:5.5rem;
    height:7.5rem;
    margin: 0 auto;
    margin-top: 4rem;
  }
  .box .top .content1 .header{
    width:5.5rem;
    height:5.5rem;
    background:url(/static/cus/img/my/header.png) no-repeat center center;
    background-size: contain;
  }
  .box .top .content1 .name{
    width:5.5rem;
    height:2rem;
    font-size: 1.4rem;
    color: #ffffff;
    text-align: center;
    margin-top: 1rem;
  }

  .box .bottom{
    position: absolute;
    top: 16rem;
    left:0px;
    right:0px;
  }
  .menus{
    margin-top: 1rem;
    background-color: #FFFFFF;
  }
  .url{
    display: block;
  }
  .menu{
    height:3.1rem;
    letter-spacing: 0px;
    color: #333333;
    border-bottom: 1px solid rgba(230, 233, 237, 1);
    font-size: 1.1rem;
  }
  .menu .icon{
    float: left;
    width:1.2rem;
    height: 1.2rem;
    margin-top:0.95rem;
    margin-left: 1.2rem;
    background-color: #bfc1c4;
  }
  .menu .icon1{background:url(/static/cus/img/my/1.png) no-repeat center center; background-size: contain;}
  .menu .icon2{background:url(/static/cus/img/my/2.png) no-repeat center center; background-size: contain;}
  .menu .icon3{background:url(/static/cus/img/my/3.png) no-repeat center center; background-size: contain;}
  .menu .icon4{background:url(/static/cus/img/my/4.png) no-repeat center center; background-size: contain;}
  .menu .icon5{background:url(/static/cus/img/my/5.png) no-repeat center center; background-size: contain;}
  .menu .icon6{background:url(/static/cus/img/my/6.png) no-repeat center center; background-size: contain;}


  .menu .title{
    float: left;
    margin-left: 1rem;
    line-height: 3.2rem;
  }



</style>
