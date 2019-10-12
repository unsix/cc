import Taro from '@tarojs/taro';
import * as checkSuccessApi from './service'
import { getUid } from '../../utils/localStorage'

export default {
  namespace: 'checkSuccess',
  state: {
  },

  effects: {
    * getOrderBySuccess({ payload ,callback}, { call, put }) {
      const res = yield call(checkSuccessApi.getOrderBySuccess, { ...payload });
     if(res){
       yield put({
         type: 'saveOrder',
         payload: res.data,
       });
     }
    },
  },

  reducers: {
    saveOrder(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
