<template>
  <div class="box">
    <select v-model="data.bankId">
      <option v-for="obj in options" :value="obj.id">{{obj.name}}</option>
    </select>
    <input v-model="data.cardNo"/>
    <input v-model="data.phone"/>
    <mt-button @click.native="submit" size="large" type="primary">确定</mt-button>
  </div>
</template>

<script>

  export default {
    name: 'addbank',
    data() {
      return {
        data: {},
        options:[]
      };
    },
    mounted: function () {
      this.getBanks();
    },
    methods: {

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
        this.$http.post('/bank/cards', vm.$data.data)
          .then(function (response) {
            if (response.bizCode == 1) {
              vm.$toast("银行卡已存在");
            } else {
              vm.$toast("银行卡绑定成功");
              vm.$router.push("banks");
            }
          })
          .catch(function (response) {
          });
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
</style>
