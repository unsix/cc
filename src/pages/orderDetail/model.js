import Taro from '@tarojs/taro';
import * as orderDetailApi from './service';
import { tradePay } from '../../utils/openApi';
import { getBuyerId } from '../../utils/localStorage';

export default {
  namespace: 'orderDetail',
  state: {
    cashes: {},
    product: {},
    userAddress: {},
    userOrders: {},
  },

  effects: {
    * selectUserOrderDetail({ payload }, { call, put }) {
      const res = yield call(orderDetailApi.selectUserOrderDetail, payload);
      if (res) {
        yield put({
          type: 'saveOrder',
          payload: res.data,
        });
      }
    },

    * userCancelOrder({ payload, callback }, { call, put }) {
      const res = yield call(orderDetailApi.userCancelOrder, payload);
      if (res) {
        const nextStatus = 'USER_CANCELED_CLOSED';
        yield put({
          type: 'setOrderStatus',
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

    * userFrezzAgain({ payload }, { call, put }) {
      const res = yield call(orderDetailApi.userFrezzAgain, payload);
      if (res) {
        try {
          const payres = yield tradePay('orderStr', res.data.data.data);
          if (payres.resultCode !== '9000') {
            Taro.showToast({
              title: payres.memo,
              icon: 'none',
            });
          } else {
            const nextStatus = 'WAITING_BUSINESS_DELIVERY';
            yield put({
              type: 'setOrderStatus',
              payload: nextStatus,
            });
            yield put({
              type: 'orderList/setOrderStatus',
              payload: {
                orderId: payload.orderId,
                status: nextStatus,
              },
            });
          }
          // const resObj = JSON.parse(payres.result);
          // const userAlipay = yield call(confirmOrderApi.userAlipayTradePay, { orderId: resObj.alipay_fund_auth_order_app_freeze_response.out_request_no });
          // if (userAlipay) {
          //   const nextStatus = 'WAITING_BUSINESS_DELIVERY';
          //   yield put({
          //     type: 'setOrderStatus',
          //     payload: nextStatus,
          //   });
          //   yield put({
          //     type: 'orderList/setOrderStatus',
          //     payload: {
          //       orderId: payload.orderId,
          //       status: nextStatus,
          //     },
          //   });
          // }
        } catch (e) {
          Taro.showToast({
            title: '支付失败，请重试或联系客服',
            icon: 'none',
          });
        }
      }
    },

    * userConfirmReceipt({ payload }, { call, put }) {
      const res = yield call(orderDetailApi.userConfirmReceipt, payload)
      if (res) {
        const nextStatus = 'WAITING_GIVE_BACK';
        yield put({
          type: 'setOrderStatus',
          payload: nextStatus,
        });
        yield put({
          type: 'orderList/setOrderStatus',
          payload: {
            orderId: payload.orderId,
            status: nextStatus,
          },
        });
      }
    },

    // 用户申请修改结算单
    * userApplicationForAmendmentOfSettlementForm({ payload }, { call, put }) {
      const res = yield call(orderDetailApi.userApplicationForAmendmentOfSettlementForm, payload);
      if (res) {
        const subStatus = 'USER_APPLICATION_CHANGE_SETTLEMENT';
        yield put({
          type: 'setOrderSubStatus',
          payload: subStatus,
        });
      }
    },

    // 结算单确认支付
    * confirmOrderSettlement({ payload }, { call, put }) {
      const res = yield call(orderDetailApi.confirmOrderSettlement, { ...payload, buyerId: getBuyerId() });
      if (res && res.data !== '2') {
        try {
          const payres = yield tradePay('tradeNO', res.data)
          console.log('====', payres);
          const nextStatus = 'ORDER_FINISH';
          yield put({
            type: 'setOrderStatus',
            payload: nextStatus,
          });
        } catch (e) {
          Taro.showToast({
            title: '支付失败，请重试或联系客服',
            icon: 'none',
          });
        }
      } else {
        if (res) {
          const nextStatus = 'ORDER_FINISH';
          yield put({
            type: 'setOrderStatus',
            payload: nextStatus,
          });
        }
      }
    },
  },

  reducers: {
    saveOrder(state, { payload }) {
      return { ...state, ...payload };
    },
    setOrderStatus(state, { payload }) {
      return {
        ...state,
        userOrders: {
          ...state.userOrders,
          status: payload,
        },
      };
    },
    setOrderSubStatus(state, { payload }) {
      return {
        ...state,
        userOrders: {
          ...state.userOrders,
          subStatus: payload,
        },
      };
    },
  },

};
