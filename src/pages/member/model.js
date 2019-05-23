import Taro from '@tarojs/taro';
import * as memberApi from './service'
import { getUid } from '../../utils/localStorage'
import { tradePay } from '../../utils/openApi'
export default {
  namespace: 'member',
  state: {
    memberIfn:{}
  },

  effects: {
    * getMember({ payload ,callback}, { call, put }) {
      const res = yield call(memberApi.getUserMembers, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if(res){
        yield put({
          type: 'memberInf',
          payload: res.data,
        });
        if(callback){
          callback(res.data)
        }
      }
    },
    * userMember({ payload ,callback}, { call, put }) {
      const res = yield call(memberApi.userPayMembers, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if (res) {
        try {
          const payres = yield tradePay('tradeNO', res.data)
          // console.log('====', payres);
          // yield put({
          //   type: 'selectOrderByStagesList',
          //   payload: { orderId: payload.orderId }
          // });
          let type = 'detail';
          console.log(payres)
          console.log(payres.resultCode )
          console.log(res)
          if (payres.resultCode !== '9000') {
            console.log(payres.resultCode )
            Taro.showToast({
              title: payres.memo,
              icon: 'none',
            });
            type = 'list';
          }
          // if (callback) {
          //   // console.log(res.data.orders.orderId)
          //   callback(res.data, type);
          // }
        } catch (e) {
          // console.log('====1', e);
          Taro.showToast({
            title: '支付失败，请重试或联系客服',
            icon: 'none',
          });
        }
        Taro.showToast({
          title: res.msg,
          icon: 'none',
        });
        if(callback){
          callback(res.data)
        }
      }
    },
  },

  reducers: {
    memberInf (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        memberIfn:payload
      };
    },
  },

};
