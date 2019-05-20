import Request from '../../../utils/request';

export const getCoupon = data => Request({
  url: 'aliPay/coupon/getCoupon',
  method: 'GET',
  data,
});

export const getSettingDynamic = () => Request({
  url: 'aliPay/index/getSettingDynamic',
  method: 'GET',
  test:'text'
});
