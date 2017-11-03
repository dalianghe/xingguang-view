<template>
  <div class="box">
    <div class="content">
      <div class="input">
        <dl>
          <dt>姓名</dt>
          <dd>
            <input class="text" type="text" v-model="data.name"/>
          </dd>
        </dl>
        <dl>
          <dt>身份这号</dt>
          <dd>
            <input class="text" type="text" v-model="data.idNo"/>
          </dd>
        </dl>
      </div>
      <div class="img">
        <input type="file" ref="realImg1"/>
        <input type="file" ref="realImg2"/>
        <input type="file" ref="realImg3"/>
        <button v-on:click="submit">确定</button>
      </div>
    </div>
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

  .box{

  }

  .box .content .input{
    position: absolute;
    top:0px;
    left:0px;
    right:0px;
    height: 20rem;
  }

  .box .content .input .text{
    border: none;
    height: 2.5rem;
  }

  dl, dt, dd {
    display: block;
  }

  dl {
    overflow: hidden;
    width: 94%;
    margin: 0 auto;
    height: 2.5rem;
    border-bottom: 1px solid rgba(230, 233, 237, 1);
  }

  dt {
    width: 30%;
    float: left;
    color: #999999;
    line-height: 2.5rem;
  }

  dd {
    margin: 0;
    padding: 0;
    float: left;
    color: #333333;
    line-height: 2.5rem;
  }

  .box .content .img{
    position: absolute;
    top:20rem;
    left:0px;
    right:0px;
    height: 20rem;
  }

</style>
