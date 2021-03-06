import Taro from '@tarojs/taro';
import * as claimedApi from './service'
import { getUid } from '../../../utils/localStorage'
import * as productDetailApi from '../../productDetail/service'

export default {
  namespace: 'unclaimed',
  state: {
    code:'',
    banner:''
  },

  effects: {
    * getCoupon({ payload ,callback}, { call, put }) {
      const res = yield call(claimedApi.getCoupon, { ...payload, uid: getUid() });
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
    * conuponSearch({payload,callback},{call,put}){
      const res =  yield call(productDetailApi.conuponSearch, { ...payload, uid: getUid() });
      if (res) {
        yield put({
          type: 'unclaimed',
          payload: res.data,
        });
        if(callback){
          callback(res)
        }
      }
    },
    //请求图片
    * getSettingDynamic({payload},{call,put}){
      const res =  yield call(claimedApi.getSettingDynamic, { ...payload, uid: getUid() });
      if (res) {
        // if(res.code === 1){
        //
        // }
        yield put({
          type: 'banner',
          payload: res.data,
        });
      }
    },
    //form id
    * userFormIdPool({payload,callback},{call,put}){
      const res =  yield call(claimedApi.userFormIdPool, { ...payload, sysUserId: getUid(),channel:3});
      if (res) {
        // if(res.code === 1){
        //
        // }
        // Taro.showToast({
        //   title: res.msg,
        //   icon: 'none',
        // })
        if(callback){
          callback(res.data)
        }
      }
    }
  },

  reducers: {
    unclaimed (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        code:payload
      };
    },
    banner (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        banner:payload
      };
    },
  },
};
