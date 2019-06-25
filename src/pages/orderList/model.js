import * as orderListApi from './service';
import { getUid } from '../../utils/localStorage';

export default {
  namespace: 'orderList',
  state: {
    queryInfo: {
      status: [],
      pageNumber: 1,
      pageSize: 10,
    },
    total: 0,
    list: [],
  },

  effects: {
    * fetchUserOrderList({ payload }, { call, put }) {
      const res = yield call(orderListApi.userOrderList, { ...payload, uid:getUid() });
      if (res) {
        if (payload.fetchType === 'scroll') {
          yield put({
            type: 'concatOrderList',
            payload: res.data,
          });
        } else {
          yield put({
            type: 'saveOrderList',
            payload: { data: res.data, queryInfo: payload },
          });
        }
      }
    },
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(orderListApi.demo, {});
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

    concatOrderList(state, { payload }) {
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

    saveOrderList(state, { payload }) {
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

    setOrderStatus(state, { payload }) {
      let newList = [...state.list];
      // 全部订单修改状态，其他订单列表删除
      const index = newList.findIndex(info => info.orderId === payload.orderId);
      if (state.queryInfo.status && state.queryInfo.status.length) {
        newList.splice(index, 1);
      } else {
        newList[index] = { ...newList[index], status: payload.status };
      }
      return {
        ...state,
        list: newList,
      };
    },
  },
};
