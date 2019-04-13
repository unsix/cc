import * as productListApi from './service';

export default {
  namespace: 'productList',
  state: {
    queryInfo: {
      minRentCycleDays: null, // 起租天数
      operateCategoryId: null, // 类目id
      orderBy: null, // 排序规则 asc  desc  升序降序
      oldNewDegreeStatus: null, // 全新二手 0全新,1二手
      content: null, // 搜索内容
      pageNumber: 1,
      pageSize: 10,
    },
    list: [],
    oldNewDegreeList: ['全新', '99新', '95新', '9成新', '8成新', '7成新'],
    total: 0,
  },

  effects: {
    *fetchProductList({ payload }, { call, put }) {
      let work = productListApi.productSearch;
      if(payload.operateCategoryId) {
        work = productListApi.selectCategoryProduct;
      }
      const res = yield call(work, payload);
      if (res) {
        if (payload.fetchType === 'scroll') {
          yield put({
            type: 'concatProductList',
            payload: res.data,
          });
        } else {
          yield put({
            type: 'saveProductList',
            payload: { data: res.data, queryInfo: payload },
          });
        }
      }
    },
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(productListApi.demo, {});
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
    saveProductList(state, { payload }) {
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

    concatProductList(state, { payload }) {
      const list = [...state.list];
      return {
        ...state,
        list: list.concat(payload.records),
        total: payload.total,
        queryInfo: {
          ...state.queryInfo,
          pageNumber: payload.current,
        },
      };
    },

    addPageIndex(state) {
      return {
        ...state,
        queryInfo: {
          ...state.queryInfo,
        },
      };
    },

    setQueryInfo(state, { payload }) {
      return {
        ...state,
        queryInfo: {
          ...state.queryInfo,
          ...payload,
        },
      };
    },
  },
};
