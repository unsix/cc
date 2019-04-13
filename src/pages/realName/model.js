import * as realNameApi from './service';

export default {
  namespace: 'realName',
  state: {
    codeTime: null,
    codeKey: null,
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

    saveSmsCode(state, { payload }) {
      return {
        ...state,
        codeKey: payload.code_key,
        codeTime: payload.code_time,
      };
    },
  },
};
