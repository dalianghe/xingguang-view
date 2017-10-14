<template>
  <div class="box">
    <div class="top clears">
      <div class="title">我的银行卡</div>
      <router-link class="button clears" to="addbank">
        <img class="img" src="static/img/add.png"/>
      </router-link>
    </div>
    <div class="bank_box">
      <transition-group name="bounce" tag="p">
        <div class="bank clears" v-for="obj in bankList" v-show="obj.cusBankCard.status == 1" key="obj.cusBankCard.id">
          <div class="icon_box">
            <img class="icon" src="static/img/bank/zhongguo.png"/>
          </div>
          <div class="detail">
            <div class="title">{{ obj.cusBank.name }}</div>
            <div>
              <div class="name">张三的的</div>
              <div class="phone">{{ obj.cusBankCard.phone }}</div>
            </div>
            <div class="bank_no">**** **** **** {{ obj.cusBankCard.cardNo }}</div>
          </div>
          <div class="unbind">
            <a class="list_button" href="javascript:;" @click="unbind(obj.cusBankCard.id)">解绑</a>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'register',
    data() {
      return {
        bankList: []
      }
    },
    mounted: function () {
      this.getList();
    },
    methods: {
      getList: function () {
        var vm = this;
        this.$http.get('/bank/cards')
          .then(function (response) {
            vm.bankList = response.data;
          })
      },
      unbind: function (id) {
        var vm = this;
        MessageBox.confirm('确定要解绑银行卡吗?').then(action => {
          this.$http.delete('/bank/cards/' + id)
            .then(function (response) {
              if (response.bizCode == 0) {
                for (var bank of vm.bankList) {
                  if (bank.id == id) {
                    bank.cusBankCard.status = 2;
                    break;
                  }
                }
                vm.$toast("解绑成功!");
              } else {
                vm.$toast("解绑失败!");
              }
            })
        }).catch(err => {

        });
      },
      showMsgbox: function () {

      }
    }
  }
</script>

<style scoped>
  .box {
    width: 100%;
    height: 100%;
    margin: 0px;
    padding: 0rem;
    font-size: 1rem;
    font-family: "Microsoft YaHei", Arial, Helvetica, sans-serif, "宋体";
  }

  .box .bank_box {
    background: #d0d0d0;
    background-clip: content-box;
  }

  .box .bank {
    background: #FFFFFF;
    margin-bottom: 0.3rem;
    /*border-bottom: 1px solid #999;*/
    box-shadow: 1px 1px 2px #666;
  }

  .box .top {
    margin: 0rem 0;
    padding: 0.8rem;
    border-bottom: 1px solid #999999;
  }

  .box .top .title {
    float: left;
    font-size: 1rem;
    font-weight: 300;
    maring-right: 1rem;
  }

  .box .top .button {
    float: right;
  }

  .box .top .button .img {
    height: 1.3rem;
  }

  .box .bank_box .icon_box {
    float: left;
    margin: 1rem 0rem 1rem 1rem;
  }

  .box .bank_box .icon_box .icon {
    height: 3rem;
  }

  .box .bank_box .detail {
    float: left;
    margin: 0.5rem;
  }

  .box .bank_box .detail .title {
    margin-left: 1rem;
    display: inline-block;
    font-size: 1.2rem;
    line-height: 1.6rem;
  }

  .box .bank_box .detail .name {
    margin-left: 1rem;
    display: inline-block;
    font-size: 0.8rem;
    color: #666;
    line-height: 1.6rem;
  }

  .box .bank_box .detail .phone {
    margin-left: 0.2rem;
    display: inline-block;
    font-size: 0.8rem;
    color: #666;
    line-height: 1.6rem;
  }

  .box .bank_box .detail .bank_no {
    margin-left: 1rem;
    font-size: 1rem;
    line-height: 1.6rem;
  }

  .box .bank_box .unbind {
    float: right;
    padding-top: 2rem;
    padding-right: 1rem;
  }

  .list_button {
    text-decoration: none;
    outline: none;
    font-size: 0.8rem;
    color: #a43b3b;
    padding: 0.3rem 1rem;
    border-radius: 0.5rem;
    display: inline-block;
    background-clip: padding-box;
    transition-duratio: 0.2s;
    background-color: #f6f8fa;
    box-shadow: 0 0 1px #b8bbbf;
  }

  .clears:after {
    content: "\0020";
    display: block;
    height: 0;
    clear: both;
  }

  .clears {
    zoom: 1;
  }

  .slide-fade-enter-active {
    transition: all .3s ease;
  }

  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }

  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */
  {
    transform: translateX(10px);
    opacity: 0;
  }

  .list-item {
    display: inline-block;
    margin-right: 10px;
  }

  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }

  .list-enter, .list-leave-to
    /* .list-leave-active for below version 2.1.8 */
  {
    opacity: 0;
    transform: translateX(30px);
  }

  .bounce-enter-active {
    animation: bounce-in .8s;
  }

  .bounce-leave-active {
    animation: bounce-out 1s reverse;
  }

  @keyframes bounce-in {
    0% {
      transform: scale(0.5);
    }
    80% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

  @keyframes bounce-out {
    0% {
      transform: scale(0);
    }
    90% {
      transform: scale(1.1);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
