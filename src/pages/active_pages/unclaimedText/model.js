import Taro from '@tarojs/taro';
import * as unclaimedApi from './service'
import { getUid } from '../../../utils/localStorage'

export default {
  namespace: 'unclffaimed',
  state: {
  },

  effects: {
    * getCoupon({ payload }, { call, put }) {
      const res = yield call(unclaimedApi.getCoupon, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if (res) {
        Taro.switchTab({ url: '/pages/home/index' })
        // Taro.navigateBack
        Taro.showToast({
          title: res.msg,
          icon: 'none',
        });
      }
    },
  },

  reducers: {


  },

};
