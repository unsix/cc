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
    // 为你推荐列表
    recommendproductsList:[],
    images_ismain:[],
    minRentCycleday: null
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
    // itemid商品详情其他接口
    * recommendproducts({ payload }, { call, put }) {
      // console.log(payload ,productDetailApi.recommendproducts)
      const res = yield call(productDetailApi.recommendproducts, payload);
      // console.log(res,'===>')
      if (res) {
        yield put({
          type: 'saveRecommend',
          payload: res.data,
        });
      }
    },
    * getCoupon({ payload }, { call, put }) {
      const res = yield call(productDetailApi.getCoupon, { ...payload, uid: getUid() });
      // if(res.code == 1){
      //   Taro.navigateTo({ url: 'pages/active_pages/claimed/index' });
      // }
      // if(res.code == 0){
      //   Taro.navigateTo({ url: 'pages/active_pages/claimed/index' });
      // }
      if (res) {
        Taro.showToast({
          title: res.msg,
          icon: 'none',
        });
      }
    },
    * conuponSearch({payload},{call,put}){
      const res =  yield call(productDetailApi.conuponSearch, { ...payload, uid: getUid() });
      if(res.code == 1){
        Taro.navigateTo({ url: '/pages/active_pages/claimed/index' });
      }
      else{
        Taro.navigateTo({ url: '/pages/active_pages/claimed/index' });
      }

    }
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
      if(payload.images && payload.images.length){
        payload.images.sort(function compare(a,b){
          return b.isMain-a.isMain;
        }); 
      }
      return {
        ...state,
        detail: payload,
        images_ismain:payload.images,
        currentSku: {
          ...payload.skus[0],
          currentCyclePrice: payload.skus[0].cyclePrices[0],
        },
        currentDays: payload.skus[0].cyclePrices[0].days,
        minRentCycleday:payload.minRentCycle,
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
      // console.log(payload,'sososoosososo=========================soos')
      return {
        ...state,
        currentSku: {
          ...state.currentSku,
          currentCyclePrice: { ...newCurrentCyclePrice },
        },
        currentDays: payload,
        minRentCycleday:payload
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
    // 为你推荐
    saveRecommend (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        recommendproductsList:payload
      };
    }
  },

};
