import Request from '../../../utils/request';

export const getCoupon = data => Request({
  url: 'aliPay/coupon/getCoupon',
  method: 'GET',
  data,
});
