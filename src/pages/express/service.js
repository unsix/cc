import Request from '../../utils/request';


export const userGetExpressByorderId = (data) => Request({
  url: 'aliPay/order/userGetExpressByorderId',
  method: 'GET',
  data,
});
