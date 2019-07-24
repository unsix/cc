import * as homeApi from './service';

export default {
  namespace: 'home',
  state: {
    bannerList: [],
    iconList: [],
    tabList: [],
    oldNewDegreeList: ['全新', '99新', '95新', '9成新', '8成新', '7成新'],
  },

  effects: {
    *getIndexList(action, { call, put }) {
      const res = yield call(homeApi.IndexList, { channel: 1 });
      if (res) {
        yield put({
          type: 'save',
          payload: res.data,
        });
      }
    },
    *getZhifubaoFlow({ payload}, { call, put }) {
      const res = yield call(homeApi.getZhifubaoFlow, { ...payload });
      if (res) {
        yield put({
          type: 'save',
          payload: res.data,
        });
      }
    },
    *getIndexTabAndProduct({ payload}, { call, put }) {
      const res = yield call(homeApi.getIndexTabAndProduct, { ...payload });
      if (res) {
        yield put({
          type: 'save',
          payload: res.data,
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
