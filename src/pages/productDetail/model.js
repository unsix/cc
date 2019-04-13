import Taro from '@tarojs/taro';
import * as productDetailApi from './service';
import { getUid } from '../../utils/localStorage';

export default {
  namespace: 'productDetail',
  state: {
    detail: {},
    currentSku: {
      currentCyclePrice: {},
    },
    currentDays: null, // 当前选中的租用天数
    advancedDays: [],  // 起租日期列表
    saveServers: [],   // 选中的安心服务列表id
    startDay: null,    // 选中的起租日期
    oldNewDegreeList: ['全新', '99新', '95新', '9成新', '8成新', '7成新'],
    serviceMarkList: ['包邮', '免押金', '免赔', '随租随还', '全新品', '分期支付'],
  },

  effects: {
    * fetchProductDetail({ payload }, { call, put }) {
      const res = yield call(productDetailApi.selectProductDetail, payload);
      if (res) {
        yield put({
          type: 'saveDetail',
          payload: res.data,
        });
      }
    },
    * getCoupon({ payload }, { call, put }) {
      const res = yield call(productDetailApi.getCoupon, { ...payload, uid: getUid() });
      if (res) {
        Taro.showToast({
          title: res.msg,
          icon: 'none',
        });
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },

    saveDetail(state, { payload }) {
      const { minAdvancedDays, maxAdvancedDays } = payload;
      let startTime = new Date().getTime();
      if (minAdvancedDays) {
        startTime += minAdvancedDays * 24 * 3600 * 1000;
      }
      const advancedDays = [startTime];

      let endDay = 30 - minAdvancedDays;
      if (maxAdvancedDays && maxAdvancedDays > minAdvancedDays) {
        endDay = maxAdvancedDays - minAdvancedDays;
      }
      for (let i = 1; i <= endDay; i += 1) {
        advancedDays.push(startTime + i * 24 * 3600 * 1000);
      }

      let saveServers = [];
      if (payload.additionalServices && payload.additionalServices.length) {
        payload.additionalServices.forEach(ser => {
          if (ser.isMust) {
            saveServers.push(ser.id);
          }
        });
      }
      return {
        ...state,
        detail: payload,
        currentSku: {
          ...payload.skus[0],
          currentCyclePrice: payload.skus[0].cyclePrices[0],
        },
        currentDays: payload.skus[0].cyclePrices[0].days,
        advancedDays,
        startDay: startTime,
        saveServers,
      };
    },

    setCurrentSku(state, { payload }) {
      const { currentSku } = state;
      const { skus } = state.detail;
      const specIds = currentSku.values.map(value => value.id === payload.preId ? payload.valueId : value.id);
      let newCurrentSku = {}
      if (skus.length) {
        newCurrentSku = skus.find(sku => {
          let returnVal = true;
          sku.values.forEach(value => {
            if (specIds.indexOf(value.id) < 0) {
              returnVal = false;
            }
          });
          return returnVal;
        });
      }
      return {
        ...state,
        currentSku: {
          ...state.currentSku,
          ...newCurrentSku,
          currentCyclePrice: newCurrentSku.cyclePrices[0],
        },
        currentDays: newCurrentSku.cyclePrices[0].days,
      };
    },

    setCurrentDays(state, { payload }) {
      const { currentSku } = state;
      const newCurrentCyclePrice = currentSku.cyclePrices.find(cycle => cycle.days <= payload);
      return {
        ...state,
        currentSku: {
          ...state.currentSku,
          currentCyclePrice: { ...newCurrentCyclePrice },
        },
        currentDays: payload,
      };
    },

    setStartDay(state, { payload }) {
      return {
        ...state,
        startDay: payload,
      };
    },

    setSaveServers(state, { payload }) {
      const { saveServers } = state;
      const index = saveServers.indexOf(payload);
      let newServers = [...saveServers];
      if (index > -1) {
        newServers.splice(index, 1);
      } else {
        newServers.push(payload);
      }
      return {
        ...state,
        saveServers: newServers,
      };
    },
  },

};
