import Taro from '@tarojs/taro';
import * as rechargeApi from './service'
import { getUid } from '../../utils/localStorage'
import { tradePay } from '../../utils/openApi'

export default {
  namespace: 'recharge',
  state: {

  },

  effects: {
    * getUserDepositByUid({ payload ,callback}, { call, put }) {
      const res = yield call(rechargeApi.getUserDepositByUid, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if(res){
        yield put({
          type: 'number',
          payload: res.data.deposit,
        });
        if(callback){
          callback(res)
        }
      }
    },
    * preAliPay({ payload ,callback}, { call, put }) {
      const res = yield call(rechargeApi.preAliPay, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if (res) {
        try {
          const payres = yield tradePay('tradeNO', res.data.tradeNo)
          // console.log('====', payres);
          // yield put({
          //   type: 'selectOrderByStagesList',
          //   payload: { orderId: payload.orderId }
          // });
          let type = 'suc';
          if (payres.resultCode !== '9000') {
            console.log(payres.resultCode )
            Taro.showToast({
              title: payres.memo,
              icon: 'none',
            });
            type = 'err';
          }
          if (callback) {
            // console.log(res.data.orders.orderId)
            callback(type);
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
        // Taro.showToast({
        //   title: res.msg,
        //   icon: 'none',
        // });
        if(callback){
          callback(res.data)
        }
      }
    },
  },
  reducers: {
    number (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        number:payload.toFixed(2),
        // date:formatDate(payload.userMembers[0].dueTime),
        // date:formatDate(new Date(payload.userMembers[0].dueTime), 'yyyy年MM月dd')
      };
    },
  },

};
