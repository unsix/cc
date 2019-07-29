import * as homeApi from './service';
import { getAuthCode } from '../../utils/openApi'
import Taro from '@tarojs/taro'
import * as mineApi from '../mine/service'
import { setBuyerId, setTelephone, setUid, setUserName ,getUid} from '../../utils/localStorage'

export default {
  namespace: 'home',
  state: {
    bannerList: [],
    iconList: [],
    tabList: [],
    oldNewDegreeList: ['全新', '99新', '95新', '9成新', '8成新', '7成新'],
  },

  effects: {
    * getIndexList({callback}, { call, put }) {
      const res = yield call(homeApi.IndexList, { channel: 1 });
      if (res) {
        yield put({
          type: 'save',
          payload: res.data,
        });
        if(callback){
          callback(res.data.tabList[0].tab.id)
        }
      }
    },
    * getZhifubaoFlow({ payload}, { call, put }) {
      const res = yield call(homeApi.getZhifubaoFlow, { ...payload });
      if (res) {
        yield put({
          type: 'save',
          payload: res.data,
        });
      }
    },
    * getIndexTabAndProduct({ payload,callback}, { call, put }) {
      const res = yield call(homeApi.getIndexTabAndProduct, { ...payload });
      if (res) {
        yield put({
          type: 'save',
          payload: res.data,
        });
        if(callback){
          callback(res.data.tabArray[0].name)
        }
      }
    },
    * newcomerVerification({ payload,callback}, { call}) {
      const res = yield call(homeApi.newcomerVerification, { ...payload,uid:getUid()});
      if(res){
        if(res.data === false){
          Taro.showToast({
            title:'亲您已经是老用户啦'
          })
        }
       if(res.data === true){
         Taro.showToast({
           title:'授权登录成功'
         })
       }
        if(callback){
          callback()
        }
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
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
