import Taro from '@tarojs/taro';
import * as shareMember from './service'
import { getUid } from '../../utils/localStorage'

export default {
  namespace: 'shareMember',
  state: {
    shareNum:{},
  },

  effects: {
    * getNewcomerTaskConfigVoByUid({ payload ,callback}, { call, put }) {
      const res = yield call(shareMember.getNewcomerTaskConfigVoByUid, { ...payload, uid: getUid() });
      if (res) {
        yield put({
          type:'shareNum',
          payload:res.data
        })
        if(callback){
          callback(res)
        }
      }
    },

  },

  reducers: {
    shareNum (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        shareNum:payload
      };
    },
  },
};
