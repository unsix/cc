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
    * getIndexList(_, { call, put }) {
      const res = yield call(homeApi.IndexList, { channel: 1 });
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
