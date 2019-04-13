import Taro from '@tarojs/taro';
import * as confirmOrderApi from './service';
import { tradePay } from '../../utils/openApi';
import { getUid, setBuyerId } from '../../utils/localStorage';

export default {
  namespace: 'confirmOrder',
  state: {

  },

  effects: {
    * userConfirmOrder({ payload, callback }, { call, put }) {
      const res = yield call(confirmOrderApi.userConfirmOrder, { ...payload, uid: getUid() });
      if (res) {
        yield put({
          type: 'saveOrder',
          payload: res.data,
        });
        if (callback) {
          callback();
        }
      }
    },
    * userSubmitOrder({ payload, callback }, { call }) {
      const res = yield call(confirmOrderApi.userSubmitOrder, { ...payload, uid: getUid() });
      // const userAlipay = yield call(confirmOrderApi.userAlipayTradePay, { orderId: '20190309164587841' });
      if (res) {
        try {
          const payres = yield tradePay('orderStr', res.data.freezeStr.data);
          // 支付成功进入订单详情页，失败则进入订单列表页
          let type = 'detail';
          if (payres.resultCode !== '9000') {
            Taro.showToast({
              title: payres.memo,
              icon: 'none',
            });
            type = 'list';
          }
          if (callback) {
            callback(res.data.orders.orderId, type);
          }

          // const resObj = JSON.parse(payres.result);
          // const userAlipay = yield call(confirmOrderApi.userAlipayTradePay, { orderId: resObj.alipay_fund_auth_order_app_freeze_response.out_request_no });
          // if (userAlipay) {
          //   if (callback) {
          //     callback(res.data.orders.orderId);
          //   }
          // }
        } catch (e) {
          Taro.showToast({
            title: '授权失败，请重试或联系客服',
            icon: 'none',
          });
        }
      }
      // const str = "alipay_sdk=alipay-sdk-java-3.4.27.ALL&app_id=2019011162880259&biz_content=%7B%22amount%22%3A%220.01%22%2C%22extra_param%22%3A%22%7B%5C%22category%5C%22%3A%5C%22RENT_PHONE%5C%22%7D%22%2C%22order_title%22%3A%22%E9%A2%84%E6%8E%88%E6%9D%83%E5%86%BB%E7%BB%93%2C%E8%AE%A2%E5%8D%95%E5%8F%B7%3A+1000001010107288%22%2C%22out_order_no%22%3A%221000001010107288%22%2C%22out_request_no%22%3A%221000001126161461%22%2C%22payee_logon_id%22%3A%22laiyong%40yichain-tech.com%22%2C%22product_code%22%3A%22PRE_AUTH_ONLINE%22%7D&charset=UTF-8&format=json&method=alipay.fund.auth.order.app.freeze&notify_url=http%3A%2F%2F47.110.155.113%3A9000%2Feureka-components%2FaliPay%2FgetOrderAppFreezeCallBack&sign=nA3BZUQvIifhZmJ1PrcfauZmxJPikrvnJjh3bYBqp4Q63Zz9ZPSsjYRPajINNzLg08uVCV5QnS%2BYFJ9TCh4mpz5ytgRjzrC%2FCSFM63O3vjIAKYOjZDcCedFdxb2ST%2Fwh%2ByUGF542%2FSXr8LZuSwpVliX1srMrzzcQrUujWDU51uboz19vytSXlVRFZ2Xjbp8OOmmAKUd9KK096U2rpHuc1dNqmfiOw3snVfB7q84bnsB%2Bdfy5h4kHj2vr8G%2F5oZ0tUrZXyMVt4tBuFMt1BUf1bh51b5FYTGJgEILt6XHYxefZIU%2F74HKcThWjKGdlB3MPxO1hvA83yaqHSRR4SSu5jg%3D%3D&sign_type=RSA2&timestamp=2019-03-07+11%3A14%3A44&version=1.0";
      // tradePay(str);
    },
  },

  reducers: {
    saveOrder(state, { payload }) {
      return { ...state, ...payload };
    },

    setOrderRealState(state, { payload }) {
      return {
        ...state,
        realNameStatus: payload,
      };
    },

    setDefaultUserAddress(state, { payload }) {
      return {
        ...state,
        defaultUserAddress: payload,
      };
    },
  },

};
