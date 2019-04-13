import Taro from '@tarojs/taro';
import * as addAddressApi from './service';
import { getUid } from '../../utils/localStorage';

export default {
  namespace: 'addAddress',
  state: {
    addressList: [],
    addressInfo: {},
  },

  effects: {
    * fetchAddress({ payload, callback }, { call, put }) {
      const res = yield call(addAddressApi.selectByAddressListByUid, { ...payload, uid: getUid() });
      if (res) {
        yield put({
          type: 'saveCurrentAddress',
          payload: res.data
        });
        if (callback) {
          callback(res.data);
        }
      }
    },
    * subAddress({ payload, callback }, { call, put }) {
      let work = addAddressApi.insertAddress;
      if (payload.id) {
        work = addAddressApi.updateAddress;
      }
      const res = yield call(work, { ...payload, uid: getUid() });
      if (res) {
        yield put({
          type: 'address/getUserAllAddressList',
        });
        if (callback) {
          callback();
        }
        
      }
    },
    * deleteAddress({ payload, callback }, { call, put }) {
      const res = yield call(addAddressApi.deleteAddress, { ...payload, uid: getUid() })
      if (res) {
        yield put({
          type: 'address/getUserAllAddressList',
        });
      }
      if (callback) {
        callback();
      }
    },
    * selectByPraentIdToName({ payload }, { call, put }) {
      const res = yield call(addAddressApi.selectByPraentIdToName, payload);
      if (res) {
        yield put({
          type: 'saveAddressList',
          payload: res.data,
        });
      }
    },
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(addAddressApi.demo, {});
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
    saveAddressList(state, { payload }) {
      return {
        ...state,
        addressList: payload,
      };
    },
    saveCurrentAddress(state, { payload }) {
      return {
        ...state,
        addressInfo: payload,
      };
    },
    clearCurrentAddress(state, { payload }) {
      return {
        ...state,
        addressInfo: {},
      };
    },
  },

};
