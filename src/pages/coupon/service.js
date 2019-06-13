import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const getAllUserCouponList = data => Request({
  url: 'aliPay/coupon/getAllUserCouponList',
  method: 'POST',
  data,
});
export const getUserMembersEquitiesByUid = data => Request({
  url: 'aliPay/user/members/getUserMembersEquitiesByUid',
  method: 'GET',
  data,
});
export const checkInvokeCode = data => Request({
  url: 'checkInvokeCode',
  method: 'POST',
  contentType: 'application/www',
  test:'report',
  data,
});
export const getRecordByReportNo = data => Request({
  url: 'checkInvokeCode',
  method: 'GET',
  test:'report',
  data,
});
