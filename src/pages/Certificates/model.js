import Taro from '@tarojs/taro';
import * as certificatesApi from './service'
import { getUid } from '../../utils/localStorage'

export default {
  namespace: 'certificate',
  state: {

  },

  effects: {
    * upLoad({ payload ,callback}, { call, put }) {
      const res = yield call(certificatesApi.upLoad, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if (res) {
        // Taro.switchTab({ url: '/pages/home/index' })
        // Taro.navigateBack
        Taro.showToast({
          title: res.msg,
          icon: 'none',
        });
        if(callback){
          callback(res)
        }
      }
    },
    * getUserIdCardPhotoInfo({ payload ,callback}, { call, put }) {
      const res = yield call(certificatesApi.getUserIdCardPhotoInfo, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if (res) {
        // Taro.switchTab({ url: '/pages/home/index' })
        // Taro.navigateBack
        Taro.showToast({
          title: res.msg,
          icon: 'none',
        });
        if(callback){
          callback(res)
        }
      }
    },
    * updateUpLoad({ payload ,callback}, { call, put }) {
      const res = yield call(certificatesApi.updateUpLoad, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if (res) {
        // Taro.switchTab({ url: '/pages/home/index' })
        // Taro.navigateBack
        Taro.showToast({
          title: res.msg,
          icon: 'none',
        });
        if(callback){
          callback(res)
        }
      }
    },
  },

  reducers: {
    // unclaimed (state, { payload }){
    //   // console.log(payload,'sjhfdghursfgyu')
    //   return {
    //     ...state,
    //     code:payload
    //   };
    // },
  },

};
