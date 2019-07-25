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
    *getIndexList({callback}, { call, put }) {
      const res = yield call(homeApi.IndexList, { channel: 1 });
      if (res) {
        yield put({
          type: 'save',
          payload: res.data,
        });
        if(callback){
          callback(res.data.tabList[0].tab.id)
        }
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
    *getIndexTabAndProduct({ payload,callback}, { call, put }) {
      const res = yield call(homeApi.getIndexTabAndProduct, { ...payload });
      if (res) {
        yield put({
          type: 'save',
          payload: res.data,
        });
        if(callback){
          callback(res.data.tabArray[0].name)
        }
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
