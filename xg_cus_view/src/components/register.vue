<template>
  <div class="register">
    <input type="text" v-model="data.phone"/>
    <input type="text" v-model="data.imgCode"/>
    <input type="text" v-model="data.smsCode"/>
    <input v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
    <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
    <button v-on:click="submit">确定</button>
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
    },
    vuerify: {
      username: {
        test: /\w{4,}/,  // 自定义规则，可以是函数，正则或者全局注册的规则（填字符串）
        message: '至少 4 位字符'
      },
      password: 'required' // 使用全局注册的规则
    }
  }
</script>

<style scoped>
  .register {
  }
</style>
