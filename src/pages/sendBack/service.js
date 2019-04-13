import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const expressList = () => Request({
  url: 'aliPay/order/giveBack/expressList',
  method: 'GET',
});

export const getOrderGiveBackAddress = data => Request({
  url: 'aliPay/order/giveBack/getOrderGiveBackAddress',
  method: 'GET',
  data,
});

export const userOrderBackSubmitConfirm = data => Request({
  url: 'aliPay/order/giveBack/userOrderBackSubmitConfirm',
  method: 'POST',
  data,
});