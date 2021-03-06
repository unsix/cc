import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const userOrderList = data => Request({
  url: 'aliPay/order/userOrderList',
  method: 'POST',
  data,
});
export const getSysConfigByKey = data => Request({
  url: 'aliPay/sysConfig/getSysConfigByKey',
  method: 'GET',
  data,
});

export const userCancelOrderSendMsg = data => Request({
  url: 'aliPay/order/userCancelOrderSendMsg',
  method: 'POST',
  data,
});
