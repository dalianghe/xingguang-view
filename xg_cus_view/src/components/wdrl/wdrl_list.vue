<template>
  <div class="box">
    <div class="row clears" v-for="obj in wdrlList">
      <div class="title clears">
        <div class="left clears">订单号：2226833</div>
        <div class="right right1 clears" v-if="obj.">未结清</div>
        <div class="right right2 clears">已结清</div>
        <div class="right right3 clears">已逾期</div>
      </div>
      <div class="content">
        <div class="left">
          <p>
            <label>提款金额</label>
            <span>30000.00</span>
          </p>
          <p>
            <label>提款日起</label>
            <span>2017-10-29</span>
          </p>
          <p>
            <label>到期日期</label>
            <span>2017-12-29</span>
          </p>
        </div>
        <div class="right">
          <a>还款记录</a>
        </div>
      </div>
    </div>

    <div class="row clears">
      <div class="title clears">
        <div class="left clears">订单号：2226833</div>
        <div class="right right2 clears">已结清</div>
      </div>
      <div class="content">
        <div class="left">
          <p>
            <label>提款金额</label>
            <span>30000.00</span>
          </p>
          <p>
            <label>提款日起</label>
            <span>2017-10-29</span>
          </p>
          <p>
            <label>到期日期</label>
            <span>2017-12-29</span>
          </p>
        </div>
        <div class="right">
          <a>还款记录</a>
        </div>
      </div>
    </div>

    <div class="row clears">
      <div class="title clears">
        <div class="left clears">订单号：2226833</div>
        <div class="right right3 clears">已逾期</div>
      </div>
      <div class="content">
        <div class="left">
          <p>
            <label>提款金额</label>
            <span>30000.00</span>
          </p>
          <p>
            <label>提款日起</label>
            <span>2017-10-29</span>
          </p>
          <p>
            <label>到期日期</label>
            <span>2017-12-29</span>
          </p>
        </div>
        <div class="right">
          <a>还款记录</a>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  var math = require('mathjs');
  export default {
    name: 'wdrl_apply',
    data() {
      return {
        data: {
        },
        wdrlList:[]
      }
    },
    mounted: function () {
      this.getList();
    },
    methods: {
      getList: function (event) {
        var vm = this;
        this.$http.get('/wdrl/apply/list')
        .then(function (response) {
          vm.wdrlList = response.data;
        })
      }
    }
  }
</script>

<style scoped>
  .box{
    position: absolute;
    padding-top:0.05rem;
    background-color: #F5F7FA;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }
  .box .row{
    background-color: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 0px 0px
      rgba(230, 233, 237, 1),
      inset 0px 1px 0px 0px
      rgba(230, 233, 237, 1)
  }

  .box .row .title{
    margin-top: 1rem;
    margin-bottom: 0.1rem;
  }

  .box .row .title .left{
    float: left;
    margin-left: 1rem;
    font-size: 0.8rem;
    color: #999999;
    line-height: 2rem;
    letter-spacing: 0;
  }


  .box .row .title .right{
    float: right;
    margin-right: 1rem;
    margin-top: 0.45rem;
    display: block;
    width: 3rem;
    height: 1.1rem;
    font-size: 0.8rem;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    line-height: 1.1rem;
    text-align: center;
    border-radius: 2px 2px 2px 2px;

  }

  .box .row .title .right1{
    color: #ff6401;
    background-color: rgba(255, 247, 243, 1);
    border: solid 1px rgba(255, 100, 1, 0.4);
  }

  .box .row .title .right2{
    color: #f10216;
    background-color: #FEE5E7;
    border: solid 1px rgba(241, 2, 22, 0.4);
  }

  .box .row .title .right3{
    color: #37bc9b;
    background-color: #ECFAF7;
    border: solid 1px rgba(72, 207, 173, 0.4);
  }

  .box .row .content{
    margin: 0 1rem;
    /*border-bottom: 1px solid rgba(230, 233, 237, 1);*/
    border-bottom: 1px solid rgb(242, 245, 249);
  }

  .box .row .content .left{
    float: left;
    color: #666666;
    font-size: 0.9rem;
  }

  .box .row .content p{
    line-height: 0.6rem;
  }

  .box .row .content span{
    margin-left: 0.6rem;
  }

  .box .row .content .right{
    float: right;
  }

  .box .row .content .right a{
    display: inline-block;
    margin-top:1.7rem;
    width: 4.8rem;
    height: 1.5rem;
    border-radius: 3px 3px 3px 3px;
    border: solid 1px rgba(241, 2, 22, 1);
    opacity: 0.5;
    line-height: 1.5rem;
    text-align: center;
    font-size: 0.9rem;
    font-weight: bolder;
    color: #f10216;
  }

</style>
