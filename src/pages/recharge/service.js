import Request from '../../utils/request';

export const getUserDepositByUid = data => Request({
  url: 'aliPay/user/userRechargeDepositRecord/getUserDepositByUid',
  method: 'GET',
  data,
});



export const preAliPay = data => Request({
  url: 'aliPay/user/userRechargeDepositRecord/preAliPay',
  method: 'POST',
  data,
});
