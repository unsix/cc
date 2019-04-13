import Taro from '@tarojs/taro';
import * as mineApi from './service';
import { getAuthCode, apNsf } from '../../utils/openApi';
import { setUid, setBuyerId, setUserName, setTelephone, getUid } from '../../utils/localStorage';

export default {
  namespace: 'mine',
  state: {
    productList: [],
    statusNumInfo: {},
  },

  effects: {

    * fetchAuthCode({ callback }, { call, put }) {
      let res = null;
      try {
        res = yield getAuthCode();
      } catch (e) {
        Taro.showToast({
          title: '授权失败，请重试',
          icon: 'none',
        });
      }

      if (res) {
        const exeRes = yield call(mineApi.exemptLogin, { authCode: res.authCode });
        if (exeRes) {
          yield put({
            type: 'saveUser',
            payload: exeRes.data,
          });
          const apRes = yield apNsf({
            user_id: exeRes.data.userId,
            mobile_no: exeRes.data.telephone || 'null',
          })
          // console.lo'img('=====', apRes);
        }
        if (callback) {
          callback();
        };
      }
    },

    * recommendPoductList(_, { call, put }) {
      const res = yield call(mineApi.recommendPoductList);
      if (res) {
        yield put({
          type: 'saveProductList',
          payload: res.data,
        });
      }
    },

    * userOrderStatusCount(_, { call, put }) {
      const res = yield call(mineApi.userOrderStatusCount, {
        uid: getUid(),
        status: [
          'WAITING_PAYMENT',
          'WAITING_BUSINESS_DELIVERY',
          'WAITING_USER_RECEIVE_CONFIRM',
          'WAITING_GIVE_BACK',
          'WAITING_CONFIRM_SETTLEMENT',
          'WAITING_SETTLEMENT',
          'WAITING_SETTLEMENT_PAYMENT',
          'SETTLEMENT_RETURN_CONFIRM_PAY',
          'ORDER_VERDUE',
          'SETTLEMENT_RETURN_CONFIRM_PAY',
        ]
      })
      if (res) {
        yield put({
          type: 'saveStatusNumInfo',
          payload: res.data,
        });
      }
    },

    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(mineApi.demo, {});
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
    saveUser(state, { payload }) {
      setUserName(payload.userName);
      setTelephone(payload.telephone);
      setUid(payload.uid);
      setBuyerId(payload.userId);
      return { ...state, ...payload };
    },
    saveProductList(state, { payload }) {
      return {
        ...state,
        productList: payload,
      };
    },
    saveStatusNumInfo(state, { payload }) {
      return {
        ...state,
        statusNumInfo: payload,
      };
    },
    setIsCertified(state, { payload }) {
      return {
        ...state,
        isCertified: payload,
      };
    },
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },

};
