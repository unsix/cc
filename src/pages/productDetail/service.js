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

//查询红包

export const conuponSearch = data => Request({
  url: 'aliPay/coupon/getOneUserPlatformCoupon',
  method: 'GET',
  data,
});

//折扣
export const getUserMembersDisCount = () => Request({
  url: 'aliPay/user/members/getUserMembersDisCount',
  method: 'GET',
});

//优惠劵
export const getProductCoupon = (data) => Request({
  url: 'aliPay/product/getProductCoupon',
  method: 'GET',
  data
});
