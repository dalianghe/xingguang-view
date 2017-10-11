<template>
  <div class="credit_apply">
    性别<input type="text" v-model="data.sex"/>
    收入<input type="text" v-model="data.income"/>
    职业<input type="text" v-model="data.occupation"/>
    学历<input type="text" v-model="data.education"/>
    联系人姓名<input type="text" v-model="data.linkName"/>
    联系人关系<input type="text" v-model="data.relationId"/>
    联系人电话<input type="text" v-model="data.phone"/>
    地址信息<input type="text" v-model="data.cusAddr"/>
    业务员<input type="text" value="{{data.workUserName}}"/>

    <button v-on:click="submit">提交</button>
  </div>
</template>

<script>
export default {
  name: 'credit_apply',
  data () {
    return {
      data:{}
    }
  },
  methods: {
    submit: function (event) {
      var vm = this;
      this.$http.post('/auth/register', vm.$data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (response) {
        console.log(response);
      });


    }
  }
}
</script>

<style scoped>
.credit_apply{}
</style>
