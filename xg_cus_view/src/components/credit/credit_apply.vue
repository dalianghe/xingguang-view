<template>
  <div class="box">
    <dl>
      <dt>性别</dt>
      <dd v-for="option in options['101']">
        <input :name="option.typeId" type="radio" v-model="data.cusUserInfo.sex" :value="option.code" /> <label>{{ option.name }}</label>
      </dd>
    </dl>
    <dl>
      <dt>学历</dt>
      <dd v-for="option in options['104']">
        <input :name="option.typeId" type="radio" v-model="data.cusUserInfo.education" :value="option.code" /> <label>{{ option.name }}</label>
      </dd>
    </dl>
    <dl>
      <dt>职业</dt>
      <dd v-for="option in options['105']">
        <input :name="option.typeId" type="radio" v-model="data.cusUserInfo.occupation" :value="option.code" /> <label>{{ option.name }}</label>
      </dd>
    </dl>
    <dl>
      <dt>收入</dt>
      <dd v-for="option in options['103']">
        <input :name="option.typeId" type="radio" v-model="data.cusUserInfo.income" :value="option.code" /> <label>{{ option.name }}</label>
      </dd>
    </dl>
    <dl>
      <dt>联系人姓名</dt>
      <dd>
        <input type="text" v-model="data.cusUserLink.linkName"/>
      </dd>
    </dl>
    <dl>
      <dt>联系人电话</dt>
      <dd>
        <input type="text" v-model="data.cusUserLink.phone"/>
      </dd>
    </dl>
    <dl>
      <dt>联系人关系</dt>
      <dd v-for="option in options['102']">
        <input :name="option.typeId" type="radio" v-model="data.cusUserLink.relationId" :value="option.code" /> <label>{{ option.name }}</label>
      </dd>
    </dl>
    <dl>
      <dt>地址信息</dt>
      <dd>
        <input type="text" v-model="data.cusUserInfo.cusAddr"/>
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
        data: {
          creditApply:{},
          cusUserInfo:{},
          cusUserLink:{}
        },
        options:{}
      }
    },
    mounted: function () {
      this.getCodes();
    },
    methods: {
      getCodes: function (event) {
        var vm = this;
        this.$http.get('/codes', {
          params: {
            typeIds: "101,102,103,104,105"
          }
        })
        .then(function (response) {
          vm.options = response.data;
        })
      },
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
    margin: 0;padding: 0;
    float: left;
  }

</style>
