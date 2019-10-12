
import { getUid } from './localStorage';
import { baseUrl } from '../config';
export const getAuthCode = () => {
  return new Promise((res, rej) => {
    my.getAuthCode({
      scopes: 'auth_base',
      success: (data) => {
        res(data);
        // console.log(data,'============auth')
      },
      fail: (data) => {
        rej(data);
      },
    });
  });
}

export const getOpenUserInfo = () => {
  return new Promise((res, rej) => {
    my.getOpenUserInfo({
      success: (data) => {
        res(data);
        // console.log(res(data),res,'==============')
      },
      fail: (data) => {
        rej(data);
      },
    });
  });
}
export const getPhoneNumber = () => {
  return new Promise((res, rej) => {
    my.getPhoneNumber({
      success: (data) => {
        res(data.response);
      },
      fail: (data) => {
        // console.log(data);
        // console.log('getPhoneNumber_fail');
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
      pid: '2088431914594550',
      appId: '2019051965009493";',
      bizContext: {
        risk_type: 'riskinfo_nsf_common',
        pid: '2088431914594550',
        ...context,
      },
      success: (data) => {
        // console.log(data)
        // let objc = {
        //   uid:getUid(),
        //   riskResult:data.riskResultDesc,
        // }
        let newObj = JSON.parse(data.riskResultDesc)
        let rank = Object.keys(newObj)[0]
        if(rank.substring(0, 4)!== 'rank'){
          rank = 'rank2'
        }
        my.httpRequest({
          url: baseUrl+'aliPay/user/userrisk',
          data:{
            riskResult:rank,
            uid:getUid()
          },
          // data: newObj,
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
          title: JSON.stringify(data)
        });
        rej(data);
      },
    }
    if(my.ap && my.ap.nsf){
      my.ap.nsf(obj)
    }else{
      let jsonstr = 'rank0'
      let obj = {
        riskResult:jsonstr,
        uid:getUid()
      }
      let data = JSON.stringify(obj)
      my.httpRequest({
        url: baseUrl+'aliPay/user/userrisk',
        data,
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
