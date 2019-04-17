import Taro from '@tarojs/taro';
import * as freshmanApi from './service';
import { getUid } from '../../utils/localStorage';

export default {
  namespace: 'freshman',
  state: {
    list: [],
  },

  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(freshmanApi.demo, {});
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data,
          }
        });
      }
    },

    * selectNewPackageList(_, { call, put }) {
      const res = yield call(freshmanApi.selectNewPackageList);
      if (res) {
        yield put({
          type: 'saveList',
          payload: res.data,
        });
      }
    },

    * getNewPackage({ payload }, { call }) {
      const res = yield call(freshmanApi.getNewPackage, { ...payload, uid: getUid() });
      if (res) {
        Taro.switchTab({ url: '/pages/home/index' })
        Taro.showToast({
          title: '领取成功',
          icon: 'none',
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
        list: payload,
      }
    },
  },

};
