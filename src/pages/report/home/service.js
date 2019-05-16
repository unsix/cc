import Request from '../../../utils/request';

export const validateCodses = (data) => Request({
  url: 'user/validateCode',
  credentials: "include",
  method: 'GET',
  test:'report',
  data
});
// export const validateCode = data => Request({
//   url: 'user/validateCode',
//   data,
//   method: 'GET',
// });
