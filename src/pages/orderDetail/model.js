import Taro from '@tarojs/taro';
import * as orderDetailApi from './service';
import { tradePay } from '../../utils/openApi';
import { getBuyerId, getUid } from '../../utils/localStorage'
import * as orderListApi from '../orderList/service'


export default {
  namespace: 'orderDetail',
  state: {
    cashes: {},
    product: {},
    userAddress: {},
    userOrders: {},
  },

  effects: {
    *selectUserOrderDetail({ payload }, { call, put }) {
      const res = yield call(orderDetailApi.selectUserOrderDetail, payload);
      if (res) {
        yield put({
          type: 'saveOrder',
          payload: res.data,
        });
      }
    },

    *userCancelOrder({ payload, callback }, { call, put }) {
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
    *userCancelOrderSendMsg({ payload, callback }, { call, put }) {
      const res = yield call(orderDetailApi.userCancelOrderSendMsg, payload)
      if (res) {
        if( res.code === 1){
          Taro.showToast({
            title:'取消成功',
            icon:'none'
          })
        }
        if (callback) {
          callback();
        }
      }
    },
    * userFrezzAgain({ payload }, { call, put }) {
      const res = yield call(orderDetailApi.userFrezzAgain, payload);
      if (res && res.code === 1) {
        try {
          const payres = yield tradePay('orderStr', res.data.data.data);
          if (payres.resultCode !== '9000') {
            Taro.showToast({
              // title: payres.memo,
              title: '支付失败',
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
      else {
        Taro.showToast({
          title:'该笔订单为转转惠租订单，请前往转转app惠租去支付',
          icon:'none'
        })
      }
    },
    * payReletAgain({ payload }, { call, put }) {
      const res = yield call(orderDetailApi.payReletAgain, {...payload,uid:getUid()});
      if (res) {
        try {
          const payres = yield tradePay('tradeNO', res.data);
          if (payres.resultCode !== '9000') {
            Taro.showToast({
              // title: payres.memo,
              title: '支付失败',
              icon: 'none',
            });
          } else {
            // const nextStatus = 'WAITING_GIVE_BACK';
            // yield put({
            //   type: 'setOrderStatus',
            //   payload: nextStatus,
            // });
            yield put({
              type: 'orderDetail/selectUserOrderDetail',
              payload: {
                orderId: payload.orderId,
              },
            });
            const nextStatus = 'WAITING_PAYMENT';
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
        } catch (e) {
          Taro.showToast({
            title: '支付失败，请重试或联系客服',
            icon: 'none',
          });
        }
      }
    },
    * payBuyOutAgain({ payload }, { call, put }) {
      const res = yield call(orderDetailApi.payBuyOutAgain, {...payload,uid:getUid()});
      if (res) {
        try {
          const payres = yield tradePay('tradeNO', res.data);
          if (payres.resultCode !== '9000') {
            Taro.showToast({
              // title: payres.memo,
              title:'支付失败',
              icon: 'none',
            });
          } else {
            // const nextStatus = 'WAITING_GIVE_BACK';
            // yield put({
            //   type: 'setOrderStatus',
            //   payload: nextStatus,
            // });
            yield put({
              type: 'orderDetail/selectUserOrderDetail',
              payload: {
                orderId: payload.orderId,
              },
            });
            const nextStatus = 'WAITING_PAYMENT';
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
      if (res && res.code === 99) {
        try {
          const payres = yield tradePay('tradeNO', res.data)
          // console.log('====', payres);
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
    * getSysConfigByKey({ payload }, { call, put }) {
      const res = yield call(orderListApi.getSysConfigByKey, { ...payload });
      if (res) {
        yield put({
          type: 'sysConfigValue',
          payload: res.data.sysConfigValue,

        });
      }
    },
  },

  reducers: {
    saveOrder(state, { payload }) {
      // return { ...state, ...payload };
      return  payload ;
    },
    sysConfigValue(state, { payload }) {
      return {
        ...state,
        sysConfigValue:payload
      };
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
