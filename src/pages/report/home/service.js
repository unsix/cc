import Request from '../../../utils/request';
// export const validateCodses = () => Request({
//   url: 'user/validateCode',
//   credentials: "include",
//   method: 'GET',
//   test:'report',
// });

export const checkParams = (data) =>Request(({
  url:'checkParams',
  method: 'POST',
  test:'report',
  contentType: 'application/www',
  data,
}))
// export const validateCode = data => Request({
//   url: 'user/validateCode',
//   data,
//   method: 'GET',
// });
export const selectProductDetail = data => Request({
  url: 'aliPay/product/selectProductDetail',
  method: 'GET',
  data,
});

export const reportPay = data => Request({
  url: 'aliPay/preForAppPay',
  test:'report',
  method: 'GET',
  data,
});
export const getCheckResultByTradeNo = data => Request({
  url: 'getCheckResultByTradeNo',
  test:'report',
  method: 'GET',
  data,
});
export const getResultById = data => Request({
  url: 'getResultById',
  test:'report',
  method: 'GET',
  data,
});
