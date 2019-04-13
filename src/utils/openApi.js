import Taro from '@tarojs/taro';
import { getUid } from './localStorage';
import { baseUrl } from '../config';
export const getAuthCode = () => {
  return new Promise((res, rej) => {
    my.getAuthCode({
      scopes: 'auth_user',
      success: (data) => {
        res(data);
      },
      fail: (data) => {
        rej(data);
      },
    });
  });
}

export const tradePay = (key, orderStr) => {
  return new Promise((res, rej) => {
    const obj = {
      success: (data) => {
        res(data);
      },
      fail: (data) => {
        rej(data);
      }
    };
    obj[key] = orderStr;
    my.tradePay(obj);
  });
}
 
export const apNsf = (context) => {
  return new Promise((res, rej) => {
    const obj = {
      pid: '2088431153943214',
      appId: '2019011162880259',
      bizContext: {
        risk_type: 'riskinfo_nsf_common',
        pid: '2088431153943214',
        ...context,
      },
      success: (data) => {
        my.httpRequest({
          url: baseUrl+'/aliPay/user/userrisk',
          data:{
            key:data,
            uid:getUid()
          },
          headers:{
            'Content-Type': 'application/json',
          },
          method: 'POST',
          success:function(){
            // my.alert({
            //   title: '/aliPay/user/userrisk'
            // });
          },
          fail(){
            my.alert({
              title: 'fail'
            });
          }
        })
        res(data);
      },
      fail: (data) => {
        my.alert({
          title: 'apNsf fails'
        });
        rej(data);
      },
    }
    if(my.ap && my.ap.nsf){
      my.ap.nsf(obj)
    }else{
      let jsonstr = {
        rankname:'rank0'
      }
      my.httpRequest({
        url: baseUrl+'/aliPay/user/userrisk',
        data:{
          key:JSON.stringify(jsonstr),
          uid:getUid()
        },
        headers:{
          'Content-Type': 'application/json',
        },
        method: 'POST',
        success:function(data){
          // my.alert({
          //   title: '/aliPay/user/userrisk'
          // });
          res(data);
        },
        fail(){
          my.alert({
            title: 'fail'
          });
        }
      })
    }
  })
}