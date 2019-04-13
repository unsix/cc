import Taro from '@tarojs/taro';
import * as searchApi from './service';
import { getUid } from '../../utils/localStorage';

export default {
  namespace: 'search',
  state: {
    recommend: [{ id: 0, word: '苹果' }, { id: 1, word: '苹果X' }, { id: 2, word: '华为Mate20' }, { id: 3, word: '游戏机' }, { id: 4, word: '笔记本电脑' }],
    history: [],
  },

  effects: {
    * getHistory(_, { call, put }) {
      if (!getUid()) {
        return;
      }
      const res = yield call(searchApi.selectHistory, { uid: getUid() });
      if (res) {
        yield put({
          type: 'saveHistory',
          payload: { history: res.data },
        });
      }
    },

    * setHistory({ payload }, { call, put }) {
      if (!getUid()) {
        return;
      }
      const res = yield call(searchApi.insertHistory, { ...payload, uid: getUid() });
      if (res) {
        yield put({
          type: 'getHistory',
        });
      }
    },
    * clearHistory(_, { call, put }) {
      if (!getUid()) {
        return;
      }
      const res = yield call(searchApi.deleteHistory, { uid: getUid(), type: 0 });
      if (res) {
        yield put({
          type: 'getHistory',
        });
      }
    },
  },

  reducers: {
    saveHistory(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
