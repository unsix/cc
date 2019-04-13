import * as shopsApi from './service';

export default {
  namespace: 'shops',
  state: {
    queryInfo: {
      pageNumber: 1,
      pageSize: 10,
    },
    total: 0,
    list: [],
    shop: {},
  },

  effects: {

    * selectShopProductList({ payload }, { call, put }) {
      const res = yield call(shopsApi.selectShopProductList, payload);
      if (res) {
        if (payload.fetchType === 'scroll') {
          yield put({
            type: 'concatList',
            payload: res.data,
          });
        } else {
          yield put({
            type: 'saveList',
            payload: { data: res.data, queryInfo: payload },
          });
        }
      }
    },
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(shopsApi.demo, {});
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

    concatList(state, { payload }) {
      const list = [...state.list];
      return {
        ...state,
        list: list.concat(payload.records),
        total: payload.total,
        queryInfo: {
          ...state.queryInfo,
          pageNumber: payload.current,
        },
      }
    },
    setShop(state, { payload }) {
      return {
        ...state,
        shop: payload,
      };
    },
    saveList(state, { payload }) {
      return {
        ...state,
        list: payload.data.records,
        total: payload.data.total,
        queryInfo: {
          ...payload.queryInfo,
          pageNumber: payload.data.current,
        },
      };
    },
  },

};
