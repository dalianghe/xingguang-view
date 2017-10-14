<template>
  <div class="register">
    <input type="text" v-model="data.phone"/>
    <input type="text" v-model="data.imgCode"/>
    <input type="text" v-model="data.smsCode"/>
    <button v-on:click="submit">提交</button>
  </div>
</template>

<script>

  export default {
    name: 'register',
    data() {
      return {
        data: {
          phone: "",
          imgCode: "",
          smsCode: ""
        }
      }
    },
    created: function () {
      this.data.workUserId = this.$route.params.key;
    },
    methods: {
      submit: function (event) {
        var vm = this;
        this.$http.post('/auth/register', vm.data)
          .then(function (response) {
            if (response.bizCode == 0) {
              let token = response.data;
              if (token) {
                localStorage.setItem("token", token);
              }
              vm.$toast("注册成功");
              vm.$router.push("/real");
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
  .register {
  }
</style>
