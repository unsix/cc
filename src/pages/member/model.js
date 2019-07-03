import Taro from '@tarojs/taro';
import * as memberApi from './service'
import { getUid, setBuyerId, setTelephone, setUid, setUserName } from '../../utils/localStorage'
import { apNsf, getAuthCode, tradePay } from '../../utils/openApi'
import * as mineApi from '../mine/service'

export default {
  namespace: 'members',
  state: {
    memberIfn:{},
    date:'',
    couponList:[],
    queryInfo: {
      pageNumber: 1,
      pageSize: 10,
    },
    wingRecordsList:[],
    ExChangeInfo: {
      pageNum: 1,
      pageSize: 100,
    },
    total:[]
  },

  effects: {
    // * getMember({ payload ,callback}, { call, put }) {
    //   const res = yield call(memberApi.getUserMembers, { ...payload, uid: getUid() });
    //   // console.log(getUid(),'2312312312312321')
    //   if(res){
    //     yield put({
    //       type: 'memberInf',
    //       payload: res.data,
    //     });
    //     if(callback){
    //       callback(res.data)
    //     }
    //   }
    // },
    * userPayMembers({ payload ,callback}, { call, put }) {
      const res = yield call(memberApi.userPayMembers, { ...payload, uid: getUid() });
      // console.log(getUid(),'2312312312312321')
      if (res) {
        try {
          const payres = yield tradePay('tradeNO', res.data)
          // console.log('====', payres);
          // yield put({
          //   type: 'selectOrderByStagesList',
          //   payload: { orderId: payload.orderId }
          // });
          let type = 'detail';
          if (payres.resultCode !== '9000') {
            console.log(payres.resultCode )
            Taro.showToast({
              title: payres.memo,
              icon: 'none',
            });
            type = 'list';
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
    * memberCoupon({ payload }, { call, put }) {
      const newPayload = { ...payload };
      const keys = Object.keys(payload);
      if (keys.length) {
        keys.forEach(key => {
          if (newPayload[key] === null) {
            delete newPayload[key];
          }
        });
      }
      // console.log(newPayload,'0000000000000000000')
      const res = yield call(memberApi.memberCoupon, { ...newPayload,  });
      if (res) {
          yield put({
            type: 'couponList',
            payload: res.data,
          });
        }
    },
    * getUserMembersEquitiesAllByUid({ payload ,callback}, { call, put }) {
      const res = yield call(memberApi.getUserMembersEquitiesAllByUid, { ...payload, uid:getUid() });
      // console.log(getUid(),'2312312312312321')
      if(res){
        yield put({
          type: 'memberInf',
          payload: res.data,
        });
        if(callback){
          callback(res.data)
        }
      }
    },
    * getPlatformMemberCoupon({ payload ,callback}, { call, put }) {
      const res = yield call(memberApi.getPlatformMemberCoupon, { ...payload, uid:getUid() });
      // console.log(getUid(),'2312312312312321')
      if(res){
        if(res.code === 1){
          Taro.showToast({
            title:'兑换成功，请前往卡包查看'
          })
        }
        if (callback){
          callback(res)
        }
      }
    },
    * wingRecords({ payload ,callback}, { call, put }) {
      const res = yield call(memberApi.wingRecords, { ...payload, uid:getUid() });
      // console.log(getUid(),'2312312312312321')
      if(res){
        yield put({
          type: 'wingRecordsList',
          payload: res.data,
        });
      }
    },
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
          // const apRes = yield apNsf({
          //   user_id: exeRes.data.userId,
          //   mobile_no: exeRes.data.telephone || 'null',
          // })
          // console.log('=====', apRes);
        }
        if (callback) {
          callback();
        };
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
    memberInf (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        memberIfn:payload,
        // date:formatDate(payload.userMembers[0].dueTime),
        // date:formatDate(new Date(payload.userMembers[0].dueTime), 'yyyy年MM月dd')
      };
    },
    couponList (state, { payload }){
      return {
        ...state,
        couponList:state.couponList.concat(payload),
        // date:formatDate(payload.userMembers[0].dueTime),
        // date:formatDate(new Date(payload.userMembers[0].dueTime), 'yyyy年MM月dd')
        queryInfo: {
          ...state.queryInfo,
          pageNumber: state.queryInfo.pageNumber + 1,
        },
        total:payload,
      };
    },
    wingRecordsList (state, { payload }){
      // console.log(payload,'sjhfdghursfgyu')
      return {
        ...state,
        // wingRecordsList:state.wingRecordsList.concat(payload),
        wingRecordsList:payload,
        // ExChangeInfo: {
        //   ...state.queryInfo,
        //   pageNum: state.queryInfo.pageNum + 1,
        // },
        // total:payload,
      };
    },
  },

};
