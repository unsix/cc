import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const exemptLogin = data =>
  Request({
    url: 'aliPay/user/exemptLogin',
    method: 'GET',
    data,
  });

export const recommendPoductList = data =>
  Request({
    url: 'aliPay/product/recommendPoductList',
    method: 'GET',
    data,
  });

export const userOrderStatusCount = data =>
  Request({
    url: 'aliPay/order/userOrderStatusCount',
    method: 'POST',
    data,
  });