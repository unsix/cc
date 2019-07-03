import Request from '../../utils/request';

export const demo = (data) => {
  return Request({
    url: '路径',
    method: 'POST',
    data,
  });
};

export const selectUserOrderDetail = data => Request({
  url: 'aliPay/order/selectUserOrderDetail',
  method: 'GET',
  data,
});

export const userCancelOrder = data => Request({
  url: 'aliPay/order/userCancleOrder',
  method: 'GET',
  data,
});

export const userCancelOrderSendMsg = data => Request({
  url: 'aliPay/order/userCancelOrderSendMsg',
  method: 'POST',
  data,
});

export const userFrezzAgain = data => Request({
  url: 'aliPay/order/userFrezzAgain',
  method: 'GET',
  data,
  test:'userFrezzAgain'
});

export const userConfirmReceipt = data => Request({
  url: 'aliPay/order/userConfirmReceipt',
  method: 'GET',
  data,
});

export const userApplicationForAmendmentOfSettlementForm = data => Request({
  url: 'aliPay/order/settlement/userApplicationForAmendmentOfSettlementForm',
  method: 'GET',
  data,
});

export const userAlipayTradePay = data =>
  Request({
    url: 'aliPay/order/userAlipayTradePay',
    method: 'GET',
    data,
  });

export const confirmOrderSettlement = data => Request({
  url: 'aliPay/order/settlement/paymentStatement',
  method: 'POST',
  data,
})
export const getSysConfigByKey = data => Request({
  url: 'aliPay/sysConfig/getSysConfigByKey',
  method: 'GET',
  data,
});
export const payReletAgain = data => Request({
  url: 'aliPay/order/payReletAgain',
  method: 'GET',
  data,
})
