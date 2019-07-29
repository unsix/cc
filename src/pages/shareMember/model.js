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
          callback(res.data.taskId)
        }
      }
    },
    * startNewTask({ payload ,callback}, { call, put }) {
      const res = yield call(shareMember.startNewTask, { ...payload, uid: getUid() });
      if (res) {
        yield put({
          type:'shareNum',
          payload:res.data
        })
        if(callback){
          callback(res.data.taskId)
        }
      }
    },
    * listTaskCompleteMessage({ payload ,callback}, { call, put }) {
      const res = yield call(shareMember.listTaskCompleteMessage, { ...payload });
      if (res) {
        yield put({
          type:'peopleNum',
          payload:res.data
        })
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
    peopleNum (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        peopleNum:payload
      };
    },
  },
};
