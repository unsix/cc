import * as sendBackApi from './service';

export default {
  namespace: 'sendBack',
  state: {
    product: {},
    userOrders: {},
    expressList: [],
    giveBackAddressList: [],
    currentGiveBackIndex: null,
    expressId: null,
    expressName: null,
    expressNo: null,
  },

  effects: {
    * fetchExpressList(_, { call, put }) {
      const res = yield call(sendBackApi.expressList);
      if (res) {
        yield put({
          type: 'saveExpressList',
          payload: res.data,
        });
      }
    },
    * getOrderGiveBackAddress({ payload }, { call, put }) {
      const res = yield call(sendBackApi.getOrderGiveBackAddress, payload);
      if (res) {
        yield put({
          type: 'saveGiveBackAddressList',
          payload: res.data,
        });
      }
    },

    * userOrderBackSubmitConfirm({ payload, callback }, { call, put }) {
      const res = yield call(sendBackApi.userOrderBackSubmitConfirm, payload);
      if (res) {
        const nextStatus = 'WAITING_SETTLEMENT';
        yield put({
          type: 'orderDetail/setOrderStatus',
          payload: nextStatus,
        });
        yield put({
          type: 'orderList/setOrderStatus',
          payload: {
            orderId: payload.orderId,
            status: nextStatus,
          },
        });
        if (callback) {
          callback();
        }
      }
    },

    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(sendBackApi.demo, {});
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
    saveProductAndOrder(state, { payload }) {
      return {
        ...state,
        product: payload.product,
        userOrders: payload.userOrders,
      };
    },
    saveExpressList(state, { payload }) {
      // console.log('====', payload);
      return {
        ...state,
        expressList: payload,
      };
    },
    saveGiveBackAddressList(state, { payload }) {
      return {
        ...state,
        giveBackAddressList: payload,
      };
    },
    saveGiveBackIndex(state, { payload }) {
      return {
        ...state,
        currentGiveBackIndex: payload,
      }
    },
    setExpressNo(state, { payload }) {
      return {
        ...state,
        expressNo: payload,
      };
    },
    setExpressIdAndName(state, { payload }) {
      return {
        ...state,
        expressId: payload.expressId,
        expressName: payload.expressName,
      };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
