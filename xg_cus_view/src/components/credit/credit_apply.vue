<template>
  <div class="box">
    <div class="bzbox">
      <div class="bz bzimg"></div>
    </div>
    <div class="content">
      <div class="input">
        <dl>
          <dt>服务密码</dt>
          <dd>
            <input class="text" type="password"/>
          </dd>
        </dl>
      </div>
    </div>
    <div class="btns">
      <div class="btnbox">
        <a v-on:click="submit">完成</a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'credit_apply',
    data() {
      return {
        data: {
        }
      }
    },
    mounted: function () {
    },
    methods: {
      submit: function (event) {
        var vm = this;
        this.$http.post('/credit/apply', vm.data)
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.$toast("授信申请已提交,请耐心等待!");
            }else{
              vm.$toast(response.msg);
            }
          })
      }
    }
  }
</script>

<style scoped>
  .box .bzimg{
    background:url(/static/img/information/bz.png) no-repeat center center;
    background-size: 100% auto
  }
</style>
