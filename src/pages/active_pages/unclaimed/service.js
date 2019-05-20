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
export const userFormIdPool = (data) => Request({
  url: 'consumer-zhifubao/aliPay/user//userFormIdPool/pushFormIdToPool',
  method: 'POST',
  test:'form',
  contentType: 'application/www',
  data
});
