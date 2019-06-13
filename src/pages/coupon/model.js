import Taro from '@tarojs/taro';
import * as couponApi from './service';
import { getUid } from '../../utils/localStorage';

export default {
  namespace: 'coupon',
  state: {
    queryInfo: {
      status: 0,
      pageNumber: 1,
      pageSize: 10,
    },
    userPlatformCoupon: [],
    userShopCoupon: [],
  },

  effects: {
    * getAllUserCouponList({ payload }, { call, put }) {
      const newPayload = { ...payload };
      const keys = Object.keys(payload);
      if (keys.length) {
        keys.forEach(key => {
          if (newPayload[key] === null) {
            delete newPayload[key];
          }
        });
      }
      const res = yield call(couponApi.getAllUserCouponList, { ...newPayload, uid: getUid() });
      if (res) {
        console.log(payload,'================')
        if (payload.fetchType === 'scroll') {
          if (!res.data.userPlatformCoupon.length && !res.data.userShopCoupon.length) {
            Taro.showToast({
              title: '没有更多优惠券了',
              icon: 'none',
            });
            return;
          }
          yield put({
            type: 'concatCouponList',
            payload: res.data,
          });
        } else {
          yield put({
            type: 'saveCouponList',
            payload: { data: res.data, queryInfo: payload },
          });
        }
      }
    },
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(couponApi.demo, {});
      if (status === 'ok') {
        yield put({
          type: 'save',
          payload: {
            topData: data,
          }
        });
      }
    },
    * getUserMembersEquitiesByUid({ payload ,callback}, { call, put }) {
      const res = yield call(couponApi.getUserMembersEquitiesByUid, { ...payload, uid:getUid() });
      // console.log(getUid(),'2312312312312321')
      if(res){
        // if(res.code === 1){
        //   Taro.showToast({
        //     title:'兑换成功，请前往卡包查看'
        //   })
        // }
        yield put({
          type:'equity',
          payload:res.data
        })
      }
    },
    * checkInvokeCode({ payload ,callback}, { call, put }) {
      const res = yield call(couponApi.checkInvokeCode, { ...payload, uid:getUid() });
      // console.log(getUid(),'2312312312312321')
      if(res){
        // if(res.code === 1){
        //   Taro.showToast({
        //     title:'兑换成功，请前往卡包查看'
        //   })
        // }
        // yield put({
        //   type:'equity',
        //   payload:res.data
        // })
        if(callback){
          callback(res)
        }
      }
    },
    * getRecordByReportNo({ payload ,callback}, { call, put }) {
      const res = yield call(couponApi.getRecordByReportNo, { ...payload,  });
      // console.log(getUid(),'2312312312312321')
      if(res){
        // if(res.code === 1){
        //   Taro.showToast({
        //     title:'兑换成功，请前往卡包查看'
        //   })
        // }
        // yield put({
        //   type:'equity',
        //   payload:res.data
        // })
      }
    },
  },

  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
    equity(state, { payload }) {
      return { ...state,
        equity:payload
      };
    },
    concatCouponList(state, { payload }) {
      const userPlatformCoupon = [...state.userPlatformCoupon];
      const userShopCoupon = [...state.userShopCoupon];
      return {
        ...state,
        userPlatformCoupon: userPlatformCoupon.concat(payload.userPlatformCoupon),
        userShopCoupon: userShopCoupon.concat(payload.userShopCoupon),
        queryInfo: {
          ...state.queryInfo,
          pageNumber: state.queryInfo.pageNumber + 1,
        },
      }
    },
    saveCouponList(state, { payload }) {
      return {
        ...state,
        userPlatformCoupon: payload.data.userPlatformCoupon,
        userShopCoupon: payload.data.userShopCoupon,
        total: payload.data.total,
        queryInfo: {
          ...payload.queryInfo,
          pageNumber: 1,
        },
      };
    },
  },

};
