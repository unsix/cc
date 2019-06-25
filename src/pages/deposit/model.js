import Taro from '@tarojs/taro';
import * as rechargeApi from './service'
import { getUid } from '../../utils/localStorage'

export default {
  namespace: 'deposit',
  state: {

  },

  effects: {
    * listRechargeDepositRecordsByUid({ payload ,callback}, { call, put }) {
      const res = yield call(rechargeApi.listRechargeDepositRecordsByUid, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if(res){
        yield put({
          type: 'info',
          payload: res.data,
        });
        if(callback){
          callback(res)
        }
      }
    },
  },
  reducers: {
    info (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        info:payload,
        // date:formatDate(payload.userMembers[0].dueTime),
        // date:formatDate(new Date(payload.userMembers[0].dueTime), 'yyyy年MM月dd')
      };
    },
  },

};
