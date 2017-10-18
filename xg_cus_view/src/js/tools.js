export default {
  install: function (Vue, options) {
    Vue.filter('formatTime', function (value) {
      Date.prototype.Format = function (fmt) { //author: meizz
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "h+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          "S": this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
      }
      return new Date(value).Format("yyyy-MM-dd hh:mm:ss");
    })

    Vue.filter('formatMoney', function (value) {
      let num;
      try{
        num = value.toFixed(2);
      }catch (e){
        num = 0;
        num = num.toFixed(2);
      }
      return num;
    })

    Vue.prototype.NOTICE = true;

    Vue.mixin({
      created: function () {
        if (this.NOTICE){
          console.log("组件开始加载");
        }
      },
      methods: {
        test: function () {
          console.log("test");
        }
      }
    })

    Vue.prototype.$tools = {
      //电话号码合法性检查
      telNumberCheck: function (tel) {
        var pattern = /(^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$)|(^0{0,1}1[3|4|5|6|7|8|9][0-9]{9}$)/;
        return pattern.test(tel)
      },
      formatMoney: function (value) {
        let num;
        try{
          num = value.toFixed(2);
        }catch (e){
          num = 0;
          num = num.toFixed(2);
        }
        return num;
      }

    }
  }
};
