
import * as HomeApi from './service';
import Taro from '@tarojs/taro';
import { formatName,forIdCard} from '../../../utils/utils'
import { tradePay } from '../../../utils/openApi'

export default {
  namespace: 'reportHome',
  state: {
    code:'',
    details: {},
  },
  effects: {
    * fetchProductDetail({ payload }, { call, put }) {
      const res = yield call(HomeApi.selectProductDetail, payload);
      if (res) {
        console.log('999999999999999999999999999999999999999999999999')
        yield put({
          type: 'saveDetail',
          payload: res.data,
        });
      }
    },
    * checkParams({payload,callback},{call,put}){
      const res =  yield call(HomeApi.checkParams, payload);
      if (res) {
        Taro.showToast({
          title:res.msg
        })
        if (callback) {
          callback(res);
        }
      }
    },
    * reportPay({ payload,callback}, { call, put }) {
      const res = yield call(HomeApi.reportPay, payload );
      if (res) {
        try {
          const payres = yield tradePay('tradeNO', res.data.orderNo)
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
          if (callback) {
            // console.log(res.data.orders.orderId)
            callback(res.data.orderNo, type);
          }
          // if(res){
          //   console.log(payres,123123123)
          // }
        } catch (e) {
          // console.log('====1', e);
          Taro.showToast({
            title: '支付失败，请重试或联系客服',
            icon: 'none',
          });
        }
      }
    },
    * getResult({payload,callback},{call,put}){
      const res =  yield call(HomeApi.getCheckResultByTradeNo, payload.tradeNo);
      if (res) {
        Taro.showToast({
          title:res.msg
        })
        yield put({
          type: 'saveReport',
          payload: res.data,
        });
        if (callback) {
          callback(res);
        }
      }
    },
    * getResultById({payload,callback},{call,put}){
      const res =  yield call(HomeApi.getResultById, payload.reportId);
      if (res) {
        Taro.showToast({
          title:res.msg
        })
        yield put({
          type: 'saveReport',
          payload: res.data,
        });
        if (callback) {
          callback(res);
        }
      }
    },
  },
  reducers: {

    saveReport (state, { payload }){
      return {
        ...state,
        details:payload,
        name: formatName(payload.userName),
        idCardNo:forIdCard(payload.idCardNo)
      };
    },
    // saveDetail(state, { payload }) {
    //   const { minAdvancedDays, maxAdvancedDays } = payload;
    //   let startTime = new Date().getTime();
    //   if (minAdvancedDays) {
    //     startTime += minAdvancedDays * 24 * 3600 * 1000;
    //   }
    //   const advancedDays = [startTime];
    //
    //   let endDay = 30 - minAdvancedDays;
    //   if (maxAdvancedDays && maxAdvancedDays > minAdvancedDays) {
    //     endDay = maxAdvancedDays - minAdvancedDays;
    //   }
    //   for (let i = 1; i <= endDay; i += 1) {
    //     advancedDays.push(startTime + i * 24 * 3600 * 1000);
    //   }
    //
    //   let saveServers = [];
    //   if (payload.additionalServices && payload.additionalServices.length) {
    //     payload.additionalServices.forEach(ser => {
    //       if (ser.isMust) {
    //         saveServers.push(ser.id);
    //       }
    //     });
    //   }
    //   if (payload.images && payload.images.length) {
    //     payload.images.sort(function compare(a, b) {
    //       return b.isMain - a.isMain;
    //     });
    //   }
    //   return {
    //     ...state,
    //     detail: payload,
    //   };
    // },

  }
}
