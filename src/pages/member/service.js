import Request from '../../utils/request';

// export const getCoupon = data => Request({
//   url: 'aliPay/coupon/getCoupon',
//   method: 'GET',
//   data,
// });
//
// export const getSettingDynamic = () => Request({
//   url: 'aliPay/index/getSettingDynamic',
//   method: 'GET',
//   test:'text'
// });
export const getUserMembers = (data) => Request({
  url: 'aliPay/user/members/getUserMembers',
  method: 'GET',
  test:'member',
  data
});
export const userPayMembers = (data) => Request({
  url: 'aliPay/user/members/userPayMembers',
  method: 'POST',
  test:'member',
  data
});
