
import * as HomeApi from './service';
import Taro from '@tarojs/taro';

export default {
  namespace: 'reportHome',
  state: {
    code:'',
    detail: {},
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
      else if(res.code == 1){
      }
    }

  },
  reducers: {
    // validateCode (state, { payload }){
    //   return {
    //     ...state,
    //     code:payload
    //   };
    // },
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
