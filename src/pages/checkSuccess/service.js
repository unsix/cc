import Request from '../../utils/request';

export const getOrderBySuccess = data => Request({
  url: 'aliPay/order/getOrderBySuccess',
  method: 'GET',
  data,
});

