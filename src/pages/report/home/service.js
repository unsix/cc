import Request from '../../../utils/request';
export const validateCodses = () => Request({
  url: 'user/validateCode',
  credentials: "include",
  method: 'GET',
  test:'report',
});

export const checkParams = (data) =>Request(({
  url:'user/checkParams',
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
