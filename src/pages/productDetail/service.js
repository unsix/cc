import Request from '../../utils/request';

export const selectProductDetail = data => Request({
  url: 'aliPay/product/selectProductDetail',
  method: 'GET',
  data,
});

export const userConfirmOrder = data => Request({
  url: 'aliPay/order/userConfirmOrder',
  method: 'POST',
  data,
  contentType: 'application/json',
});


export const getCoupon = data => Request({
  url: 'aliPay/coupon/getCoupon',
  method: 'GET',
  data,
});