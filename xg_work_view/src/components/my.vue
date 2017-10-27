<template>
  <div class="box">
    <dl>
      <dt>姓名</dt>
      <dd>
        <input type="text" v-model="data.name"/>
      </dd>
    </dl>

    <router-link to="/">我的客户</router-link>
    <router-link to="/">借款攻略</router-link>
    <router-link to="/">了解星光</router-link>
    <router-link to="/">常见问题</router-link>
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
