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
export const memberCoupon = (data) => Request({
  url: 'aliPay/platform/memberCoupon/list',
  method: 'GET',
  data
});
export const getUserMembersEquitiesAllByUid = (data) => Request({
  url: 'aliPay/user/members/getUserMembersEquitiesAllByUid',
  method: 'GET',
  data
});
export const getPlatformMemberCoupon = (data) => Request({
  url: 'aliPay/coupon/getPlatformMemberCoupon',
  method: 'POST',
  data
});

export const wingRecords = (data) => Request({
  url: 'aliPay/user/members/wingRecords/list',
  method: 'GET',
  data
});
