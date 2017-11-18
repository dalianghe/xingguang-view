<template>
  <div class="box">
    <div class="contentAlert">
      <div class="img ok"></div>
      <div class="msg">恭喜申请成功</div>
      <div v-if="backUrl != null" class="back">
        <a @click="back">前往个人中心</a>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'ok',
    data () {
      return {
        backUrl: null,
        data: {}
      };
    },
    created:function(){
      if(this.$route.params.key){
        this.backUrl = this.$route.params.key;
      }
    },
    mounted: function () {

    },
    methods: {
      back:function(){
        this.$router.push("/" + this.backUrl)
      }
    }
  }
</script>

<style scoped>

</style>
