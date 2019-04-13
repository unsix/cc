import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const userConfirmOrder = data => Request({
  url: 'aliPay/order/userConfirmOrder',
  method: 'POST',
  data,
  contentType: 'application/json',
});

export const exemptLogin = data =>
  Request({
    url: 'aliPay/user/exemptLogin',
    method: 'GET',
    data,
  });

export const userSubmitOrder = data =>
  Request({ 
    url: 'aliPay/order/userSubmitOrder',
    method: 'POST',
    data,
    contentType: 'application/json',
    test:'userSubmitOrder'
  });

export const userAlipayTradePay = data =>
  Request({
    url: 'aliPay/order/userAlipayTradePay',
    method: 'GET',
    data,
  });