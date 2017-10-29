<template>
  <div class="box">
    <div class="top">
      <div class="content">
        <div class="header"></div>
        <div class="name">{{data.name}}</div>
      </div>
    </div>
    <div class="bottom">
      <div class="menus">
        <router-link class="url clears" to="/creditinfo">
          <div class="menu">
            <div class="icon"></div>
            <div class="title">我的授信</div>
            <div class="arrow"></div>
          </div>
        </router-link>
        <router-link class="url clears" to="/wdrllist">
          <div class="menu">
            <div class="icon"></div>
            <div class="title">我的借款</div>
            <div class="arrow"></div>
          </div>
        </router-link>
        <router-link class="url clears" to="/banks">
          <div class="menu">
            <div class="icon"></div>
            <div class="title">银行卡管理</div>
            <div class="arrow"></div>
          </div>
        </router-link>
      </div>
      <div class="menus">
        <router-link class="url clears" to="/wdrllist">
          <div class="menu">
            <div class="icon"></div>
            <div class="title">借款攻略</div>
            <div class="arrow"></div>
          </div>
        </router-link>
        <router-link class="url clears" to="/">
          <div class="menu">
            <div class="icon"></div>
            <div class="title">了解星光</div>
            <div class="arrow"></div>
          </div>
        </router-link>
        <router-link class="url clears" to="/banks">
          <div class="menu">
            <div class="icon"></div>
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
  .box .top .content{
    width:5.5rem;
    height:7.5rem;
    margin: 0 auto;
    margin-top: 4rem;
  }
  .box .top .content .header{
    width:5.5rem;
    height:5.5rem;

  }
  .box .top .content .name{
    width:5.5rem;
    height:2rem;
    font-size: 1.4rem;
    color: #ffffff;
    text-align: center;
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
    width:1.8rem;
    height: 1.8rem;
    margin-top:0.7rem;
    margin-left: 1.2rem;
    background-color: #bfc1c4;
  }
  .menu .title{
    float: left;
    margin-left: 1rem;
    line-height: 3.2rem;
  }

  .menu .arrow{
    float: right;
    margin-top: 1.2rem;
    margin-right: 1.2rem;
    border-right: 1px solid silver;
    border-bottom: 1px solid silver;
    width: 0.7rem;
    height: 0.7rem;
    transform: rotate(-45deg);
  }


</style>
