<template>
  <div class="box">
    <div class="bzbox">
      <div class="bz bzimg"></div>
    </div>
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
      <div class="imgs">
        <div class="imgbox">
          <div class="idno">
            <div class="idno1" ref="realImgDiv1" v-on:click="selectImg('realImg1')"></div>
            <label>身份证正面</label>
          </div>
          <div class="idno">
            <div class="idno2" ref="realImgDiv2" v-on:click="selectImg('realImg2')"></div>
            <label>身份证背面</label>
          </div>
          <div class="idno">
            <div class="idno3" ref="realImgDiv3" v-on:click="selectImg('realImg3')"></div>
            <label>手持身份证</label>
          </div>
          <input v-show="false" type="file" ref="realImg1" v-on:change="changeImg('realImgDiv1')"/>
          <input v-show="false" type="file" ref="realImg2" v-on:change="changeImg('realImgDiv2')"/>
          <input v-show="false" type="file" ref="realImg3" v-on:change="changeImg('realImgDiv3')"/>
        </div>
      </div>
      <div class="btns">
        <div class="btnbox">
          <a v-on:click="submit">下一步</a>
        </div>
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
      selectImg: function(img){
        let imgFile = this.$refs[img];
        imgFile.click();
      },
      changeImg: function(imgDiv){
        var imgDiv = this.$refs[imgDiv];
        var imgFile = event.currentTarget.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(imgFile);
        reader.onload=function(e){
          imgDiv.setAttribute('style', 'background: ' + 'url('+e.target.result+') no-repeat center center; background-size: contain');
        }
      },
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

  .box .bzimg{
    background:url(/static/img/real/bz.png) no-repeat center center;
    background-size: 100% auto
  }

  .box .content .imgs{
    margin-top: 1.5rem;
  }

  .box .content .imgs .imgbox{
    width: 94%;
    margin: 0 auto;
  }

  .idno{
    display: inline-block;
    width: 31%;
    height: 8rem;
    align-content: center;
    text-align:center
  }
  .idno label{
    display: block;
    color: #999999;
    margin-top:1rem;
  }

  .idno1{
    background:url(/static/img/real/idno1.png) no-repeat center center;
    background-size: contain;
    height: 5rem;
  }
  .idno2{
    background:url(/static/img/real/idno2.png) no-repeat center center;
    background-size: contain;
    height: 5rem;
  }
  .idno3{
    background:url(/static/img/real/idno3.png) no-repeat center center;
    background-size: contain;
    height: 5rem;
  }

</style>
