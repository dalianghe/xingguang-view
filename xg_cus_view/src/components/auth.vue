<template>
  <div class="auth">
  </div>
</template>

<script>
export default {
  name: 'register',
  data () {
    return {
      code:""
    }
  },
  created: function () {
    this.code = this.$route.params.code;
    this.getAuth();
  },
  methods: {
    getAuth: function (event) {
      alert(111);
      var vm = this;
      this.$http.get('/wx/auth/' + vm.code)
      .then(function (response) {
        alert(222);
        let data = response.data;
        if(data){
          if(data.token){
            localStorage.setItem("_cusToken", data.token);
          }
          if(data.openId){
            localStorage.setItem("_openId", data.openId);
          }
          vm.$router.go(-1);
        }else{
          alert("认证失败");
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
