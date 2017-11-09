<template>
  <div class="register">
    <input type="text" v-model="phone"/>
    <input type="text" v-model="smsCode"/>
    <button v-on:click="submit">提交</button>
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      phone:"",
      smsCode:""
    }
  },
  methods: {
    submit: function (event) {
      var vm = this;
      this.$http.post('/auth/login', vm.$data)
      .then(function (response) {
        let token = response.data;
        if(token){
          localStorage.setItem("_workToken", token);
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
