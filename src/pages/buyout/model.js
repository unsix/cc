import Taro from '@tarojs/taro';
import * as buyoutApi from './service'
import { getBuyerId, getUid } from '../../utils/localStorage'
import { tradePay } from '../../utils/openApi'


export default {
  namespace: 'buyout',
  state: {
    cashes: {},
    product: {},
    userAddress: {},
    userOrders: {},
  },

  effects: {
    * getBuyOutConfirm({payload,callback},{call,put}){
      const res =  yield call(buyoutApi.getBuyOutConfirm, { ...payload, uid: getUid() });
      if (res) {
        if(res.code === 99){
          my.confirm({
            title: '亲',
            content: '该笔订单有未支付买断订单，是否立即支付',
            confirmButtonText: '立即前往',
            cancelButtonText: '暂不支付',
            success: (result) => {
             if(result.confirm === true){
               Taro.redirectTo({
                 url:`/pages/buyout/index?orderId=${res.data}`
               })
             }
             else {
               Taro.navigateBack()
             }
            },
          });
        }
        yield put({
          type: 'confirmInf',
          payload: res.data,
        });
          // callback()
      }
    },
    * reletBuyDays({payload,callback},{call,put}){
      const res =  yield call(buyoutApi.reletBuyDays, { ...payload, uid: getUid() });
      if (res) {
        // if(res.code === 1){
        //
        // }
        yield put({
          type: 'renewalInf',
          payload: res.data,
        });
        if(callback){
          callback(res.data)
        }
      }
    },
    * submitBuyOut({ payload ,callback}, { call, put }) {
      const res = yield call(buyoutApi.submitBuyOut, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if (res) {
        try {
          const payres = yield tradePay('tradeNO', res.data)
          // console.log('====', payres);
          // yield put({
          //   type: 'selectOrderByStagesList',
          //   payload: { orderId: payload.orderId }
          // });
          console.log(payres)
          let type = 'suc';
          if (payres.resultCode !== '9000') {
            console.log(payres.resultCode )
            Taro.showToast({
              title: '支付失败',
              icon: 'none',
            });
            yield put({
              type: 'orderList/setOrderStatus',
              payload: {
                orderId: payload.orderId,
              },
            });
            type = 'erro';
          }
          else {
            Taro.showToast({
              title:'支付成功'
            });
            const nextStatus = 'WAITING_GIVE_BACK';
            yield put({
              type: 'orderList/setOrderStatus',
              payload: {
                orderId: payload.orderId,
                status: nextStatus,
              },
            });
          }

          if (callback) {
            // console.log(res.data.orders.orderId)
            callback(type);
          }

          // if (callback) {
          //   // console.log(res.data.orders.orderId)
          //   callback(res.data, type);
          // }
        } catch (e) {
          // console.log('====1', e);
          Taro.showToast({
            title: '支付失败，请重试或联系客服',
            icon: 'none',
          });
        }
        // Taro.showToast({
        //   title: res.msg,
        //   icon: 'none',
        // });
        if(callback){
          callback(res.data)
        }
      }
    },
    * payBuyOutAgain({ payload }, { call, put }) {
      const res = yield call(buyoutApi.payBuyOutAgain, {...payload,uid:getUid()});
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
            yield put({
              type: 'orderList/setOrderStatus',
              payload: {
                orderId: payload.orderId,
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
    *selectUserOrderDetail({ payload }, { call, put }) {
      const res = yield call(buyoutApi.selectUserOrderDetail, payload);
      if (res) {
        yield put({
          type: 'saveOrder',
          payload: res.data,
        });
      }
    },

    *userCancelOrder({ payload, callback }, { call, put }) {
      const res = yield call(buyoutApi.userCancelOrder, payload);
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
      const res = yield call(buyoutApi.userFrezzAgain, payload);
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
      const res = yield call(buyoutApi.userConfirmReceipt, payload)
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
    * allOrderStages({ payload , callback }, { call, put }) {
      const res = yield call(buyoutApi.allOrderStages, { ...payload, uid: getUid() })
      if (res) {
        try {
          const payres = yield tradePay('tradeNO', res.data)
          // console.log('====', payres);
          // yield put({
          //   type: 'selectOrderByStagesList',
          //   payload: { orderId: payload.orderId }
          // });
          let type = 'suc';
          if (payres.resultCode !== '9000') {
            console.log(payres.resultCode )
            Taro.showToast({
              title: payres.memo,
              icon: 'none',
            });
            type = 'erro';
          }
          if (callback) {
            // console.log(res.data.orders.orderId)
            callback(type);
          }

          // if (callback) {
          //   // console.log(res.data.orders.orderId)
          //   callback(res.data, type);
          // }
        } catch (e) {
          // console.log('====1', e);
          Taro.showToast({
            title: '支付失败，请重试或联系客服',
            icon: 'none',
          });
        }
        // const nextStatus = 'WAITING_GIVE_BACK';
        // yield put({
        //   type: 'setOrderStatus',
        //   payload: nextStatus,
        // });
        // yield put({
        //   type: 'orderList/setOrderStatus',
        //   payload: {
        //     orderId: payload.orderId,
        //     status: nextStatus,
        //   },
        // });
        if(callback){
          callback()
        }
      }
    },
    // 用户申请修改结算单
    * userApplicationForAmendmentOfSettlementForm({ payload }, { call, put }) {
      const res = yield call(buyoutApi.userApplicationForAmendmentOfSettlementForm, payload);
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
      const res = yield call(buyoutApi.confirmOrderSettlement, { ...payload, buyerId: getBuyerId() });
      if (res && res.data !== '2') {
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
  },

  reducers: {
    renewalInf (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        renewalInf:payload
      };
    },
    confirmInf (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        confirmInf:payload
      };
    },
    saveOrder(state, { payload }) {
      // return { ...state, ...payload };
      return  payload ;
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
