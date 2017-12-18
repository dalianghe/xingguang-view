<template>
  <div class="box">
    <div class="bottom">
      <div class="menus">
        <a class="url clears" @click="sh('a0')">
          <div class="menu">
            <div class="icon icon1"></div>
            <div class="title">我的授信</div>
            <div class="arrow arrow2" v-bind:class="{ arrow2down: a0}"></div>
          </div>
        </a>
        <div class="answer" v-show="a0">
          一、标题部分：某某公司申请发票增量的申请 　　二、台头部分：某某国税局 　　三、本企业基本情况：成立日期、认定一般纳税人日期、法人、财务负责人姓名，经营地址、注册资金、主要经营项目。 　　四、本企业最近几个月的收入、税金、税负情况; 财务核算情况，是否按时纳税。 　　五、本企业发票的核定情况，以及最近几个月的发票使用情况;特别是增值税发票使用情况。 　　六、本企业申请发票增量的理由：有无大笔定单或合同，根据现有核定情况无法满足实际要求。 　　七、提出申请，根据我企业的实际情况，现申请发票增量。 　　八、落款：某某公司 　　九、日期：

          该文章《情况说明格式及范文》来源于出国留学网，
        </div>
        <a class="url clears" @click="sh('a1')">
          <div class="menu">
            <div class="icon icon2"></div>
            <div class="title">我的借款</div>
            <div class="arrow arrow2" v-bind:class="{ arrow2down: a1}"></div>
          </div>
        </a>
        <div class="answer" v-show="a1">
          一、标题部分：某某公司申请发票增量的申请 　　二、台头部分：某某国税局 　　三、本企业基本情况：成立日期、认定一般纳税人日期、法人、财务负责人姓名，经营地址、注册资金、主要经营项目。 　　四、本企业最近几个月的收入、税金、税负情况; 财务核算情况，是否按时纳税。 　　五、本企业发票的核定情况，以及最近几个月的发票使用情况;特别是增值税发票使用情况。 　　六、本企业申请发票增量的理由：有无大笔定单或合同，根据现有核定情况无法满足实际要求。 　　七、提出申请，根据我企业的实际情况，现申请发票增量。 　　八、落款：某某公司 　　九、日期：

          该文章《情况说明格式及范文》来源于出国留学网，
        </div>
        <a class="url clears" @click="sh('a2')">
          <div class="menu">
            <div class="icon icon3"></div>
            <div class="title">银行卡管理</div>
            <div class="arrow arrow2" v-bind:class="{ arrow2down: a2}"></div>
          </div>
        </a>
        <div class="answer" v-show="a2">
          一、标题部分：某某公司申请发票增量的申请 　　二、台头部分：某某国税局 　　三、本企业基本情况：成立日期、认定一般纳税人日期、法人、财务负责人姓名，经营地址、注册资金、主要经营项目。 　　四、本企业最近几个月的收入、税金、税负情况; 财务核算情况，是否按时纳税。 　　五、本企业发票的核定情况，以及最近几个月的发票使用情况;特别是增值税发票使用情况。 　　六、本企业申请发票增量的理由：有无大笔定单或合同，根据现有核定情况无法满足实际要求。 　　七、提出申请，根据我企业的实际情况，现申请发票增量。 　　八、落款：某某公司 　　九、日期：

          该文章《情况说明格式及范文》来源于出国留学网，
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'question',
    data() {
      return {
        a0:false,
        a1:false,
        a2:false,
        data: {}
      }
    },
    mounted: function () {
    },
    methods: {
      sh: function(type){
        this[type] = !this[type];
      }
    }
  }
</script>

<style scoped>

  .box{
    position: absolute;
    background-color: #F5F7FA;
    top: 0px;
    left: 0px;
    bottom: 0px;
    right: 0px;
  }

  .box .bottom{

  }
  .menus{
    margin-top: 1rem;
    background-color: #FFFFFF;
  }
  .url{
    display: block;
  }
  .menu{
    height:2.5rem;
    letter-spacing: 0px;
    color: #333333;
    border-top: 1px solid rgba(230, 233, 237, 1);
    font-size: 0.8rem;
  }
  .menu .icon{
    float: left;
    width:0.8rem;
    height: 0.8rem;
    margin-top:0.86rem;
    margin-left: 0.8rem;
    background-color: #bfc1c4;
  }
  .menu .icon1{background:url(/static/cus/img/my/1.png) no-repeat center center; background-size: contain;}
  .menu .icon2{background:url(/static/cus/img/my/1.png) no-repeat center center; background-size: contain;}
  .menu .icon3{background:url(/static/cus/img/my/1.png) no-repeat center center; background-size: contain;}
  .menu .icon4{background:url(/static/cus/img/my/1.png) no-repeat center center; background-size: contain;}
  .menu .icon5{background:url(/static/cus/img/my/1.png) no-repeat center center; background-size: contain;}
  .menu .icon6{background:url(/static/cus/img/my/1.png) no-repeat center center; background-size: contain;}


  .menu .title{
    float: left;
    margin-left: 0.5rem;
    line-height: 2.6rem;
  }

  .answer{
    margin: 0rem auto;
    margin-bottom: 1rem;
    width: 86%;
    font-size: 0.8rem;
    color: #999999;
    background-color: #F5F7FA;
    padding: 0.5rem;
    line-height: 1.5rem;
  }

</style>
