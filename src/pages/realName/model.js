import * as realNameApi from './service';
import { getAuthCode ,getPhoneNumber} from '../../utils/openApi'
import Taro from '@tarojs/taro'
import { setBuyerId, setTelephone, setUid, setUserName } from '../../utils/localStorage'

export default {
  namespace: 'realName',
  state: {
    codeTime: null,
    codeKey: null,
    telephone:null,
  },

  effects: {
    * sendSmsCode({ payload, callback }, { call, put }) {
      const res = yield call(realNameApi.sendSmsCode, payload);
      if (res) {
        yield put({
          type: 'saveSmsCode',
          payload: res.data,
        });
      }
      callback(res);
    },
    * getPhoneNumber({ callback }, { call, put }) {
      let res = null;
      try {
        res = yield  getPhoneNumber();
      } catch (e) {
        Taro.showToast({
          title: '授权失败，请重试',
          icon: 'none',
        });
      }
       if(res){
         const exeRes = yield call(realNameApi.decrypt, { content:res,type:3 });
         if(exeRes){
           yield put({
             type: 'phone',
             payload: exeRes.mobile,
           });
         }
       }
    },
    * userCertificationAuth({ payload, callback }, { call, put }) {
      const res = yield call(realNameApi.userCertificationAuth, payload);
      if (res) {
        yield put({
          type: 'confirmOrder/setOrderRealState',
          payload: 1,
        });
        yield put({
          type: 'mine/setIsCertified',
          payload: 'T',
        });
        callback();
        Taro.showToast({
          title:res.msg,
          icon:'none'
        })
      }
    },
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(realNameApi.demo, {});
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
    phone(state, { payload }) {
      return { ...state,
        telephone:payload
      };
    },
    saveSmsCode(state, { payload }) {
      return {
        ...state,
        codeKey: payload.code_key,
        codeTime: payload.code_time,
      };
    },
  },
};
