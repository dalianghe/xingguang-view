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
    <input type="file" ref="realImg1"/>
    <input type="file" ref="realImg2"/>
    <input type="file" ref="realImg3"/>
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
        let formData = new window.FormData()
        this.$tools.cloneFormData(formData, vm.data);
        formData.append('img1', vm.$refs.realImg1.files[0]);
        formData.append('img2', vm.$refs.realImg2.files[0]);
        formData.append('img3', vm.$refs.realImg3.files[0]);
        this.$http.post('/auth/real', formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        })
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
