import Request from '../../utils/request';

export const listRechargeDepositRecordsByUid = data => Request({
  url: 'aliPay/user/userRechargeDepositRecord/listRechargeDepositRecordsByUid',
  method: 'GET',
  data,
});
