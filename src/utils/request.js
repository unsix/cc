import Taro from '@tarojs/taro';
import { setUrlEncoded } from './utils';
// import { getToken, setToken } from './token';
// import { getShopId } from './shopId';
import { baseUrl, noConsole } from '../config';

const request_data = {
  platform: 'wap',
  rent_mode: 2,
};

export default (options = { method: 'GET', data: {} }) => {
  if (!noConsole) {
    console.log(`${new Date().toLocaleString()}【 M=${options.url} 】P=${JSON.stringify(options.data)}`);
  }
  let data = {
    // ...request_data,
    ...options.data,
  };
  // // 请求是否需要验证token
  // if (!options.noToken) {
  //   data.__token__ = getToken();
  // }
  // if (getShopId()) {
  //   data.shopId = getShopId();
  // }
  let header = {};

  if (
    options.method === 'POST' ||
    options.method === 'PUT' ||
    options.method === 'DELETE'
  ) {
    if (options.contentType === 'application/www') {
      header = {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
      };
      data = setUrlEncoded(data);
    } else if (options.contentType === 'formData') {
      header = {
        Accept: 'application/json',
      };
    } else {
      header = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
  }
  let requesturl;
  // if(options.test == 'recommendproducts'){
  //   requesturl = 'http://192.168.1.106:8071/'+options.url
  // }else{
  // if(options.test == 'userConfirmOrder'){
  //   requesturl = 'http://192.168.1.106:8071/'+options.url
  // }else{
    requesturl = baseUrl + options.url
  // }
  return Taro.request({
    url: requesturl,
    data,
    header,
    method: options.method.toUpperCase(),
  }).then((res) => {
    if (!res || !res.data) {
      Taro.showToast({
        title: '服务器出错了',
        icon: 'none',
        mask: true,
      });
      return;
    }
    if (!noConsole) {
      console.log(`${new Date().toLocaleString()}【 M=${options.url} 】【接口响应：】`, res);
    }
    if (res.data.code !== 1) {
      if (res.data.code === 403) {
        Taro.showToast({
          title: '登录信息过期，请重新登录',
          icon: 'none',
          mask: true,
        });
        Taro.redirectTo({ url: '/pages/login/index' });
      } else {
        Taro.showToast({
          title: res.data.msg,
          icon: 'none',
          mask: true,
        });
      }
      return;
    } else {
      // if (res.data.token) {
      //   setToken(res.data.token);
      // }
      return res.data;
    }
  })
}