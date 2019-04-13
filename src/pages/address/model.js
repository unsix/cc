import * as addressApi from './service';
import { getUid } from '../../utils/localStorage';

export default {
  namespace: 'address',
  state: {
    list: [],
  },

  effects: {
    * getUserAllAddressList(_, { call, put }) {
      const res = yield call(addressApi.getUserAllAddressList, { uid: getUid() });
      if (res) {
        yield put({
          type: 'saveList',
          payload: res.data,
        });
      }
    },
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(addressApi.demo, {});
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data,
          }
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    saveList(state, { payload }) {
      return {
        ...state,
        list: payload
      };
    },
  },

};
