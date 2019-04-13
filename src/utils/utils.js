// eslint-disable-next-line import/prefer-default-export
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
