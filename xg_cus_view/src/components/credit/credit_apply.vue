<template>
  <div class="credit_apply">
    <mt-radio
      title="单选框列表"
      v-model="value"
      :options="options">
    </mt-radio>

    性别<input type="text" v-model="data.sex"/>
    收入<input type="text" v-model="data.income"/>
    职业<input type="text" v-model="data.occupation"/>
    学历<input type="text" v-model="data.education"/>
    联系人姓名<input type="text" v-model="data.linkName"/>
    联系人关系<input type="text" v-model="data.relationId"/>
    联系人电话<input type="text" v-model="data.phone"/>
    地址信息<input type="text" v-model="data.cusAddr"/>
    业务员<input type="text" v-model="data.workUserName"/>

    <button v-on:click="submit">提交</button>
  </div>
</template>

<script>
  import { Radio } from 'mint-ui';

  export default {
    name: 'credit_apply',
    data() {
      return {
        data: {},
        options:[]
      }
    },
    mounted: function () {
      this.options = [
        {
          label: '被禁用',
          value: '值F',
          disabled: true
        },
        {
          label: '选项A',
          value: '值A'
        },
        {
          label: '选项B',
          value: '值B'
        }
      ];
      this.getCode();
    },
    methods: {
      getCode: function (event) {
        var vm = this;
        this.$http.get('/codes', {
          params: {
            typeIds: "101,102,103,104,105"
          }
        })
          .then(function (response) {
            console.log(response);
          })
      },
      submit: function (event) {
        var vm = this;
        this.$http.get('/codes', {
          params: {
            typeIds: "101,102,103,104,105"
          }
        })
        .then(function (response) {

        })
      }
    }
  }
</script>

<style scoped>
  .credit_apply {
  }
</style>
