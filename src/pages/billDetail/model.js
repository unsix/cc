import Taro from '@tarojs/taro';
import * as billDetailApi from './service';
import { getBuyerId } from '../../utils/localStorage';
import { tradePay } from '../../utils/openApi';

export default {
  namespace: 'billDetail',
  state: {
    totalRent: 0,
    repaidRent: 0,
    repaidList: [], // 已支付列表
    unpaidList: [], // 未支付列表
    product: {},
  },

  effects: {
    * selectOrderByStagesList({ payload }, { call, put }) {
      const res = yield call(billDetailApi.selectOrderByStagesList, payload);
      if (res) {
        yield put({ 
          type: 'saveList',
          payload: res.data,
        });
      }
    },
    * orderbyStagesPay({ payload }, { call, put }) {
      const res = yield call(billDetailApi.orderbyStagesPay,
        { totalAmount: payload.payTotal, outTradeNo: payload.outTradeNo, buyerId: getBuyerId() });
      if (res) {
        try {
          const payres = yield tradePay('tradeNO', res.data)
          console.log('====', payres);
          // yield put({
          //   type: 'selectOrderByStagesList',
          //   payload: { orderId: payload.orderId }
          // });
        } catch (e) {
          console.log('====1', e);
          Taro.showToast({
            title: '支付失败，请重试或联系客服',
            icon: 'none',
          });
        }
      }
    },
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(billDetailApi.demo, {});
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
    saveList(state, { payload }) {
      const list = [...payload];
      let totalRent = 0;
      let repaidRent = 0;
      let unpaidList = []; // 未支付
      let repaidList = []; // 已支付
      list.forEach(info => {
        totalRent = info.totalRent;
        if (info.status === 1 || info.status === 4) {
          unpaidList.push(info);
        }
        if (info.status === 2 || info.status === 3) {
          repaidList.push(info);
          repaidRent += info.currentPeriodsRent;
        }
      });
      return {
        ...state,
        totalRent,
        repaidRent,
        repaidList,
        unpaidList,
      };
    },
    saveProduct(state, { payload }) {
      return {
        ...state,
        product: payload,
      };
    },
  },

};
