import Request from '../../utils/request';

export const reletBuyDays = data => Request({
  url: 'aliPay/order/reletBuyDays',
  method: 'GET',
  data,
});

export const submitBuyOut = (data) => Request({
  url: 'aliPay/order/submitBuyOut',
  method: 'POST',
  data
});
export const payBuyOutAgain = data => Request({
  url: 'aliPay/order/payBuyOutAgain',
  method: 'GET',
  data,
})
export const getBuyOutConfirm = (data) => Request({
  url: 'aliPay/order/getBuyOutConfirm',
  method: 'GET',
  data
});

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

export const allOrderStages = data => Request({
  url: 'aliPay/order/allOrderStages',
  method: 'POST',
  data,
})
