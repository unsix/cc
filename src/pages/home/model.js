import * as homeApi from './service';
// import { getAuthCode } from '../../utils/openApi'
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
    queryInfo: {
      pageNum: 1,
      pageSize: 10,
    },
    // total:0
  },

  effects: {
    * getIndexActionListByPage({payload,callback}, { call, put }) {
      const res = yield call(homeApi.getIndexActionListByPage, { ...payload,channel: 3 });
      if (res) {
        yield put({
          type: 'save',
          payload: res.data,
        });
        if(callback){
          callback(res.data.tabList[0].id)
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
      const newPayload = { ...payload };
      const keys = Object.keys(payload);
      if (keys.length) {
        keys.forEach(key => {
          if (newPayload[key] === null) {
            delete newPayload[key];
          }
        });
      }
      // console.log(payload,'=============payload')
      const res = yield call(homeApi.getIndexTabAndProduct, { ...newPayload});
      if (res) {
        if (payload.fetchType === 'scroll') {
          yield put({
            type: 'concatProductList',
            payload: res.data,
          });
        } else {
          yield put({
            type: 'saveProductList',
            payload: { data: res.data, queryInfo: payload },
          });
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
      return {
        ...state,
        ...payload,
        products:payload.products.records
      };
    },
    saveTab(state, { payload }) {
      return {
        ...state,
        tabList: payload };
    },
    concatProductList(state, { payload }) {
      const products  = [...state.products]
      // console.log(state,'state')
      // console.log(payload,'payload')
      // console.log(products,'products')
      return {
        ...state,
        products:products.concat(payload.records),
        queryInfo: {
          ...state.queryInfo,
          pageNum: state.queryInfo.pageNum + 1,
        },
        total:payload.total
      };
    },
    saveProductList(state, { payload }) {
      // const products  = [...state.products]
      // console.log(state,'state')
      // console.log(payload,'payload')
      // console.log(products,'products')
      return {
        ...state,
        products:payload.data.records,
        queryInfo: {
          ...payload.queryInfo,
          pageNum: payload.data.current,
        },
        // total:payload.data.current
      };
    },
  },
};
