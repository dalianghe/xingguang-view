<template>
  <div class="box">
    <div class="content clears">
      <mt-popup
        v-model="popupVisible"
        position="right">
        <div class="selectbox">
          <ul class="select"
            v-infinite-scroll="loadMore"
            infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
            <li class="option" v-for="obj in options">{{ obj.name }}</li>
          </ul>
        </div>
      </mt-popup>
      <div class="input">
        <dl>
          <dt @click="selectBank">银行卡</dt>
          <dd>
            <select v-model="data.bankId">
              <option v-for="obj in options" :value="obj.id">{{obj.name}}</option>
            </select>
          </dd>
        </dl>
        <dl>
          <dt>卡号</dt>
          <dd>
            <input type="text" class="text" v-model="data.cardNo"/>
          </dd>
        </dl>
        <dl>
          <dt>联系人电话</dt>
          <dd>
            <input type="text" class="text" v-model="data.phone"/>
          </dd>
        </dl>
      </div>
    </div>
    <div class="btns">
      <div class="btnbox">
        <a v-on:click="submit">确定</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'addbank',
    data() {
      return {
        popupVisible:false,
        data: {},
        options:[]
      };
    },
    mounted: function () {
      this.getBanks();
    },
    methods: {
      selectBank : function(){
        this.popupVisible = true;
      },
      getBanks: function (event) {
        var vm = this;
        this.$http.get('/banks')
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.options = response.data;
            }
          })
          .catch(function (response) {
          });
      },

      submit: function (event) {
        var vm = this;
        vm.$indicator.open();
        this.$http.post('/bank/cards', vm.$data.data)
          .then(function (response) {
            vm.$indicator.close();
            if (response.bizCode == 1) {
              vm.$toast("银行卡已存在");
            } else {
              vm.$toast("银行卡绑定成功");
              vm.$router.push("banklist");
            }
          })
          .catch(function (response) {
          });
      }
    }
  }
</script>

<style scoped>
  .box{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background-color: #F8F8F8;
  }

  .box .content{
    vertical-align: top;
    background-color: #FFF;
  }
  .box .content .input{
  }

  .box .content .input .text{
    border: none;
    height: 3.5rem;
  }

  dl, dt, dd {
    display: block;
  }

  dl {
    overflow: hidden;
    width: 92%;
    margin: 0 auto;
    height: 3.5rem;
    border-bottom: 1px solid rgba(230, 233, 237, 1);
  }

  dt {
    width: 30%;
    float: left;
    color: #999999;
    line-height: 3.5rem;
  }

  dd {
    margin: 0;
    padding: 0;
    float: left;
    color: #333333;
    line-height: 3.5rem;
  }

  .btns{
    margin-top: 1.5rem;
  }

  .btnbox{
    width: 94%;
    margin: 0 auto;
  }

  .btnbox a{
    display: block;
    color: #ffffff;
    background-color: rgba(241, 2, 22, 1);
    border-radius: 5px 5px 5px 5px;
    height: 3rem;
    text-align: center;
    line-height: 3rem;
    font-size: 1.2rem;
  }

  .selectbox{
    position: fixed;
    top:0px;
    bottom:0px;
    left:10rem;
    right:0px;
    z-index: 9999;
  }
  .selectbox ul{
    list-style: none outside none;
  }
  .selectbox ul li{
    text-align: center;
    border-bottom: 1px solid #eee;
    display: list-item;
    height: 3rem;
    line-height: 3rem;
  }

</style>
