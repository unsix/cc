import Taro from '@tarojs/taro';
import * as mineApi from './service';
import { getAuthCode, apNsf ,getOpenUserInfo} from '../../utils/openApi';
import { setUid, setBuyerId, setUserName, setTelephone, getUid ,setAvatar} from '../../utils/localStorage';

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
          const obj = {
            authCode: res.authCode,
            type:3
          }
          let newObj = null
          try {
            newObj = yield getOpenUserInfo();
          } catch (e) {
            Taro.showToast({
              title: '授权失败，请重试',
              icon: 'none',
            });
          }
          if(newObj){
           let userInfo = JSON.parse(newObj.response).response
           let alipayUserInfoNewDTO = {
             authCode:obj.authCode,
             type:3,
             avatar:userInfo.avatar ,
             city: userInfo.city,
             gender:userInfo.gender ,
             nickName: userInfo.nickName,
             province: userInfo.province,
           }
            const exeRes = yield call(mineApi.exemptLoginNew, { ...alipayUserInfoNewDTO});
            if (exeRes) {
              yield put({
                type: 'saveUser',
                payload: exeRes.data,
              });
              //userrisk
              // const apRes = yield apNsf({
              //   user_id: exeRes.data.userId,
              //   mobile_no: exeRes.data.telephone || 'null',
              // })
              // console.log('=====', apRes);
              if (callback){
                callback()
              }
            }
          }
      }
    },
    * fetchAuthCodeProduct({ callback }, { call, put }) {
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
        const obj = {
          authCode: res.authCode,
          type:3
        }
          const exeRes = yield call(mineApi.exemptLoginNew, { ...obj});
          if (exeRes) {
            yield put({
              type: 'saveUser',
              payload: exeRes.data,
            });
            if (callback){
              callback()
            }
          // }
        }
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
      setAvatar(payload.avatar),
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
