// eslint-disable-next-line import/prefer-default-export

//window url
export  const getQueryString = function (url) {
  if (url) {
    url = url.substr(url.indexOf("?") + 1);
  }
  let result = {}, queryString = url || location.search.substring(1),
    re = /([^&=]+)=([^&]*)/g, m
  while (m = re.exec(queryString)) {
    result[decodeURIComponent(m[1])] = decodeURIComponent(m[2])
  }
  return result;
}

//过滤空格
export const blankSpace = (space) => {
  let  newSpack = space.replace(/\s+/g,"");
  return newSpack
}
//转换时间 - /
export const dateDiff = (time) =>{
  let newTime = time.replace(/-/g,'/')
  return newTime
}
//名字格式
export const  formatName =(name) =>{
  // let newStr;
  // if (name.length === 2) {
  //   newStr = name.substr(0, 1) + '*';
  // } else if (name.length > 2) {
  //   let char = '';
  //   for (let i = 0, len = name.length - 2; i < len; i++) {
  //     char += '*';
  //   }
  //   newStr = name.substr(0, 1) + char + name.substr(-1, 1);
  // } else {
  //   newStr = name;
  // }
  let newStr = name.substr(0,1) +'**'
  return newStr;
}
//身份证
export const forIdCard = (num) =>{

  let  newNum = num.substr(0, 4) + '*******' + num.substr(14, 18)
  return newNum
}


export const setUrlEncoded = (obj) => {
  let urlEncoded = '';
  if (obj && obj instanceof Object) {
    const keys = Object.keys(obj);
    if (keys && keys.length) {
      keys.forEach((key, index) => {
        urlEncoded += `${key}=${obj[key]}`;
        if (index + 1 < keys.length) {
          urlEncoded += '&';
        }
      });
    }
  }
  return urlEncoded;
}
export const formatDate = (date, fmt) => {
  const o = {
    "M+": date.getMonth() + 1, //月份 
    "d+": date.getDate(), //日 
    "h+": date.getHours(), //小时 
    "m+": date.getMinutes(), //分 
    "s+": date.getSeconds(), //秒 
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
    "S": date.getMilliseconds() //毫秒 
  };
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}

export const formatStrDate = (str, fmt) => {
  const o = {
    'y+': str.slice(0, 4),
    'M+': str.slice(5, 7),
    'd+': str.slice(8, 10),
    'h+': str.slice(11, 13),
    'm+': str.slice(14, 16),
    's+': str.slice(17, 19),
  };

  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.slice(0, 4) + "").substr(4 - RegExp.$1.length));
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
}

//日期转时间戳
export const transdate = (endTime) => {
  const date = new Date();
  date.setFullYear(endTime.substring(0, 4));
  date.setMonth(endTime.substring(5, 7) - 1);
  date.setDate(endTime.substring(8, 10));
  date.setHours(endTime.substring(11, 13));
  date.setMinutes(endTime.substring(14, 16));
  date.setSeconds(endTime.substring(17, 19));
  return Date.parse(date)   ;

}
// 倒计时
export const leftTimer = (dateStr) => {
  if (dateStr) {
    const date = new Date(dateStr);
    const leftTime = date - (new Date());
    const days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10); //计算剩余的天数
    const hours = parseInt(leftTime / 1000 / 60 / 60 % 24, 10); //计算剩余的小时
    const minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
    return `${days}天${hours}小时${minutes}分钟`;
  }
  return '';
}

// 30分钟倒计时
export const leftTimerMS = (dateStr) => {
  if (dateStr) {
    const date = new Date(dateStr);
    const leftTime = date.getTime() + 30 * 60000 - (new Date()).getTime();
    if (leftTime < 0) {
      return null;
    }
    const minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟 
    const seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数 
    return `${minutes}分${seconds}秒`;
  }
}
// 日期，在原有日期基础上，增加days天数，默认增加1天
export const  addDate =(date, days) => {
  if (days == undefined || days == '') {
    days = 1;
  }
  var date = new Date(date);
  date.setDate(date.getDate() + days);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  return date.getFullYear() + '-' + getFormatDate(month) + '-' + getFormatDate(day);
}

// 日期月份/天的显示，如果是1位数，则在前面加上'0'
function getFormatDate(arg) {
  if (arg == undefined || arg == '') {
    return '';
  }

  var re = arg + '';
  if (re.length < 2) {
    re = '0' + re;
  }

  return re;
}

export const formatSeconds = (value) => {
   setInterval(() => {
    value -= 1;

    if (value === 0) {
      clearInterval(this.interval);
    }
  }, 1000);
  return value;
}

/*获取当前页带参数的url*/
export function getCurrentPageUrlWithArgs() {
  const pages = getCurrentPages()
  const currentPage = pages[pages.length - 1]
  const url = currentPage.route
  const options = currentPage.params
  console.log(currentPage,'====================')
  let urlWithArgs = `/${url}?`
  for (let key in options) {
    const value = options[key]
    urlWithArgs += `${key}=${value}&`
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)
  return urlWithArgs
}

/*函数节流*/
export  function throttle(fn, interval) {
  var enterTime = 0;//触发的时间
  var gapTime = interval || 300 ;//间隔时间，如果interval不传，则默认300ms
  return function() {
    var context = this;
    var backTime = new Date();//第一次函数return即触发的时间
    if (backTime - enterTime > gapTime) {
      fn.call(context,arguments);
      enterTime = backTime;//赋值给第一次触发的时间，这样就保存了第二次触发的时间
    }
  };
}

/*函数防抖*/

export  const debounce = (func, delay = 200) => {
  let timeout = null
  return function () {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(this, arguments)
    }, delay)
  }
}
