<template>
  <div class="box">
    <div class="top clears">
      <div class="title">我的银行卡</div>
      <router-link class="button clears" to="addbank">
        <img class="img" src="/static/cus/img/add.png"/>
      </router-link>
    </div>
    <div v-show="list.length == 0" class="contentAlert">
      <div class="img unlist"></div>
      <div class="msg">暂无数据</div>
    </div>
    <div class="bank_box">
      <transition-group name="root" tag="p" mode="out-in">
        <div :class="{ bank: true, clears: true, def: obj.cusBankCard.isDefault == 1 }" v-for="obj in list" v-show="obj.cusBankCard.status == 1" key="obj.cusBankCard.id">
          <div class="icon_box">
            <img class="icon" :src="'/static/cus/img/bank/'+ obj.cusBank.path + '.png'" />
          </div>
          <div class="detail">
            <div class="title">{{ obj.cusBank.name }}</div>
            <div>
              <div class="name">{{myName}}</div>
              <div class="phone">{{ obj.cusBankCard.phone }}</div>
            </div>
            <div class="bank_no">**** **** **** {{ obj.cusBankCard.cardNo }}</div>
          </div>
          <div class="unbind">
            <a class="list_button" href="javascript:;" v-if="obj.cusBankCard.isDefault == 2" @click="def(obj.cusBankCard.id)">默认</a>
            <a class="list_button" href="javascript:;" @click="unbind(obj.cusBankCard.id)">解绑</a>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'banklist',
    data() {
      return {
        myName:"",
        list: []
      }
    },
    mounted: function () {
      this.getList();
      this.getInfo();
    },
    methods: {
      getList: function () {
        var vm = this;
        this.$http.get('/bank/cards')
          .then(function (response) {
            vm.list = response.data;
          })
      },
      unbind: function (id) {
        var vm = this;
        vm.$messagebox.confirm('确定要解绑银行卡吗?').then(action => {
          this.$http.delete('/bank/cards/' + id)
            .then(function (response) {
              if (response.bizCode == 0) {
                for (var bank of vm.list) {
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
      getInfo: function (event) {
        var vm = this;
        this.$http.get('/cus/user/info')
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.myName = response.data.name;
            } else {
              vm.$toast(response.msg);
            }
          })
      },
      def: function (id) {
        var vm = this;
        vm.$messagebox.confirm('确定要设为默认账户吗?').then(action => {
          this.$http.patch('/bank/cards/' + id + '/def')
            .then(function (response) {
              if (response.bizCode == 0) {
                let k = 0;
                let bank;
                for (var i = 0; i < vm.list.length; i++) {
                  bank = vm.list[i]
                  if (bank.id == id) {
                    k = i;
                    bank.cusBankCard.isDefault = 1;
                  }else{
                    bank.cusBankCard.isDefault = 2;
                  }
                }
                //vm.list.splice(k, 1);
                //vm.list.unshift(bank);
                vm.$toast("设置成功!");
              } else {
                vm.$toast("设置失败!");
              }
            })
        }).catch(err => {

        });
      }
    }
  }
</script>

<style scoped>

  .box .bank_box {

  }

  .box .bank {
    background: #FFFFFF;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(230, 233, 237, 1);
    border-top: 1px solid rgba(230, 233, 237, 1);
    box-shadow: 1px 1px 2px rgba(230, 233, 237, 1);
  }

  .box .def{
    background:rgba(255,255,255,5) url(/static/cus/img/def.png) no-repeat center center;
    background-size: 4rem 4rem;
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
    background-color: rgba(255, 255, 255, 0.6);
  }

  .box .bank_box .detail .title {
    margin-left: 1rem;
    display: inline-block;
    font-size: 1rem;
    line-height: 1.6rem;
  }

  .box .bank_box .detail .name {
    margin-left: 1rem;
    display: inline-block;
    font-size: 0.8rem;
    color: #666666;
    line-height: 1.6rem;
  }

  .box .bank_box .detail .phone {
    margin-left: 0.2rem;
    display: inline-block;
    font-size: 0.8rem;
    color: #666666;
    line-height: 1.6rem;
  }

  .box .bank_box .detail .bank_no {
    margin-left: 1rem;
    font-size: 1rem;
    color: #666666;
    line-height: 1.6rem;
    letter-spacing: 0.15rem;
  }

  .box .bank_box .unbind {
    float: right;
    padding-top: 1rem;
    padding-right: 1rem;
  }

  .list_button {
    text-decoration: none;
    outline: none;
    font-size: 0.8rem;
    color: #a43b3b;
    padding: 0.3rem 0.8rem;
    border-radius: 0.2rem;
    display: block;
    background-clip: padding-box;
    transition-duratio: 0.2s;
    background-color: #f6f8fa;
    box-shadow: 0 0 1px #b8bbbf;
    text-align: center;
    margin-bottom: 0.5rem;
  }

</style>
