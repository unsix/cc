import Taro from '@tarojs/taro';
import * as claimedApi from './service'
import { getUid } from '../../../utils/localStorage'
import * as productDetailApi from '../../productDetail/service'

export default {
  namespace: 'unclaimed',
  state: {
  },

  effects: {
    * getCoupon({ payload }, { call, put }) {
      const res = yield call(claimedApi.getCoupon, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if (res) {
        Taro.redirectTo({ url: 'pages/active_pages/unclaimed/index' })
        // Taro.navigateBack
        Taro.showToast({
          title: res.msg,
          icon: 'none',
        });
      }
    },
    * conuponSearch({payload},{call,put}){
      const res =  yield call(productDetailApi.conuponSearch, { ...payload, uid: getUid() });
      if (res) {
        yield put({
          type: 'unclaimed',
          payload: res.data,
        });
      }
    }
  },

  reducers: {
    unclaimed (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        unclaimed:payload
      };
    }
  },

};
