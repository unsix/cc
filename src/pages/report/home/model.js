
import * as HomeApi from './service';

export default {
  namespace: 'reportHome',
  state: {
    code:''
  },

  effects: {
    * validateCodes({payload},{call,put}){
      console.log('12312312312312312312123')
      const res =  yield call(HomeApi.validateCodses, payload);
      if (res) {
        yield put({
          type: 'validateCode',
          payload: res,
        });
      }
      else {
        // console.log('111')
        // alert('失败')
      }
    }
  },
  reducers: {
    validateCode (state, { payload }){
      let code = payload.arrayBuffer()
      return (
        "data:image/png;base64," +
        btoa(
          new Uint8Array(code).reduce(
            (code, byte) => code + String.fromCharCode(byte),
            ""
          )
        )
      )
      return {
        ...state,
        code:payload
      };
    }
  }
}
