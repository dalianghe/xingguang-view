<template>
  <div class="box">
    <dl>
      <dt>姓名</dt>
      <dd>
        <input type="text" v-model="data.name"/>
      </dd>
    </dl>
    <dl>
      <dt>身份这号</dt>
      <dd>
        <input type="text" v-model="data.idNo"/>
      </dd>
    </dl>

    <button v-on:click="submit">确定</button>
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
    },
    methods: {
      submit: function (event) {
        var vm = this;
        this.$http.post('/auth/real', vm.data)
          .then(function (response) {
            if (response.bizCode == 0) {
              vm.$toast("认证成功");
              vm.$router.push("/creditapply");
            } else {
              vm.$toast(response.msg);
            }
          })
      }
    }
  }
</script>

<style scoped>
  dl, dr, dd {
    display: block;
  }

  dl {
    overflow: hidden;
    width: 400px;
  }

  dt {
    width: 60px;
    float: left;
  }

  dd {
    margin: 0;
    padding: 0;
    float: left;
  }

</style>
