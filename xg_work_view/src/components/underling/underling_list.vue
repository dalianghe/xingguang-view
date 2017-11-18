<template>
  <div class="box">
    <div class="top clears">
      <div class="title">我的下线</div>
      <router-link class="button clears" to="/underlingqr">
        <img class="img" src="/static/work/img/my/underling_qr.png"/>
      </router-link>
    </div>
    <div v-show="list.length == 0" class="contentAlert">
      <div class="img unlist"></div>
      <div class="msg">暂无数据</div>
    </div>
    <div class="bank_box">
        <div class="bank clears" v-for="obj in list">
          <div class="icon_box">
            <img class="icon" :src="'/static/work/img/my/header.png'" />
          </div>
          <div class="detail">
            <div class="title">{{obj.name}}</div>
            <div>
              <div class="name">{{obj.provinceName}}-{{obj.cityName}}</div>
              <div class="phone">{{obj.phone}}</div>
            </div>
            <div v-if="obj.status == 1" class="bank_no">审核中...</div>
            <div v-else-if="obj.status == 2" class="bank_no">
              <span v-if="obj.enableStatus == 1">停用</span>
              <span v-else>审核通过</span>
            </div>
            <div v-else class="bank_no">审核不通过</div>
          </div>
          <div class="unbind">
            <!--<a class="list_button" href="javascript:;" @click="unbind(obj.cusBankCard.id)">解绑</a>-->
          </div>
        </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'banklist',
    data() {
      return {
        list: []
      }
    },
    mounted: function () {
      this.getList();
    },
    methods: {
      getList: function () {
        var vm = this;
        this.$http.get('/info/myowner/' + localStorage.getItem("_workUserId"))
          .then(function (response) {
            vm.list = response.data;
          })
      }
    }
  }
</script>

<style scoped>

  .box .bank_box {

  }

  .box .bank {
    background: #FFFFFF;
    margin-bottom: 1rem;
    border-bottom: 1px solid rgba(230, 233, 237, 1);
    box-shadow: 1px 1px 2px rgba(230, 233, 237, 1);
  }

  .box .top {
    margin: 0rem 0;
    padding: 0.8rem;
    border-bottom: 1px solid #999999;
  }

  .box .top .title {
    float: left;
    font-size: 1rem;
    font-weight: 300;
    maring-right: 1rem;
  }

  .box .top .button {
    float: right;
  }

  .box .top .button .img {
    height: 1.3rem;
  }

  .box .bank_box .icon_box {
    float: left;
    margin: 1rem 0rem 1rem 1rem;
  }

  .box .bank_box .icon_box .icon {
    height: 3rem;
  }

  .box .bank_box .detail {
    float: left;
    margin: 0.5rem;
  }

  .box .bank_box .detail .title {
    margin-left: 1rem;
    display: inline-block;
    font-size: 1rem;
    line-height: 1.6rem;
  }

  .box .bank_box .detail .name {
    margin-left: 1rem;
    display: inline-block;
    font-size: 0.8rem;
    color: #999999;
    line-height: 1.6rem;
  }

  .box .bank_box .detail .phone {
    margin-left: 0.2rem;
    display: inline-block;
    font-size: 0.8rem;
    color: #999;
    line-height: 1.6rem;
  }

  .box .bank_box .detail .bank_no {
    margin-left: 1rem;
    font-size: 1rem;
    color: #666;
    line-height: 1.6rem;
    letter-spacing: 0.15rem;
  }

  .box .bank_box .unbind {
    float: right;
    padding-top: 2rem;
    padding-right: 1rem;
  }

  .list_button {
    text-decoration: none;
    outline: none;
    font-size: 0.8rem;
    color: #a43b3b;
    padding: 0.3rem 1rem;
    border-radius: 0.2rem;
    display: inline-block;
    background-clip: padding-box;
    transition-duratio: 0.2s;
    background-color: #f6f8fa;
    box-shadow: 0 0 1px #b8bbbf;
  }

</style>
