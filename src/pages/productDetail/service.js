import Request from '../../utils/request';

export const selectProductDetail = data => Request({
  url: 'aliPay/product/selectProductDetail',
  method: 'GET',
  data,
});
// itemid其他详情
export const recommendproducts = data => Request({
  url: 'aliPay/product/recommendproducts',
  method: 'GET',
  test:'recommendproducts',
  data,
  // contentType: 'application/json',
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