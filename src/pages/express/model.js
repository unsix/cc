import * as ExpressApi from './service';
import { getUid } from '../../utils/localStorage';

export default {
  namespace: 'express',
  state: {
    details:{}
  },

  effects: {
    * userGetExpressByorderId({ payload }, { call, put }) {
      const res = yield call(ExpressApi.userGetExpressByorderId, { ...payload});
      if (res) {
        yield put({
          type: 'expressDetails',
          payload: res.data,
        });
      }
    },
  },

  reducers: {
    expressDetails(state, { payload }) {
      return {
        ...state,
        details:payload,
        list : payload.logisticsList.result.list.reverse()
      }
    },
  },
};
