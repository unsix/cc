import * as classifyApi from './service';

export default {
  namespace: 'classify',
  state: {
    menuList: [],
    rightList: [],
  },

  effects: {
    *fetchCategoryList({ payload, callback }, { call, put }) {
      const res = yield call(classifyApi.selectReceptionCategoryList, {...payload, channel:3});
      if (res) {
        yield put({
          type: 'saveList',
          payload: { list: res.data, categoryId: payload.categoryId },
        });
        if (callback && res.data && res.data.length) {
          callback(res.data[0].id);
        }
      }
    },
  },

  reducers: {
    saveList(state, { payload }) {
      let newMenuList = [...state.menuList];
      let newRightList = [...state.rightList];
      if (payload.categoryId === -2) {
        newMenuList = payload.list;
      } else {
        newRightList = payload.list;
      }
      return {
        ...state,
        menuList: newMenuList,
        rightList: newRightList,
      };
    },
    clearRightList(state) {
      return {
        ...state,
        rightList: [],
      };
    },
  },

};
