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
          <dt>身份证号</dt>
          <dd>
            <input class="text" type="text" @input="changeIdNo" v-model="data.idNo"/>
          </dd>
        </dl>
        <dl v-show="sexShow">
          <dt>性别</dt>
          <dd>
            <input class="text" type="text" readonly="readonly" v-model="data.sexName"/>
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
        data: {},
        sexShow: false
      }
    },
    mounted: function () {
    },
    methods: {
      changeIdNo: function(){
        if(this.$data.data.idNo.length == 18){
          if(parseInt(this.$data.data.idNo.substr(16, 1)) % 2 == 1){
            this.data.sexName = "男";
            this.data.sex = 101001;
          }else{
            this.data.sexName = "女";
            this.data.sex = 101002;
          }
          this.sexShow = true;
        }else{
          this.sexShow = false;
        }
      },
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
        if(!this.validate()){
          return;
        }
        var vm = this;
        let formData = new window.FormData();
        console.info(vm.data);
        this.$tools.cloneFormData(formData, vm.data);
        formData.append('img1', vm.$refs.realImg1.files[0]);
        formData.append('img2', vm.$refs.realImg2.files[0]);
        formData.append('img3', vm.$refs.realImg3.files[0]);
        vm.$indicator.open();
        this.$http.post('/auth/real', formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        })
        .then(function (response) {
          vm.$indicator.close();
          if (response.bizCode == 0) {
            vm.$toast("认证成功");
            localStorage.setItem("_cusName", vm.data.name);
            localStorage.setItem("_cusIdNo", vm.data.idNo);
            vm.$router.push("/creditapply");
          } else {
            vm.$toast(response.msg);
          }
        })
      },
      validate : function(){
        var vm = this;
        if(this.$tools.isNull(vm.data.name)){
          vm.$toast("请填写姓名");
          return false;
        }
        if(this.$tools.isNull(vm.data.idNo)){
          vm.$toast("请填写身份证号");
          return false;
        }
        if(this.$tools.isNull(vm.data.sexName)){
          vm.$toast("请填写合法的身份证号");
          return false;
        }
        if(vm.$refs.realImg1.value == ""){
          vm.$toast("请添加身份证正面");
          return false;
        }
        if(vm.$refs.realImg2.value == ""){
          vm.$toast("请添加身份证背面");
          return false;
        }
        if(vm.$refs.realImg3.value == ""){
          vm.$toast("请添加手持身份证");
          return false;
        }
        return true;
      }
    }
  }
</script>

<style scoped>

  .box .bzimg{
    background:url(/static/cus/img/real/bz.png) no-repeat center center;
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
    background:url(/static/cus/img/real/idno1.png) no-repeat center center;
    background-size: contain;
    height: 5rem;
  }
  .idno2{
    background:url(/static/cus/img/real/idno2.png) no-repeat center center;
    background-size: contain;
    height: 5rem;
  }
  .idno3{
    background:url(/static/cus/img/real/idno3.png) no-repeat center center;
    background-size: contain;
    height: 5rem;
  }

</style>
